import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrontPageComponent } from './components/front-page/front-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutSectionComponent } from './components/front-page/about-section/about-section.component';
import { MainSearchComponent } from './components/front-page/main-search/main-search.component';

@NgModule({
    declarations: [
        AppComponent,
        FrontPageComponent,
        HeaderComponent,
        FooterComponent,
        AboutSectionComponent,
        MainSearchComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
