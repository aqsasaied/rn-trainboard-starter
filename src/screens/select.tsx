/* eslint-disable indent */
//import React from 'react';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Linking } from 'react-native';
import { Text, Button, Appbar, Surface } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { ScreenNavigationProps } from '../routes';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#eee',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   dropdownContainer: {
//     backgroundColor: '#eee',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     display: 'flex',
//     flexDirection: 'row',
//   },
//   text: {
//     paddingBottom: 24,
//   },
//   dropdownHighlight: {
//     backgroundColor: '#d4b5eb',
//   },
//   dropdownText: {
//     backgroundColor: '#abd7ed',
//     borderRadius: 10,
//     height: 35,
//     width: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 10,
//   },
//   dropdownList: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 100,
//     textAlign: 'center',
//     position: 'absolute',
//     right: 0,
//     zIndex: 1,
//   },
// });

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacerStyle: {
    marginBottom: 15,
    margin: 10,
  },
  safeContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'center',
  },
});

type SelectScreenProps = ScreenNavigationProps<'Select'>;
function SelectScreen() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [outStation, setOutStation] = useState<string>('');
  const [inStation, setInStation] = useState<string>('');
  const [showDropDown2, setShowDropDown2] = useState(false);
  const stationList = [
    {
      label: 'EUS',
      value: 'EUS',
    },
    {
      label: 'MAN',
      value: 'MAN',
    },
    {
      label: 'YRK',
      value: 'YRK',
    },
    {
      label: 'LDS',
      value: 'LDS',
    },
    {
      label: 'EDB',
      value: 'EDB',
    },
  ];
  const url =
    'https://mobile-api-softwire2.lner.co.uk/v1/fares?originStation=LDS&destinationStation=KGX&noChanges=false&numberOfAdults=2&numberOfChildren=0&journeyType=single&outboundDateTime=2022-11-04T14%3A30%3A00.000%2B01%3A00&outboundIsArriveBy=false';

  return (
    <Surface style={styles.containerStyle}>
      <SafeAreaView style={styles.safeContainerStyle}>
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
      </SafeAreaView>
      <SafeAreaView>
        <Button onPress={async () => await Linking.openURL(url)}>Submit</Button>
      </SafeAreaView>
    </Surface>
  );
}

export default SelectScreen;
