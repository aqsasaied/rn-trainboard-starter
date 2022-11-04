//Journeys models
export interface Journey {
  numberOfAdults: number;
  numberOfChildren: number;
  outboundJourneys?: OutboundJourneysEntity[] | null;
  nextOutboundQuery: string;
  previousOutboundQuery: string;
  bookingMessages: BookingMessages;
  error: string | null;
  error_description: string | null;
}

export interface OutboundJourneysEntity {
  journeyOptionToken: string;
  journeyId: string;
  originStation: OriginOrDestinationOrOriginStationOrDestinationStation;
  destinationStation: OriginOrDestinationOrOriginStationOrDestinationStation;
  departureTime: string;
  arrivalTime: string;
  status: string;
  primaryTrainOperator: TrainFacilitiesEntityOrTrainOperatorOrPrimaryTrainOperator;
  legs?: LegsEntity[] | null;
  tickets?: TicketsEntity[] | null;
  journeyDurationInMinutes: number;
  isFastestJourney: boolean;
  isOvertaken: boolean;
  bulletins?: BulletinsEntity[] | null;
  stationMessages?: null[] | null;
  isEligibleForLoyalty: boolean;
}
export interface OriginOrDestinationOrOriginStationOrDestinationStation {
  displayName: string;
  nlc: string;
  crs: string;
}
export interface TrainFacilitiesEntityOrTrainOperatorOrPrimaryTrainOperator {
  code: string;
  name: string;
}
export interface LegsEntity {
  legId: string;
  rsid: string;
  origin: OriginOrDestinationOrOriginStationOrDestinationStation;
  destination: OriginOrDestinationOrOriginStationOrDestinationStation;
  type: string;
  mode: string;
  durationInMinutes: number;
  departureDateTime: string;
  arrivalDateTime: string;
  status: string;
  trainOperator: TrainFacilitiesEntityOrTrainOperatorOrPrimaryTrainOperator;
  trainFacilities?:
    | TrainFacilitiesEntityOrTrainOperatorOrPrimaryTrainOperator[]
    | null;
  additionalFacilitiesInformation: string;
  isAzuma: boolean;
  firstClassDiningOption: string;
}
export interface TicketsEntity {
  fareId: string;
  fareSignature: string;
  ftot: string;
  ticketOptionToken: string;
  ticketType: string;
  ticketClass: string;
  ticketCategory: string;
  name: string;
  description: string;
  priceInPennies: number;
  pricingItem: PricingItem;
  numberOfTickets: number;
  isValidForLoyaltyCredit: boolean;
  isValidForAdr: boolean;
}
export interface PricingItem {
  subTotalInPennies: number;
  breakdown?: BreakdownEntity[] | null;
}
export interface BreakdownEntity {
  passenger: string;
  ticketCount: number;
  costInPennies: number;
}
export interface BulletinsEntity {
  id: number;
  title: string;
  description: string;
  category: string;
  severity: string;
  url: string;
  usingDefaultTitle: boolean;
}
export interface BookingMessages {
  messageCentreTitle: string;
  doNotShowAgainText: string;
  messages?: null[] | null;
}

//Stations models
export interface Stations {
  stations?: StationsEntity[] | null;
  error: string | null;
  error_description: string | null;
}
export interface StationsEntity {
  id: number;
  name: string;
  aliases?: (string | null)[] | null;
  crs?: string | null;
  nlc: string;
  latitude?: number | null;
  longitude?: number | null;
  isGroupStation: boolean;
  isSilverSeekStation: boolean;
}
