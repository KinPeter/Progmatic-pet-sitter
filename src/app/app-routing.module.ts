import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrontPageComponent } from './components/front-page/front-page.component';
import {SearchPageComponent} from './components/search-page/search-page.component';


const routes: Routes = [
    { path: '', component: FrontPageComponent, pathMatch: 'full' },
    { path: 'search-page', component: SearchPageComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
