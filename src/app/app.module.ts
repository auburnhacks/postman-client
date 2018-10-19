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

const appRoutes:Routes = [
  { path: 'email', component: EmailComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    EmailComponent
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
