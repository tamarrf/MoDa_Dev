import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule, ModalService } from "ems-web-app-modal";
import { PageViewerModule, PageViewerService } from "ems-web-app-page-viewer";
import { LoaderModule, LoaderService } from "ems-web-app-loader";
import { PipesModule } from "ems-web-app-pipes";
import { MessagesModule, MessagesService } from "ems-web-app-messages";
import { ViewContainerModule, ViewContainerService } from "ems-web-app-view-container";
import { NavigationModule, NavigationService } from "ems-web-app-navigation";

import { AppComponent, TeachersComponent,ClassroomComponent } from '../components';
import { AppService, HttpService, ContentService } from "../services";

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    AppComponent,
    TeachersComponent,
    ClassroomComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ModalModule,
    LoaderModule,
    PageViewerModule,
    PipesModule,
    MessagesModule,
    ViewContainerModule,
    NavigationModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  providers: [ ModalService, NavigationService, LoaderService, PageViewerService, AppService, HttpService, ContentService, MessagesService, ViewContainerService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
