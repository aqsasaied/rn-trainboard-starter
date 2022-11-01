/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable indent */
//import React from 'react';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Linking } from 'react-native';
import { Text, Button, Appbar, Surface } from 'react-native-paper';
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
    margin: 10,
    width: 50,
  },
  safeContainerStyle: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'center',
  },
});

type SelectScreenProps = ScreenNavigationProps<'Select'>;
const SelectScreen: React.FC<SelectScreenProps> = ({ navigation }) => {
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
  const url = `https://mobile-api-softwire2.lner.co.uk/v1/fares?originStation=${outStation}&destinationStation=${inStation}&noChanges=false&numberOfAdults=2&numberOfChildren=0&journeyType=single&outboundDateTime=2022-07-24T14%3A30%3A00.000%2B01%3A00&outboundIsArriveBy=false`;
  const fetchData = async () => {
    await fetch(url, {
      method: 'POST',
      headers: {
        'X-API-KEY': config.apiKey,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setStatusMessage(JSON.stringify(response));
      })
      .catch((error) => {
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
