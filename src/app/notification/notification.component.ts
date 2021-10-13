import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AppComponent } from '../app.component';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  onNotificationSelected = new Subject<any>();
  notifications: any = [];
  componentAlive = true;

  constructor(private notificationService: NotificationService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    public globals: AppComponent)
  //  private communicationService: CommunicationService)
    {
    // this.communicationService.notificationSelected$.takeWhile(() => this.componentAlive)
    //   .subscribe((notification) => {
    //     if ( "read_all" == notification) {
    //       this.readAllNotification();
    //     } else {
    //       const itemIndex = this.notifications.findIndex(item => item.uuid === notification);
    //       if (itemIndex !== -1) {
    //         this.notifications[itemIndex].is_read = 1;
    //       }
    //     }
    //   });
  }

  ngOnInit() {
    this.getNotification();
  }

  emitNotification(notification) {
    //this.communicationService.emitNotification(notification);
  }

  notificationAction(notification, i)
  {
    if (!this.notifications[i].is_read) {
      this.emitNotification(false);
    }
    this.notifications[i].is_read = 1;
    this.notificationService.markAsRead(this.globals.user.accessToken,notification.uuid).subscribe();
    if (notification.navigation_url) {
      if (notification.is_route) {
        window.open(notification.navigation_url);
      } else {
        let params = JSON.parse('{"' + decodeURI(notification.navigation_url.replace(/\?/g, '')).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
        this.router.navigate([],
          {
            relativeTo: this.activatedRoute,
            queryParams: params
          });
      }
    }
  }

  getNotification() {
    this.notificationService.getNotifications(this.globals.user.accessToken)
      .subscribe(
        (data) => {
          this.notifications = data;
        }
      )
  }

  readAllNotification() {
    this.notifications.forEach(element => {
      element.is_read = 1;
    });
    this.notificationService.readAllNotification(this.globals.user.accessToken).subscribe();
    this.emitNotification(true);
  }

}
