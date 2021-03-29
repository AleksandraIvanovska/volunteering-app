import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrganizationComponent } from './organization/organization.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { VolunteeringEventComponent } from './volunteering-event/volunteering-event.component';
import { VolunteeringEventsComponent } from './volunteering-events/volunteering-events.component';
import { VolunteersComponent } from './volunteers/volunteers.component';
import { NotificationComponent } from './notification/notification.component';



const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'VolunteerUp',
    }
  },
  {
    path: 'events',
    component: VolunteeringEventsComponent,
    data: {
      title: 'Volunteering Events'
    }
  },
  {
    path: 'volunteers',
    component: VolunteersComponent,
    data: {
      title: 'Volunteers'
    }
  },
  {
    path: 'organizations',
    component: OrganizationsComponent,
    data: {
      title: 'Organizatons'
    }
  },
  {
    path: 'volunteeringEvent',
    component: VolunteeringEventComponent,
    data: {
      title: 'Event'
    }
  },
  {
    path: 'organization',
    component: OrganizationComponent,
    data: {
      title: 'Organization'
    }
  },
  {
    path: 'volunteer',
    component: VolunteerComponent,
    data: {
      title: 'Volunteer'
    }
  },
  {
    path: 'notifications',
    component: NotificationComponent,
    data: {
      title: 'Notifications'
    }
  },

  
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
