import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule, MatTableModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';

import { environment } from '../environments/environment';
import { LoaderService } from './shared/services/loader.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { MoviesComponent } from './components/movies/movies.component';
import { TMDBInterceptor } from './shared/interceptors/tmdb.interceptor';

const MatModules = [
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatDialogModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoadingSpinnerComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    MoviesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...MatModules,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TMDBInterceptor, multi: true},
    LoaderService,
    {
      provide: FirestoreSettingsToken,
      useValue: environment.production
        ? undefined
        : {
            host: "localhost:5001",
            ssl: false
          }
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
