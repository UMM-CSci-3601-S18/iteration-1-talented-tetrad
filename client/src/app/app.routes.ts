// Imports
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AddEmotionComponent} from './home/home.component-dialog';

import {SummaryListComponent} from './summary/summary-list.component';
import {SummaryComponentDialog} from "./summary/summary.component-dialog";

//import {UserListComponent} from './users/user-list.component';

// Route Configuration
export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: '', component: AddEmotionComponent},
    {path: 'summary', component: SummaryListComponent},
    {path: 'summary', component: SummaryComponentDialog}
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
