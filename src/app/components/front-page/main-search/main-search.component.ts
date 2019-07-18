import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-main-search',
    templateUrl: './main-search.component.html',
    styleUrls: ['./main-search.component.scss']
})
export class MainSearchComponent implements OnInit {

    currentSlide: number;

    constructor(private router: Router) {
      this.currentSlide = 0;
    }

    ngOnInit() {
      setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % 3;
      }, 4000);

    }

    btnClick(): void {
      this.router.navigate(['/search-page']);
    };



}
