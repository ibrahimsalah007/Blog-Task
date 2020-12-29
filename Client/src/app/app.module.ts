import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar/navbar.component';


import { AngularFileUploaderModule } from "angular-file-uploader";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/user/login/login.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxTagsModule } from "ngx-tags-input-box";
import { PostComponent } from './components/Posts/post/post.component';
import { DetailsComponent } from './components/Posts/details/details.component';
import { AddComponent } from './components/Posts/add/add.component';
// NOT RECOMMENDED (Angular 9 doesn't support this kind of import)
// import { ModalModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    DetailsComponent,
    NavbarComponent,
    AddComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    // BrowserAnimationsModule,
    NgxTagsModule,
    AngularFileUploaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
