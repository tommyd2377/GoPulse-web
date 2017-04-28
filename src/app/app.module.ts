import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { VideoSearchComponent } from './video-search/video-search.component';
import { YoutubeService } from './youtube.service';
import { UserService } from './user.service'
import { SearchComponent } from './search/search.component';
import { UsersearchComponent } from './usersearch/usersearch.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '@angular/material';
import { WelcomescreenComponent } from './welcomescreen/welcomescreen.component';
import { ProfileComponent } from './profile/profile.component';
import { FollowersComponent } from './followers/followers.component';
import { FolloweesComponent } from './followees/followees.component';
import { UsersComponent } from './users/users.component';
import { PopularComponent } from './popular/popular.component';
import { SettingsComponent } from './settings/settings.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { AboutComponent } from './about/about.component';
import { UpdateComponent } from './update/update.component';
import { ContactComponent } from './contact/contact.component';
import { UserfollowersComponent } from './userfollowers/userfollowers.component';
import { UserfolloweesComponent } from './userfollowees/userfollowees.component';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

export const firebaseConfig = {
 apiKey: "AIzaSyAJNsnnVl8HfbViTs5qCNGHs2AzN2BKSTE",
    authDomain: "gopulse-acf2b.firebaseapp.com",
    databaseURL: "https://gopulse-acf2b.firebaseio.com",
    storageBucket: "gopulse-acf2b.appspot.com",
    messagingSenderId: "604663955164"
};

const appRoutes: Routes = [
  { path: '', redirectTo: 'welcomescreen', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'videos/:id', component: VideoDetailComponent },
  { path: 'user/:id', component: UsersComponent, },
  { path: 'popular', component: PopularComponent},
  { path: 'welcomescreen', component: WelcomescreenComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'followers', component: FollowersComponent },
  { path: 'followees', component: FolloweesComponent },
  { path: 'userfollowers/:id', component: UserfollowersComponent },
  { path: 'userfollowees/:id', component: UserfolloweesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'search', component: SearchComponent,
    children: [
      {path: 'videosearch', component: VideoSearchComponent},
      {path: 'usersearch', component: UsersearchComponent}
    ]},
  { path: 'profile', component: ProfileComponent,
    children: [
      {path: 'settings', component: SettingsComponent}
    ]},
];
  
@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HomeComponent,
    VideoDetailComponent,
    VideoSearchComponent,
    SearchComponent,
    UsersearchComponent,
    LoginComponent,
    WelcomescreenComponent,
    ProfileComponent,
    FollowersComponent,
    FolloweesComponent,
    UsersComponent,
    PopularComponent,
    SettingsComponent,
    ForgotpasswordComponent,
    TermsComponent,
    PrivacyComponent,
    AboutComponent,
    UpdateComponent,
    ContactComponent,
    UserfollowersComponent,
    UserfolloweesComponent
  ],
  
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(appRoutes),
    MaterialModule.forRoot()
  ],
  
  providers: [YoutubeService, UserService],
  bootstrap: [AppComponent]

})

export class AppModule {}
