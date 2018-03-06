// Imports
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AddEmotionComponent} from './home/home.component-dialog';
import {SummaryComponent} from './summary/summary.component';

//import {UserListComponent} from './users/user-list.component';

// Route Configuration
export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: '', component: AddEmotionComponent},

    //{path: '', component: HomeComponentDialog},
    {path: 'summary', component: SummaryComponent}
    //{path: 'users', component: UserListComponent}
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
