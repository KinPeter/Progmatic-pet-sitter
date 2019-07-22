import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontPageComponent } from './components/front-page/front-page.component';
import {SearchPageComponent} from './components/search-page/search-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { MyProfilePageComponent } from './components/my-profile-page/my-profile-page.component';


const routes: Routes = [
    { path: '', component: FrontPageComponent, pathMatch: 'full' },
    { path: 'search-page', component: SearchPageComponent},
    { path: 'registration-page', component: RegistrationPageComponent},
    { path: 'my-profile-page', component: MyProfilePageComponent},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
