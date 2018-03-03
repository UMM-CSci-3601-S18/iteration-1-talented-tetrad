import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MATERIAL_COMPATIBILITY_MODE } from '@angular/material';


import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {SummaryListComponent} from './summary/summary-list.component';
import {HomeComponent, HomeComponentDialog} from './home/home.component';
//import {UserListComponent} from './users/user-list.component';
import {SummaryListService} from './summary/summary-list.service';
import {Routing} from './app.routes';
import {APP_BASE_HREF} from '@angular/common';

import {CustomModule} from './custom.module';
//import {AddUserComponent} from './users/add-user.component';


@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        Routing,
        CustomModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        HomeComponentDialog,
        SummaryListComponent,
        //AddUserComponent
    ],
    providers: [
        SummaryListService,
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}
    ],
    entryComponents: [
      //AddUserComponent,
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
