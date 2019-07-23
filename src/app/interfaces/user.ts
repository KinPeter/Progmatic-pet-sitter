export interface User {
    userId: number;
    name: string;
    email: string;
    password?: string;
    ownerData: Owner | null;
    sitterData: Sitter | null;
}

export interface Owner {
    pettype?: string;
    // ...
}

export interface Sitter {
    address: string;
    postCode: number;
    // ...
}
