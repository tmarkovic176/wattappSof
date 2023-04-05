import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { DeviceserviceService } from 'src/app/services/deviceservice.service';
import { EmployeesServiceService } from 'src/app/services/employees-service.service';
import { ScreenWidthService } from 'src/app/services/screen-width.service';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home-sidebar',
  templateUrl: './home-sidebar.component.html',
  styleUrls: ['./home-sidebar.component.css']
})
export class HomeSidebarComponent implements OnInit, AfterViewInit {

  region : string = '';
  currConsumption : string = '';
  currProduction : string = '';
  numOfUsers : string = '';
  resizeObservable$!: Observable<Event>
  resizeSubscription$!: Subscription;
  side : any;

  constructor(private deviceService : DeviceserviceService, private employeeService : EmployeesServiceService, private toast : NgToastService, private widthService : ScreenWidthService) {}
  
  ngAfterViewInit(): void {
    this.side.style.height = this.widthService.height+'px';
  }

  ngOnInit(): void {
    this.side = document.getElementById("sadrzaj");
    
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
      this.side.style.height = this.widthService.height+'px';
    })
    this.getRegion();
    this.getConsumptionProduction();
  }

  private getConsumptionProduction()
  {
    this.deviceService.getCurrConsumptionAndProduction()
    .subscribe({
      next:(res)=>{
        this.currConsumption = res.totalConsumption;
        this.currProduction = res.totalProduction;
      },
      error:(err)=>{
        console.log(err.error);
        this.toast.error({detail:"ERROR", summary:"Unable to load data",duration:3000});
      }
    })
  }

  private getProsumerCount()
  {
    this.employeeService.getProsumerCout()
    .subscribe({
      next:(res)=>{
        this.numOfUsers = res.prosumerCount;
      },
      error:(err)=>{
        console.log(err.error);
        this.toast.error({detail:"ERROR", summary:"Unable to load data",duration:3000});
      }
    })
  }

  private getRegion()
  {
    this.employeeService.getAllRegions()
    .subscribe({
      next:(res)=>{
        this.region = res[0].regionName;
        this.getProsumerCount();
      },
      error:(err)=>{
        console.log(err.error);
        this.toast.error({detail:"ERROR", summary:"Unable to load data",duration:3000});
      }
    })
  }

}
