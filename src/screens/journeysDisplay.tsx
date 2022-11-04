import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, DataTable } from 'react-native-paper';
import { OutboundJourneysEntity } from '../models/journey';
import { ScreenNavigationProps } from '../routes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 10,
    buttonColor: '#5614b8',
  },
});

type JourneysScreenProps = ScreenNavigationProps<'Journeys'>;
const JourneysScreen: React.FC<JourneysScreenProps> = ({
  navigation,
  route,
}) => {
  const details = route.params.journeysDetails;
  const mapJourneys = (detail: OutboundJourneysEntity, index: number) => {
    return (
      <DataTable.Row key={index}>
        <DataTable.Cell>{detail.originStation.crs}</DataTable.Cell>
        <DataTable.Cell>{detail.destinationStation.crs}</DataTable.Cell>
        <DataTable.Cell>
          {detail.departureTime.substring(11, 16)}
        </DataTable.Cell>
        <DataTable.Cell>{detail.arrivalTime.substring(11, 16)}</DataTable.Cell>
        <DataTable.Cell>{detail.primaryTrainOperator.code}</DataTable.Cell>
        <DataTable.Cell>
          {detail.tickets && detail.tickets[0].priceInPennies}
        </DataTable.Cell>
      </DataTable.Row>
    );
  };
  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Departure Station</DataTable.Title>
          <DataTable.Title>Arrival Station</DataTable.Title>
          <DataTable.Title>Departure Time</DataTable.Title>
          <DataTable.Title>Arrival Time</DataTable.Title>
          <DataTable.Title>Operator</DataTable.Title>
          <DataTable.Title>Total Price(p)</DataTable.Title>
        </DataTable.Header>
        {details.map(mapJourneys)}
      </DataTable>

      <Button
        style={styles.button}
        mode="contained"
        onPress={() => navigation.navigate('Select')}
      >
        Search again
      </Button>
    </View>
  );
};

export default JourneysScreen;
