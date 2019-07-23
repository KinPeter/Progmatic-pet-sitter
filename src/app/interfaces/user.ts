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

export interface Owner {
    petType: PetType;
    petName: string;
}

export interface Sitter {
    address: string;
    postcode: string;
    city: string;
    intro: string;
    place: PlaceOfService[];
    petType: PetType[];
    wage: number;
    // ...
}
