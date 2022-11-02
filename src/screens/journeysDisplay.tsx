/* eslint-disable @typescript-eslint/no-unsafe-member-access */
//import React from 'react';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, DataTable } from 'react-native-paper';
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
  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Departure Station</DataTable.Title>
          <DataTable.Title>Arrival Station</DataTable.Title>
          <DataTable.Title>Departure Time</DataTable.Title>
          <DataTable.Title>Arrival Time</DataTable.Title>
          <DataTable.Title>Operator</DataTable.Title>
          <DataTable.Title>Price</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
          <DataTable.Cell>{details[0].originStation.crs}</DataTable.Cell>
          <DataTable.Cell>{details[0].destinationStation.crs}</DataTable.Cell>
          <DataTable.Cell>{details[0].departureTime}</DataTable.Cell>
          <DataTable.Cell>{details[0].arrivalTime}</DataTable.Cell>
          <DataTable.Cell>
            {details[0].primaryTrainOperator.code}
          </DataTable.Cell>
          <DataTable.Cell>
            {details[0].tickets[0].priceInPennies}
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
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
