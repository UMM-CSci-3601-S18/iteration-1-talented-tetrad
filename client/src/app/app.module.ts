import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MATERIAL_COMPATIBILITY_MODE } from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {Routing} from './app.routes';
import {APP_BASE_HREF} from '@angular/common';
import {CustomModule} from './custom.module';

import {SummaryListService} from './summary/summary-list.service';
import {HomeComponent} from './home/home.component';
import {SummaryListComponent} from './summary/summary-list.component';
import {AddEmotionComponent} from "./home/home.component-dialog";
import {EmotionListService} from './home/emotion-list.service';
import {SummaryComponentDialog} from "./summary/summary.component-dialog";




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
        SummaryListComponent,
        AddEmotionComponent,
        SummaryComponentDialog,
    ],
    providers: [
        EmotionListService,
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
