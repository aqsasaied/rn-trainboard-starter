import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { ScreenNavigationProps } from '../routes';
import { config } from '../config';
import { Journey, Stations, StationsEntity } from '../models';
import CalendarPicker from 'react-native-calendar-picker';
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
  const [time, setTime] = useState('');
  const stationList = [];
  const stationsUrl = 'https://mobile-api-softwire2.lner.co.uk/v1/stations';
  const fetchStations = () => {
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
              if (station.crs && stationList.length < 5) {
                stationList.push({ label: station.name, value: station.crs });
              }
            });
          }
        }
      })
      .catch((error) => {
        console.log('Oops', error);
        setStatusMessage(JSON.stringify(error));
      });
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
  const incAdult = () => {
    if (adults < 6) {
      setAdults(adults + 1);
    }
  };
  const decAdult = () => {
    if (adults > 0) {
      setAdults(adults - 1);
    }
  };
  const incChildren = () => {
    if (children < 6) {
      setChildren(children + 1);
    }
  };
  const decChildren = () => {
    if (children > 0) {
      setChildren(children - 1);
    }
  };
  const changeDate = (date: moment.Moment) => {
    setSelectedDate(JSON.stringify(date.toDate()));
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setTime(JSON.stringify(date).substring(12, 20).replace(/:/g, '%3A'));
    console.log('A date has been picked: ', time);
    hideDatePicker();
  };
  fetchStations();
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
          onPress={decAdult}
        >
          -
        </Button>
        <Text>{adults}</Text>
        <Button
          style={styles.plusMinusButtons}
          mode="contained"
          onPress={incAdult}
        >
          +
        </Button>
      </View>
      <View style={styles.plusMinusButtonsBox}>
        <Text>Children: </Text>
        <Button
          style={styles.plusMinusButtons}
          mode="contained"
          onPress={decChildren}
        >
          -
        </Button>
        <Text>{children}</Text>
        <Button
          style={styles.plusMinusButtons}
          mode="contained"
          onPress={incChildren}
        >
          +
        </Button>
      </View>
      <View style={styles.spacer} />
      <View style={styles.calendarView}>
        <CalendarPicker onDateChange={changeDate} />
      </View>
      <View>
        <Button onPress={showDatePicker}>Select Train Time</Button>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
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
