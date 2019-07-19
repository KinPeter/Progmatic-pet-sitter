import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    constructor(private router: Router) { }

    toHomeTop(): void {
        if (this.router.url === '/') {
            document.querySelector('app-header').scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            this.router.navigate(['/']);
        }
    }

    scrollToContacts(): void {
        document.querySelector('app-footer').scrollIntoView({behavior: 'smooth'});
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
