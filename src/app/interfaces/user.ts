import {PlaceOfService} from './search-data';
import {PetType} from './search-data';

export interface User {
    id: number;
    name: string;
    email: string;
    postcode: string;
    city: string;
    address: string;
    introductionText: string;
    place : PlaceOfService;
    petType: PetType;
    wage: number;
}
