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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { VolunteersComponent } from './volunteers/volunteers.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { FormsModule } from '@angular/forms'; 
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { NotificationComponent } from './notification/notification.component';
import { VolunteeringEventComponent } from './volunteering-event/volunteering-event.component';
import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptor } from './error.interceptor';
import { APP_BASE_HREF } from '@angular/common';
import { NavbarService } from './navbar/navbar.service';
import { OrganizationsService } from './organizations/organizations.service';
import { NotificationService } from './notification/notification.service';
import { VolunteeringEventService } from './volunteering-event/volunteering-event.service';
import { VolunteeringEventsService } from './volunteering-events/volunteering-events.service';
import { VolunteersService } from './volunteers/volunteers.service';
import { OrganizationComponent } from './organization/organization.component';
import { OrganizationService } from './organization/organization.service';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { VolunteerService } from './volunteer/volunteer.service';
import { ScrollingModule } from '@angular/cdk/scrolling';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    VolunteeringEventsComponent,
    VolunteersComponent,
    OrganizationsComponent,
    NotificationComponent,
    VolunteeringEventComponent,
    OrganizationComponent,
    VolunteerComponent,
  ],
  imports: [
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      closeButton: true,
      enableHtml: true,
    }),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    NgSelectModule,
    NgOptionHighlightModule,
    ScrollingModule
  ],
  providers: [
    NavbarService,
    OrganizationsService,
    OrganizationService,
    NotificationService,
    VolunteeringEventService,
    VolunteeringEventsService,
    VolunteersService,  
    VolunteerService,
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
