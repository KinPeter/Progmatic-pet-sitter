import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { LoginData } from 'src/app/interfaces/login-data';
import { FieldValidatorService } from 'src/app/services/field-validator.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.scss'],
    animations: [
        trigger('backdropFade', [
            state('in', style({
                opacity: 1
            })),
            transition('void => *', [ // fade-in animation
                style({ // initial style, before added to the DOM
                    opacity: 0
                }),
                animate(300)
            ]),
            transition('* => void', [ // fade-out animation
                animate(300, style({
                    opacity: 0,
                }))
            ])
        ]),
        trigger('modalSlide', [
            state('in', style({
                opacity: 1,
                transform: 'translateY(0)'
            })),
            transition('void => *', [ // slide-in animation
                animate(400, keyframes([
                    style({
                        transform: 'translateY(-500px) scale(0.3)',
                        opacity: 0,
                        offset: 0 // offset means the fraction of time of the whole animation time
                    }),
                    style({
                        transform: 'translateY(200px) scale(0.65)',
                        opacity: 0.2,
                        offset: 0.6
                    }),
                    style({
                        transform: 'translateY(0) scale(1)',
                        opacity: 1,
                        offset: 1
                    })
                ]))
            ]),
            transition('* => void', [ // slide-out animation
                animate(300, style({
                    opacity: 0,
                    transform: 'translateY(-500px)'
                }))
            ])
        ])
    ]
})
export class LoginModalComponent implements OnInit {

    @Output() closeThis = new EventEmitter();
    private loginData: LoginData;
    private isEmailValid: boolean;
    private isPasswordValid: boolean;
    private isLoading: boolean;

    constructor(
        private validator: FieldValidatorService,
        private auth: AuthenticationService
    ) {
        this.loginData = {
            email: '',
            password: ''
        };
        this.isEmailValid = true;
        this.isPasswordValid = true;
        this.isLoading = false;
    }

    closeMe() {
        this.closeThis.emit();
    }

    sendLoginData(): void {
        this.isEmailValid = this.validator.validateEmail(this.loginData.email);
        this.isPasswordValid = this.loginData.password !== '';

        if (this.isEmailValid && this.isPasswordValid) {
            this.isLoading = true;

            this.auth.login(this.loginData).then((response) => {
                // this.isLoading = false;
                // ???
            });

            // this.closeMe();
        }
    }

    ngOnInit() {
    }

}
