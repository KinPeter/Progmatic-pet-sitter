import { Day, SitterService } from './user';

export interface SitterView {
    id: number;
    userName: string;
    profilePhoto: null;
    city: string;
    address: string;
    postalCode: number;
    intro: string;
    services: SitterService[];
    availabilities: Day[];
    averageRating: number;
}
