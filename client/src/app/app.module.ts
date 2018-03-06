import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MATERIAL_COMPATIBILITY_MODE } from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {Routing} from './app.routes';
import {APP_BASE_HREF} from '@angular/common';
import {CustomModule} from './custom.module';

import {SummaryComponent} from './summary/summary.component';
import {HomeComponent} from './home/home.component';
import {AddEmotionComponent} from "./home/home.component-dialog";
import {EmotionListService} from './home/emotion-list.service';





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
        SummaryComponent,
        AddEmotionComponent,
    ],
    providers: [
        EmotionListService,
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
