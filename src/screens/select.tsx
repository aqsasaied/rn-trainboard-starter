import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import ModalDropdown from 'react-native-modal-dropdown';
import { ScreenNavigationProps } from '../routes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingBottom: 24,
  },
  dropdown: {
    backgroundColor: '#d4b5eb',
  },
  dropdownText: {
    backgroundColor: '#abd7ed',
    borderRadius: 10,
    height: 35,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownList: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    textAlign: 'center',
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
});

type SelectScreenProps = ScreenNavigationProps<'Select'>;

const SelectScreen: React.FC<SelectScreenProps> = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.text}>Select a Station</Text>
    <ModalDropdown
      style={styles.dropdownText}
      textStyle={{ fontSize: 15 }}
      dropdownTextHighlightStyle={styles.dropdown}
      dropdownStyle={styles.dropdownList}
      options={['MAN', 'LDN']}
    />
  </View>
);

export default SelectScreen;
