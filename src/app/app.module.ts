import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { VolunteeringEventsComponent } from './volunteering-events/volunteering-events.component';
import { HttpClientModule } from '@angular/common/http';
import { VolunteersComponent } from './volunteers/volunteers.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { FormsModule } from '@angular/forms'; 
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { OrganizationDrawerComponent } from './shared/drawers/organization-drawer/organization-drawer.component';
import { VolunteerDrawerComponent } from './shared/drawers/volunteer-drawer/volunteer-drawer.component';
import { NotificationComponent } from './notification/notification.component';
import { VolunteeringEventComponent } from './volunteering-event/volunteering-event.component';
import { ToastrModule } from 'ngx-toastr';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    VolunteeringEventsComponent,
    VolunteersComponent,
    OrganizationsComponent,
    OrganizationDrawerComponent,
    VolunteerDrawerComponent,
    NotificationComponent,
    VolunteeringEventComponent,
  ],
  imports: [
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      closeButton: true,
      enableHtml: true
    }),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    NgSelectModule,
    NgOptionHighlightModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
