/* eslint-disable @typescript-eslint/no-misused-promises */
//import React from 'react';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { ScreenNavigationProps } from '../routes';
import { config } from '../config';

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
  safeContainerStyle: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'center',
    width: 180,
    height: 75,
  },
});

type SelectScreenProps = ScreenNavigationProps<'Select'>;
// eslint-disable-next-line no-empty-pattern
const SelectScreen: React.FC<SelectScreenProps> = ({}) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [outStation, setOutStation] = useState<string>('');
  const [inStation, setInStation] = useState<string>('');
  const [showDropDown2, setShowDropDown2] = useState(false);
  const [statusMessage, setStatusMessage] = useState('TBD');
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
  const url = `https://mobile-api-softwire2.lner.co.uk/v1/fares?originStation=${outStation}&destinationStation=${inStation}&noChanges=false&numberOfAdults=2&numberOfChildren=0&journeyType=single&outboundDateTime=2022-11-24T14%3A30%3A00.000%2B01%3A00&outboundIsArriveBy=false`;
  const fetchData = async () => {
    console.log(url);
    await fetch(url, {
      method: 'GET',
      headers: {
        'X-API-KEY': config.apiKey,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.log(response.outboundJourneys);
        setStatusMessage(JSON.stringify('Success'));
      })
      .catch((error) => {
        console.log('Oops', error);
        setStatusMessage(JSON.stringify(error));
      });
  };
  return (
    <View style={styles.containerStyle}>
      <View style={styles.safeContainerStyle}>
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
      <View>
        <Text>API Status : {statusMessage}</Text>
        <Button onPress={fetchData}>Submit</Button>
      </View>
    </View>
  );
};

export default SelectScreen;
