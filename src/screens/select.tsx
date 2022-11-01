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
  dropdownContainer: {
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
  },
  text: {
    paddingBottom: 24,
  },
  dropdownHighlight: {
    backgroundColor: '#d4b5eb',
  },
  dropdownText: {
    backgroundColor: '#abd7ed',
    borderRadius: 10,
    height: 35,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
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
    <View style={styles.dropdownContainer}>
      <ModalDropdown
        style={styles.dropdownText}
        textStyle={{ fontSize: 15 }}
        dropdownTextHighlightStyle={styles.dropdownHighlight}
        dropdownStyle={styles.dropdownList}
        options={['EUS', 'MAN', 'YRK', 'LDS', 'EDB']}
      />
      <ModalDropdown
        style={styles.dropdownText}
        textStyle={{ fontSize: 15 }}
        dropdownTextHighlightStyle={styles.dropdownHighlight}
        dropdownStyle={styles.dropdownList}
        options={['EUS', 'MAN', 'YRK', 'LDS', 'EDB']}
      />
    </View>
  </View>
);

export default SelectScreen;
