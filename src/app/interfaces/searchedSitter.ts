import { PlaceOfService, PetType } from './search-data';

export interface SearchedSitter {
    id: number;
    name: string;
    postalCode: string;
    city: string;
    services: {
      place: PlaceOfService;
      petType: PetType;
    }
    //wage: number;
}
