//import React from 'react';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { ScreenNavigationProps } from '../routes';
import { config } from '../config';
import { Journey } from '../models';
import RnIncrementDecrementBtn from 'react-native-increment-decrement-button';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacerStyle: {
    marginBottom: 15,
    margin: 5,
  },
  dropdowns: {
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
  const [statusMessage, setStatusMessage] = useState('TBD');
  const [adults, setAdults] = React.useState<number>(0);
  const [children, setChildren] = React.useState<number>(0);
  const [selectedDates, setSelectedDates] = React.useState('');
  const [markedDates, setMarkedDates] = React.useState({});
  const stationList = [
    {
      label: 'London Euston',
      value: 'EUS',
    },
    {
      label: 'Manchester Piccadilly',
      value: 'MAN',
    },
    {
      label: 'York',
      value: 'YRK',
    },
    {
      label: 'Leeds',
      value: 'LDS',
    },
    {
      label: 'Edinburgh Waverly',
      value: 'EDB',
    },
  ];
  const url = `https://mobile-api-softwire2.lner.co.uk/v1/fares?originStation=${outStation}&destinationStation=${inStation}&noChanges=false&numberOfAdults=${adults}&numberOfChildren=${children}&journeyType=single&outboundDateTime=2022-11-24T14%3A30%3A00.000%2B01%3A00&outboundIsArriveBy=false`;
  const fetchData = () => {
    fetch(url, {
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
          return navigation.navigate('Journeys', {
            journeysDetails: response.outboundJourneys,
          });
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
  const selectDate = (date) => {
    console.log(date);
    markedDates[date] = {
      selected: true,
      color: '#00B0BF',
      textColor: '#FFFFFF',
    };
    console.log(markedDates);
    setMarkedDates(markedDates);
};
  return (
    <View style={styles.containerStyle}>
      <View style={styles.dropdowns}>
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
        <View style={styles.spacerStyle} />
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
      <View style={styles.spacerStyle} />
      <View style={styles.calendarView}>
        <Calendar
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={'2022-11-01'}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={'2028-05-30'}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {
            selectDate(day.dateString);
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'yyyy MM'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {
            console.log('month changed', month);
          }}
          // Hide month navigation arrows. Default = false
          hideArrows={false}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          // Do not show days of other months in month page. Default = false
          hideExtraDays={true}
          // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={false}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
          firstDay={1}
          // Hide day names. Default = false
          hideDayNames={false}
          // Show week numbers to the left. Default = false
          showWeekNumbers={false}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={(subtractMonth) => subtractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={(addMonth) => addMonth()}
          // Disable left arrow. Default = false
          disableArrowLeft={false}
          // Disable right arrow. Default = false
          disableArrowRight={false}
          // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
          disableAllTouchEventsForDisabledDays={false}
          // Replace default month and year title with custom one. the function receive a date as parameter
          renderHeader={(date) => {
            /*Return JSX*/
          }}
          // Enable the option to swipe between months. Default = false
          enableSwipeMonths={false}
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
