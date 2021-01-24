import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { VolunteeringEventService } from './volunteering-event.service';

@Component({
  selector: 'app-volunteering-event',
  templateUrl: './volunteering-event.component.html',
  styleUrls: ['./volunteering-event.component.css']
})
export class VolunteeringEventComponent implements OnInit {

  event = null;
  eventHeaderData: any = {};

  constructor(private voluneeringEventService: VolunteeringEventService, public toastr: ToastrService) { }

  ngOnInit(): void {
    return this.showSuccess();
  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }


  // getPlace(id) {
  //   this.navbarService.getPlace(id).subscribe(
  //     (data) => {
  //       if (data.length) {
  //         this.placeHeaderData = data[0];
  //         this.show.place = true;
  //       }
  //     },
  //     (error) => {
  //       this.toastr.error(error.message)
  //     })
  // }

  getEvent(uuid) {
    this.voluneeringEventService.getEvent(uuid).subscribe(
      (data) => {
        if (data.length) {
          this.eventHeaderData = data[0];
          this.event = data;
        }
      },
      (error) => {
        this.toastr.error(error.message)
      })
  }

}
