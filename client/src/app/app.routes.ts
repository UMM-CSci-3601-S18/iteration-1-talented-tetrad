// Imports
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {SummaryComponent} from './summary/summary.component';

//import {UserListComponent} from './users/user-list.component';

// Route Configuration
export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'summary', component: SummaryComponent}
    //{path: 'users', component: UserListComponent}
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
