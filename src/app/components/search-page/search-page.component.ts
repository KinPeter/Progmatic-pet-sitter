import { Component, OnInit } from '@angular/core';
import { SearchedSitter } from 'src/app/interfaces/searchedSitter';

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

    public searchedSitters: SearchedSitter[];

    constructor() { }

    ngOnInit() {
    }

    eventSearchedData(event: SearchedSitter[]){
        this.searchedSitters = event;
    }

}
