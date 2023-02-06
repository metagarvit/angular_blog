import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import {  MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BlogListComponent } from './blog-list/blog-list.component';
import { CommentsComponent } from './comments/comments.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IntercepterService } from './loader/intercepter.service';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { CreatepostComponent } from './createpost/createpost.component';
import { LoaderComponent } from './loader/loader.component';

//Routing
const appRoutes : Routes = [
  {path : 'login', component : LoginComponent},
  {path : 'userdetails', component : UserDetailsComponent},
  {path : 'blog/:id', component : BlogDetailsComponent},
  {path : 'bloglist', component : BlogListComponent},
  {path : 'admin/bloglist', component : BlogListComponent},
  {path : 'signup', component : SignupComponent},
  {path : '', component : HomeComponent},
  {path : '**', component : PagenotfoundComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    BlogDetailsComponent,
    UserDetailsComponent,
    NavbarComponent,
    BlogListComponent,
    CommentsComponent,
    PagenotfoundComponent,
    CreatepostComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: IntercepterService, multi: true }, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
