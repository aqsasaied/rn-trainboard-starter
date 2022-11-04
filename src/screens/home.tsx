import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-paper';

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
  buttonStyle: {
    margin: 10,
  },
});

type HomeScreenProps = ScreenNavigationProps<'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.text}>Welcome to our amazing app</Text>
    <Button
      style={styles.buttonStyle}
      mode="contained"
      onPress={() => navigation.navigate('Select')}
    >
      Search for a journey
    </Button>
  </View>
);

export default HomeScreen;
