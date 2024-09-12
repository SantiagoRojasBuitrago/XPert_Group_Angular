import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BreedListComponent } from './views/breed-list/breed-list.component';
import { BreedTableComponent } from './views/breed-table/breed-table.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ProtectedComponent } from './views/protected/protected.component';
import { AuthGuard } from './guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'breeds', component: BreedListComponent, canActivate: [AuthGuard] },
    { path: 'table', component: BreedTableComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
    { path: 'home', component: ProtectedComponent, canActivate: [AuthGuard] }
  ];

