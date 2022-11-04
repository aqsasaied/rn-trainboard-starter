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
