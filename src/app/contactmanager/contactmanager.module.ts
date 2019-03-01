import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactmanagerRoutingModule } from './contactmanager-routing.module';

import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { ContactmanagerAppComponent } from './contactmanager-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';


@NgModule({
  declarations: [ContactmanagerAppComponent, ToolbarComponent, MainContentComponent, SidenavComponent],
  imports: [
    CommonModule,
    ContactmanagerRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
  ]
})
export class ContactmanagerModule { }
