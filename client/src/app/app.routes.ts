// Imports
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AddEmotionComponent} from './home/home.component-dialog';
import {EmotionListService} from "./home/emotion-list.service";
import {SummaryListComponent} from './summary/summary-list.component';

//import {UserListComponent} from './users/user-list.component';

// Route Configuration
export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: '', component: AddEmotionComponent},
    //{path: '', component: EmotionListService},
    {path: 'summary', component: SummaryListComponent}
    //{path: 'users', component: UserListComponent}
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
