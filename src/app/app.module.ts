import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { USER_DATA_KEY } from './models/user-data';
import { USER_FILES_KEY } from './models/user-file';
import { USER_FOLLOWS_KEY } from './models/user-follows';
import { USER_SHARED_FILES_KEY } from './models/user-shared-files';
import { USER_PUBLIC_FILES_KEY } from './models/user-public-files';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { WallComponent } from './pages/wall/wall.component';
import { ErrorComponent } from './pages/error/error.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SiaUrlPipe } from './pipes/sia-url.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    WallComponent,
    ErrorComponent,
    SiaUrlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: USER_DATA_KEY, useValue: 'userData.json' },
    /* 
      TODO: USER_FILES_KEY should be based on UserFilesKey generated from the login passphrase in order to make it accessible only to the logged users. 
      Something like: user-{UserFilesKey}-files.json
    */
    { provide: USER_FILES_KEY, useValue: 'userImages.json' },
    { provide: USER_PUBLIC_FILES_KEY, useValue: 'userPublicFiles.json' },
    { provide: USER_SHARED_FILES_KEY, useValue: 'userSharedFiles.json' },
    { provide: USER_FOLLOWS_KEY, useValue: 'userFollowsKeys.json' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
