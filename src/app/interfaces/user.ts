import {PlaceOfService} from './search-data';
import {PetType} from './search-data';

export interface User {
    userId?: number;
    name: string;
    email: string;
    password?: string;
    ownerData: Owner | null;
    sitterData: Sitter | null;
}

export interface OwnersPet {
    petName: string;
    petType: PetType;
}

export interface Owner {
    pets: OwnersPet[];
}

export interface SitterService {
    placeOfService: PlaceOfService;
    petType: PetType;
    pricePerHour: number;
}

export interface Sitter {
    address: string;
    postCode: string;
    city: string;
    intro: string;
    services: SitterService[];
}
