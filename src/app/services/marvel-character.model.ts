export interface MarvelCharacter {
  name: string;
  geschlecht: 'Männlich' | 'Weiblich' | 'Divers';
  spezies: string;
  team: string;
  herkunft: string;
  jahr: number;
  seite: 'Gut' | 'Böse' | 'Neutral';
  fähigkeit: string;
  bildUrl: string;
}
