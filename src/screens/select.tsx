import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { ScreenNavigationProps } from '../routes';
import { config } from '../config';
import { Journey, Stations } from '../models';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const styles = StyleSheet.create({
  wholePageContainer: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    marginBottom: 15,
    margin: 5,
  },
  dropdownBox: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'center',
    width: 180,
    height: 75,
  },
  plusMinusButtonsBox: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  plusMinusButtons: {
    width: 75,
    height: 50,
    justifyContent: 'center',
    padding: 0,
  },
  calendarView: {
    width: 300,
  },
});

type SelectScreenProps = ScreenNavigationProps<'Select'>;
const SelectScreen: React.FC<SelectScreenProps> = ({ navigation }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [outStation, setOutStation] = useState<string>('');
  const [inStation, setInStation] = useState<string>('');
  const [showDropDown2, setShowDropDown2] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>('TBD');
  const [adults, setAdults] = React.useState<number>(0);
  const [children, setChildren] = React.useState<number>(0);
  const [selectedDate, setSelectedDate] = React.useState<string>('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [time, setTime] = useState('');
  const [stationList, setStationList] = React.useState<
    { label: string; value: string }[]
  >([]);
  const stationsUrl = 'https://mobile-api-softwire2.lner.co.uk/v1/stations';
  const PassengerAdjuster = (passenger: number, positive: boolean) => {
    if (positive && passenger < 6) {
      return passenger + 1;
    } else if (!positive && passenger > 0) {
      return passenger - 1;
    }
    return passenger;
  };
  const searchUrl = `https://mobile-api-softwire2.lner.co.uk/v1/fares?originStation=${outStation}&destinationStation=${inStation}&noChanges=false&numberOfAdults=${adults}&numberOfChildren=${children}&journeyType=single&outboundDateTime=${selectedDate.substring(
    1,
    11,
  )}T${time}.000%2B01%3A00&outboundIsArriveBy=false`;
  const fetchData = () => {
    console.log(searchUrl);
    fetch(searchUrl, {
      method: 'GET',
      headers: {
        'X-API-KEY': config.apiKey,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => response as Journey)
      .then((response) => {
        if (response.error) {
          setStatusMessage(response.error_description);
        } else {
          setStatusMessage('TBD');
          if (response.outboundJourneys) {
            return navigation.navigate('Journeys', {
              journeysDetails: response.outboundJourneys,
            });
          }
        }
      })
      .catch((error) => {
        console.log('Oops', error);
        setStatusMessage(JSON.stringify(error));
      });
  };
  const showOrHidePicker = (dateOrTime: boolean, show: boolean) => {
    if (dateOrTime && show) {
      setDatePickerVisibility(true);
    } else if (dateOrTime && !show) {
      setDatePickerVisibility(false);
    } else if (!dateOrTime && show) {
      setTimePickerVisibility(true);
    } else if (!dateOrTime && !show) {
      setTimePickerVisibility(false);
    }
  };
  const handleConfirmDate = (date: Date) => {
    setSelectedDate(JSON.stringify(date));
    showOrHidePicker(true, false);
  };
  const handleConfirmTime = (date: Date) => {
    setTime(JSON.stringify(date).substring(12, 20).replace(/:/g, '%3A'));
    console.log('A date has been picked: ', time);
    showOrHidePicker(false, false);
  };
  useEffect(() => {
    const fetchStations = () => {
      console.log('hello');
      fetch(stationsUrl, {
        method: 'GET',
        headers: {
          'X-API-KEY': config.apiKey,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((response) => response as Stations)
        .then((response) => {
          if (response.error) {
            setStatusMessage(response.error_description);
          } else {
            setStatusMessage('TBD');
            if (response.stations) {
              response.stations.forEach((station) => {
                if (station.crs && station.crs.length === 3) {
                  stationList.push({ label: station.name, value: station.crs });
                }
              });
            }
          }
          setStationList(stationList);
        })
        .catch((error) => {
          console.log('Oops', error);
          setStatusMessage(JSON.stringify(error));
        });
    };
    fetchStations();
  }, [stationList]);
  return (
    <View style={styles.wholePageContainer}>
      <View style={styles.dropdownBox}>
        <DropDown
          label={'Station'}
          mode={'outlined'}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={outStation}
          setValue={setOutStation}
          list={stationList}
        />
        <View style={styles.spacer} />
        <DropDown
          label={'Station'}
          mode={'outlined'}
          visible={showDropDown2}
          showDropDown={() => setShowDropDown2(true)}
          onDismiss={() => setShowDropDown2(false)}
          value={inStation}
          setValue={setInStation}
          list={stationList}
        />
      </View>
      <View style={styles.plusMinusButtonsBox}>
        <Text>Adults: </Text>
        <Button
          style={styles.plusMinusButtons}
          mode="contained"
          onPress={() => setAdults(PassengerAdjuster(adults, false))}
        >
          -
        </Button>
        <Text>{adults}</Text>
        <Button
          style={styles.plusMinusButtons}
          mode="contained"
          onPress={() => setAdults(PassengerAdjuster(adults, true))}
        >
          +
        </Button>
      </View>
      <View style={styles.plusMinusButtonsBox}>
        <Text>Children: </Text>
        <Button
          style={styles.plusMinusButtons}
          mode="contained"
          onPress={() => setChildren(PassengerAdjuster(children, false))}
        >
          -
        </Button>
        <Text>{children}</Text>
        <Button
          style={styles.plusMinusButtons}
          mode="contained"
          onPress={() => setChildren(PassengerAdjuster(children, true))}
        >
          +
        </Button>
      </View>
      <View style={styles.spacer} />
      <View style={styles.calendarView}>
        <Button onPress={() => showOrHidePicker(true, true)}>
          Select Date
        </Button>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={() => showOrHidePicker(true, false)}
        />
      </View>
      <View>
        <Button onPress={() => showOrHidePicker(false, true)}>
          Select Train Time
        </Button>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleConfirmTime}
          onCancel={() => showOrHidePicker(false, false)}
        />
      </View>
      <View>
        <Text>API status: {statusMessage}</Text>
        <Button onPress={fetchData}>Submit</Button>
      </View>
    </View>
  );
};

export default SelectScreen;
