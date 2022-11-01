/* eslint-disable indent */
//import React from 'react';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Text, Button, Appbar, Surface } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
//import ModalDropdown from 'react-native-modal-dropdown';
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
    flexDirection: 'row',
  },
  spacerStyle: {
    marginBottom: 15,
  },
  safeContainerStyle: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
  },
});

type SelectScreenProps = ScreenNavigationProps<'Select'>;
function SelectScreen() {
  const [showDropDown, setShowDropDown] = useState(false);
  const [station, setStation] = useState<string>('');
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
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

  return (
    <Surface style={styles.containerStyle}>
      <SafeAreaView style={styles.safeContainerStyle}>
        <DropDown
          label={'Station'}
          mode={'outlined'}
          visible={showDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={station}
          setValue={setStation}
          list={stationList}
        />
        <View style={styles.spacerStyle} />
        <DropDown
          label={'Station'}
          mode={'outlined'}
          visible={showMultiSelectDropDown}
          showDropDown={() => setShowDropDown(true)}
          onDismiss={() => setShowDropDown(false)}
          value={station}
          setValue={setStation}
          list={stationList}
          multiSelect
        />
      </SafeAreaView>
    </Surface>
  );
}

// type SelectScreenProps = ScreenNavigationProps<'Select'>;
// const SelectScreen: React.FC<SelectScreenProps> = ({ navigation }) => (
//   <View style={styles.container}>
//     <Text style={styles.text}>Select a Station</Text>
//     <Dropdown
//       label={'Select a station'}
//       mode={'outlined'}
//       visible={showDropdown}
//       showDropdown={() => setShowDropdown(true)}
//       list={['EUS', 'MAN', 'YRK', 'LDS', 'EDB']}
//     />
//   </View>
// );

export default SelectScreen;
