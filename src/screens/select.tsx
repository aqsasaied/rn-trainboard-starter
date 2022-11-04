import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { ScreenNavigationProps } from '../routes';
import { config } from '../config';
import { Journey } from '../models/journey';
import { Stations } from '../models/station';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DropDownPicker from 'react-native-dropdown-picker';

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
    justifyContent: 'space-evenly',
  },
  plusMinusButtons: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  plusMinusButtonBoxTest: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: 75,
    height: 40,
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
  const showOrHideDateTime = (isDate: boolean, show: boolean) => {
    if (isDate && show) {
      setDatePickerVisibility(true);
    } else if (isDate && !show) {
      setDatePickerVisibility(false);
    } else if (!isDate && show) {
      setTimePickerVisibility(true);
    } else if (!isDate && !show) {
      setTimePickerVisibility(false);
    }
  };
  const handleConfirmDate = (date: Date) => {
    setSelectedDate(JSON.stringify(date));
    showOrHideDateTime(true, false);
  };
  const handleConfirmTime = (date: Date) => {
    setTime(JSON.stringify(date).substring(12, 20).replace(/:/g, '%3A'));
    console.log('A date has been picked: ', time);
    showOrHideDateTime(false, false);
  };
  const fetchStations = () => {
    const duplicateCheck = new Set();
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
              if (!duplicateCheck.has(station.crs)) {
                duplicateCheck.add(station.crs);
                if (station.crs && station.crs.length === 3) {
                  stationList.push({ label: station.name, value: station.crs });
                }
              }
            });
            setStationList(stationList);
          }
        }
      })
      .catch((error) => {
        console.log('Oops', error);
        setStatusMessage(JSON.stringify(error));
      });
  };
  useEffect(() => {
    fetchStations();
  }, []);
  return (
    <View style={styles.wholePageContainer}>
      <View style={styles.dropdownBox}>
        <DropDownPicker
          open={showDropDown}
          value={outStation}
          items={stationList}
          setOpen={setShowDropDown}
          setValue={setOutStation}
          searchable={true}
          searchPlaceholder="Search stations"
          placeholder="Select a station"
        />
        <View style={styles.spacer} />
        <DropDownPicker
          open={showDropDown2}
          value={inStation}
          items={stationList}
          setOpen={setShowDropDown2}
          setValue={setInStation}
          searchable={true}
          searchPlaceholder="Search stations"
          placeholder="Select a station"
        />
      </View>
      <View style={styles.plusMinusButtonsBox}>
        <Text>Adults: </Text>
        <View style={styles.plusMinusButtonBoxTest}>
          <Button
            style={styles.plusMinusButtons}
            mode="contained"
            onPress={() => setAdults(PassengerAdjuster(adults, false))}
          >
            -
          </Button>
        </View>
        <Text>{adults}</Text>
        <View style={styles.plusMinusButtonBoxTest}>
          <Button
            style={styles.plusMinusButtons}
            mode="contained"
            onPress={() => setAdults(PassengerAdjuster(adults, true))}
          >
            +
          </Button>
        </View>
      </View>
      <View style={styles.spacer} />
      <View style={styles.plusMinusButtonsBox}>
        <Text>Children: </Text>
        <View style={styles.plusMinusButtonBoxTest}>
          <Button
            style={styles.plusMinusButtons}
            mode="contained"
            onPress={() => setChildren(PassengerAdjuster(children, false))}
          >
            -
          </Button>
        </View>
        <Text>{children}</Text>
        <View style={styles.plusMinusButtonBoxTest}>
          <Button
            style={styles.plusMinusButtons}
            mode="contained"
            onPress={() => setChildren(PassengerAdjuster(children, true))}
          >
            +
          </Button>
        </View>
      </View>
      <View style={styles.spacer} />
      <View style={styles.calendarView}>
        <Button onPress={() => showOrHideDateTime(true, true)}>
          Select Date
        </Button>
        <DateTimePickerModal
          style={{ width: '100%' }}
          isVisible={isDatePickerVisible}
          mode="date"
          display="default"
          onConfirm={handleConfirmDate}
          onCancel={() => showOrHideDateTime(true, false)}
        />
      </View>
      <View>
        <Button onPress={() => showOrHideDateTime(false, true)}>
          Select Train Time
        </Button>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleConfirmTime}
          onCancel={() => showOrHideDateTime(false, false)}
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
