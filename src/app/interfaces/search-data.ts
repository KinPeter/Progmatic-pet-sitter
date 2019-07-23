export enum PetType {
  DOG = 'Kutya',
  CAT = 'Macska',
  BIRD = 'Madár',
  RODENT = 'Rágcsáló',
  REPTILE = 'Hüllő'
}

export enum PlaceOfService {
  SITTERS_HOME = 'KiVihez viszem a kisállatomat',
  OWNERS_HOME = 'Fogadom a KiVit'
}

export interface SearchData {
  name: string;
  postcode: string;
  place: PlaceOfService;
  petType: PetType;
}

export interface KeyValue {
  key: string;
  value: string;
}
