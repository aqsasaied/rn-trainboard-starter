/* eslint-disable @typescript-eslint/no-misused-promises */
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
  const url = `https://www.lner.co.uk/travel-information/travelling-now/live-train-times/depart/${outStation}/${inStation}/#LiveDepResults`;

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
        <Button onPress={async () => await Linking.openURL(url)}>Submit</Button>
      </View>
    </View>
  );
};

export default SelectScreen;
