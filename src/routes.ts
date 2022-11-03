import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { OutboundJourneysEntity } from './models';

export type ScreenNavigationProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};

export type RootStackParamList = {
  Home: undefined;
  Select: undefined;
  Journeys: JourneyScreenParams;
};

type JourneyScreenParams = {
  journeysDetails: OutboundJourneysEntity[];
};
