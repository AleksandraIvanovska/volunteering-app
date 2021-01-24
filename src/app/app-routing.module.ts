import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { VolunteeringEventComponent } from './volunteering-event/volunteering-event.component';
import { VolunteeringEventsComponent } from './volunteering-events/volunteering-events.component';
import { VolunteersComponent } from './volunteers/volunteers.component';


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
  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
