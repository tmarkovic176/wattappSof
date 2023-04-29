import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { DeviceWidthService } from 'src/app/services/device-width.service';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { ProsumerService } from 'src/app/services/prosumer.service';
import { CookieService } from 'ngx-cookie-service';
import { HouseComponent } from '../Charts/house/house.component';
import { DevicesStatusComponent } from '../Charts/devices-status/devices-status.component';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-Pocetna',
  templateUrl: './Pocetna.component.html',
  styleUrls: ['./Pocetna.component.css'],
})
export class PocetnaComponent implements OnInit, AfterViewInit {
  resizeObservable$!: Observable<Event>;
  resizeSubscription$!: Subscription;

  loader: boolean = true;

  devices: any[] = [];
  deviceUsages: { [key: string]: number } = {};
  numOfDevices: number = 0;
  numOfActiveDevices: number = 0;

  tariff: string = 'HIGHER';

  @ViewChild('house', { static: true }) house!: HouseComponent;
  @ViewChild('devicesStatus', { static: true })

  devicesStatus!: DevicesStatusComponent;

  currentPrice : number = 0;

  constructor(
    private widthService: DeviceWidthService,
    private service: ProsumerService,
    private cookie: CookieService,
    private dashboardService : DashboardService
  ) {}

  ngAfterViewInit(): void {
    // const homeCont = document.getElementById('homeCont');
    // homeCont!.style.height = this.widthService.height + 'px';
  }

  ngOnInit() {
    setTimeout(() => {
      this.loader = false;
    }, 2000);
    this.getDevices();
    this.getPrice()
    let hour = new Date().getHours();
    if (hour >= 22 || hour <= 6) {
      this.tariff = 'LOWER';
    } else {
      this.tariff = 'HIGHER';
    }
  }

  getDevices() {
    this.service
      .getDevicesByProsumerId(this.cookie.get('id'), this.cookie.get('role'))
      .subscribe((response) => {
        this.devices = [
          ...response.consumers,
          ...response.producers,
          ...response.storage,
        ];
        //console.log(devices);
        this.numOfDevices = this.devices.length;
        this.devices.forEach((device) => {
          this.Usage(device.Id);
        });
        this.house.setDevices(this.devices, this.deviceUsages);
        this.devicesStatus.setDevices(this.devices, this.deviceUsages);
      });
  }
  Usage(id: string) {
    this.service.getDeviceById(id).subscribe((response) => {
      this.deviceUsages[id] = response.CurrentUsage;
      if (response.CurrentUsage != 0) {
        this.numOfActiveDevices += 1;
      }
    });
  }

  getPrice()
  {
    this.dashboardService.getCurrentElecticityPrice()
    .subscribe({
      next:(res)=>{
        this.currentPrice = res.Price;
      },
      error:(err)=>{
        console.log(err.error);
      }
    })
  }
}
