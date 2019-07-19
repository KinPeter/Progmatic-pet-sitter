import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    constructor(private router: Router) { }

    toHomeTop(): void {
        if (this.router.url === '/') {
            document.querySelector('app-header').scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            this.router.navigate(['/']);
        }
    }

    scrollToContacts(): void {
        document.querySelector('app-footer').scrollIntoView({behavior: 'smooth', block: 'end'});
    }

    toAboutSection(): void {
        if (this.router.url === '/') {
            document.querySelector('.app-about').scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            this.router.navigate(['/']).then(() => {
                document.querySelector('app-about').scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        }
    }

    ngOnInit() {
    }

}
