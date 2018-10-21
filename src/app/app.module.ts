import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { UserService } from './services/user.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EmailComponent } from './email/email.component';
import { EmailService } from './services/email.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes:Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'email', component: EmailComponent, canActivate: [ AuthGuard ]},
  { path: '**', component: LoginComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    EmailComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [
    UserService,
    EmailService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
