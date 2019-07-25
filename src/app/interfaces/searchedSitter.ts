import { PlaceOfService, PetType } from './search-data';

export interface SearchedSitter {
    id: number;
    name: string;
    profilePhoto: null;
    city: string;
    address: string;
    postalCode: string;
    intro: string;
    services: {
      place: PlaceOfService;
      petType: PetType;
      pricePerHour: number;
      pricePerDay: number;
    }
    availabilities: {
      id: number;
      availability: string;
      date: Date;
    }

}
