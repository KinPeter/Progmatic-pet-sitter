import { Component, OnInit } from '@angular/core';
import { SearchedSitter } from 'src/app/interfaces/searchedSitter';

@Component({
    selector: 'app-sitter-profile-page',
    templateUrl: './sitter-profile-page.component.html',
    styleUrls: ['./sitter-profile-page.component.scss']
})
export class SitterProfilePageComponent implements OnInit {

    sitter: SearchedSitter;

    constructor() { }

    ngOnInit() {
    }

}
