import {PlaceOfService} from './search-data';
import {PetType} from './search-data';

export interface User {
    userId: number;
    name: string;
    email: string;
    password?: string;
    ownerData: Owner | null;
    sitterData: Sitter | null;
}

export interface Owner {
    pettype?: PetType;
    // ...
}

export interface Sitter {
    address: string;
    postcode: string;
    city: string;
    introductionText: string;
    place: PlaceOfService;
    petType: PetType;
    wage: number;
    // ...
}
