import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class CommunicationService
{
  constructor(private router: Router){}

  //components to navbar
  private onJobSelectedSource = new Subject<any>();
  onJobSelected$ = this.onJobSelectedSource.asObservable();
  emitJobSelected(jobTitle: any)
  {
    this.onJobSelectedSource.next(jobTitle);
  }

  //emit job status from dashboard 
  private jobStatusDashboard = new Subject<any>();
  jobStatus$ = this.jobStatusDashboard.asObservable();
  emitJobStatus(job_id: any, jobStatus: any)
  {
    const body = {
      'uuid': job_id,
      'status_id': jobStatus
    }
    this.jobStatusDashboard.next(body)
  }

  //from notification to navbar
  private onNoitificationSelected = new Subject<any>();
  onNotificationSelected$ = this.onNoitificationSelected.asObservable();
  emitNotification(notification: boolean)
  {
    this.onNoitificationSelected.next(notification);
  }

  //from navbar to notification
  private noitificationSelected = new Subject<any>();
  notificationSelected$ = this.noitificationSelected.asObservable();
  emitToNotification(notification: any)
  {
    this.noitificationSelected.next(notification);
  }

  //navbar to drawer
  private onChooseDrawer = new Subject<any>();
  onChooseDrawer$ = this.onChooseDrawer.asObservable();
  emitDataDrawer(type: any, uuid: any)
  {
    const data = {
      "type": type,
      "uuid": uuid
    }
    this.onChooseDrawer.next(data);
  }

  //created Job to SideBar
  private onCreatedJob = new Subject<any>();
  onCreatedJob$ = this.onCreatedJob.asObservable();
  emitNewJob(job_uuid: any, title: any, fe: any)
  {
    const data = {
      "uuid": job_uuid,
      "job_title": title,
      "fe": fe
    }
    this.onCreatedJob.next(data);
  }

  //view candidate profile -> mapped candidates
  private onCommentAdded = new Subject<any>();
  onCommentAdded$ = this.onCommentAdded.asObservable();
  emitComment(comment, candidate_id)
  {
    this.onCommentAdded.next({ 'comment': comment, 'candidate_id': candidate_id });
  }

  //onChooseJobDrawer
  private onChooseJobDrawer = new Subject<any>();
  onChooseJobDrawer$ = this.onChooseJobDrawer.asObservable();
  emitJobDataDrawer(job_uuid: any, type: any)
  {
    const data = {
      "job_uuid": job_uuid,
      "type": type
    }
    this.onChooseJobDrawer.next(data);
  }

  //onChooseFilterDrawer
  private onChooseFilterDrawer = new Subject<any>();
  onChooseFilterDrawer$ = this.onChooseFilterDrawer.asObservable();
  emitFilterDataDrawer(filters: any, type: any)
  {
    const data = {
      "filters": filters,
      "type": type
    }
    this.onChooseFilterDrawer.next(data);
  }

  //onChooseContactDrawer
  private onChooseContactDrawer = new Subject<any>();
  onChooseContactDrawer$ = this.onChooseContactDrawer.asObservable();
  emitContactDataDrawer(contact_uuid: any, type: any)
  {
    const data = {
      "contact_uuid": contact_uuid,
      "type": type
    }
    this.onChooseContactDrawer.next(data);
  }

  //onChooseCompanyDrawer
  private onChooseCompanyDrawer = new Subject<any>();
  onChooseCompanyDrawer$ = this.onChooseCompanyDrawer.asObservable();
  emitCompanyDataDrawer(company_uuid: any, type: any)
  {
    const data = {
      "company_uuid": company_uuid,
      "type": type
    }
    this.onChooseCompanyDrawer.next(data);
  }

  //onChooseCandidateDrawer
  private onChooseCandidateDrawer = new Subject<any>();
  onChooseCandidateDrawer$ = this.onChooseCandidateDrawer.asObservable();
  emitCandidatetDataDrawer(candidate_uuid: any, type: any, job_uuid: any)
  {
    const data = {
      "candidate_uuid": candidate_uuid,
      "type": type,
      "job_uuid": job_uuid
    }
    this.onChooseCandidateDrawer.next(data);
  }

  //onChooseAddDataDrawer
  private onChooseAddDataDrawer = new Subject<any>();
  onChooseAddDataDrawer$ = this.onChooseAddDataDrawer.asObservable();
  emitAddDataDrawer(job_uuid: any, type: any)
  {
    const data = {
      "job_uuid": job_uuid,
      "type": type
    }
    this.onChooseAddDataDrawer.next(data);
  }

  //onChooseCampaignDrawer
  private onChooseCampaignDrawer = new Subject<any>();
  onChooseCampaignDrawer$ = this.onChooseCampaignDrawer.asObservable();
  emitCampaignDataDrawer(campaign_uuid: any, type: any)
  {
    const data = {
      "campaign_uuid": campaign_uuid,
      "type": type
    }
    this.onChooseCampaignDrawer.next(data);
  }

  //onChosenCandidateFilters
  private onChoosenCandidateFilters = new Subject<any>();
  onChoosenCandidateFilters$ = this.onChoosenCandidateFilters.asObservable();
  emitCandidateFilters(data: any)
  {
    this.onChoosenCandidateFilters.next(data);
  }

  //onChosenCompaniesFilters
  private onChoosenCompaniesFilters = new Subject<any>();
  onChoosenCompaniesFilters$ = this.onChoosenCompaniesFilters.asObservable();
  emitCompaniesFilters(data: any)
  {
    this.onChoosenCompaniesFilters.next(data);
  }

  //clearCandidateFilters
  private clearCandidateFilters = new Subject<any>();
  clearCandidateFilters$ = this.clearCandidateFilters.asObservable();
  emitClearCandidatesFilters(data: any)
  {
    this.clearCandidateFilters.next(data);
  }

  //clearCompaniesFilters
  private changeCompaniesFilters = new Subject<any>();
  changeCompaniesFilters$ = this.changeCompaniesFilters.asObservable();
  emitchangeCompaniesFilters(data: any)
  {
    this.changeCompaniesFilters.next(data);
  }

  //clearCompaniesAnalysisFilters
  private changeCompaniesAnalysisFilters = new Subject<any>();
  changeCompaniesAnalysisFilters$ = this.changeCompaniesAnalysisFilters.asObservable();
  emitChangeCompaniesAnalysisFilters()
  {
    this.changeCompaniesAnalysisFilters.next();
  }

  //jobsFilters

  private openJobsDrawer = new Subject<any>();
  openJobsDrawer$ = this.openJobsDrawer.asObservable();
  openJobDrawer(data: any)
  {
    this.openJobsDrawer.next(data);
  }

  //Jobs components to sidebar
  private onGetCandidatesComponentJob = new Subject<any>();
  onGetCandidatesComponentJob$ = this.onGetCandidatesComponentJob.asObservable();
  getJobEmitter(uuid)
  {
    this.onGetCandidatesComponentJob.next(uuid);
  }
  
  //editCampaign
  private putEditedCampaign = new Subject<any>();
  putEditedCampaign$ = this.putEditedCampaign.asObservable();
  emitEditedCampaign(data: any)
  {
    this.putEditedCampaign.next(data);
  }

   //editCandidateToCampaign
   private addCandidateToCampaign = new Subject<any>();
   addCandidateToCampaign$ = this.addCandidateToCampaign.asObservable();
   emitCandidateToCampaign(data: any)
   {

     this.addCandidateToCampaign.next(data);
   }

   //candidateAddedToCampaign
   private addedCandidateCampaign = new Subject<any>();
   addedCandidateCampaign$ = this.addedCandidateCampaign.asObservable();
   emitCandidate(data: boolean)
   {
     this.addedCandidateCampaign.next(data);
   }

  //Sidebar to jobscomponents
  private onSetCandidatesComponentJob = new Subject<any>();
  onSetCandidatesComponentJob$ = this.onSetCandidatesComponentJob.asObservable();
  setJobEmitter(data:any)
  {
    if(data){
      this.onSetCandidatesComponentJob.next(data);
    } else {
      this.router.navigate(['/overview']);
    }
   
  }
}
