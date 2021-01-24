import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
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

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getNotification();
  }

  getNotification() {
    this.notificationService.getNotifications()
      .subscribe(
        (data) => {
          this.notifications = data;
        }
      )
  }

}
