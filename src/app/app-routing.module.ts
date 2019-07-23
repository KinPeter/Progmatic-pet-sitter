import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { MyProfilePageComponent } from './components/my-profile-page/my-profile-page.component';
import { WannabeSitterPageComponent } from './components/wannabe-sitter-page/wannabe-sitter-page.component';


const routes: Routes = [
    { path: '', component: FrontPageComponent, pathMatch: 'full' },
    { path: 'search/sitters', component: SearchPageComponent},
    { path: 'registration-page', component: RegistrationPageComponent},
    { path: 'my-profile-page', component: MyProfilePageComponent, canActivate: [AuthGuardService]},
    { path: 'wannabe-sitter-page', component: WannabeSitterPageComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
