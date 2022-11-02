/* eslint-disable @typescript-eslint/no-unsafe-member-access */
//import React from 'react';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { OutboundJourneysEntity } from '../models';
import { ScreenNavigationProps } from '../routes';

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
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingBottom: 24,
  },
  buttonStyle: {
    margin: 10,
  },
});

type JourneysScreenProps = ScreenNavigationProps<'Journeys'>;
const JourneysScreen: React.FC<JourneysScreenProps> = ({
  navigation,
  route,
}) => {
  const details = route.params.journeysDetails;
  const names = [];
  let i = 0;
  while (i < details.length) {
    names.push(details[i].journeyId);
    i++;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{JSON.stringify(names)}</Text>
      <Button mode="contained" onPress={() => navigation.navigate('Details')}>
        Go to details
      </Button>
      <Button
        style={styles.buttonStyle}
        mode="contained"
        onPress={() => navigation.navigate('Select')}
      >
        Go to selection
      </Button>
    </View>
  );
};

export default JourneysScreen;
