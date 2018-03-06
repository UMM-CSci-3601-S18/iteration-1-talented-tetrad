// Imports
import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent, HomeComponentDialog} from './home/home.component';
import {SummaryComponent} from './summary/summary.component';
import {EmojiListComponent} from "./emojis/emoji-list.component";

//import {UserListComponent} from './users/user-list.component';

// Route Configuration
export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: '', component: HomeComponentDialog},
    {path: 'summary', component: SummaryComponent},
    {path: 'emojis', component: EmojiListComponent}
    //{path: 'users', component: UserListComponent}
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
