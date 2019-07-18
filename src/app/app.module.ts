import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutSectionComponent } from './components/front-page/about-section/about-section.component';
import { MainSearchComponent } from './components/front-page/main-search/main-search.component';
import { SearchPageComponent } from './components/search-page/search-page.component';
import { SitterProfilePageComponent } from './components/sitter-profile-page/sitter-profile-page.component';
import { MyProfilePageComponent } from './components/my-profile-page/my-profile-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { WannabeSitterPageComponent } from './components/wannabe-sitter-page/wannabe-sitter-page.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';

@NgModule({
    declarations: [
        AppComponent,
        FrontPageComponent,
        HeaderComponent,
        FooterComponent,
        AboutSectionComponent,
        MainSearchComponent,
        SearchPageComponent,
        SitterProfilePageComponent,
        MyProfilePageComponent,
        RegistrationPageComponent,
        WannabeSitterPageComponent,
        LoginModalComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
