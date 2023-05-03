import { Component, OnInit } from '@angular/core';
import { ProsumerService } from 'src/app/services/prosumer.service';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-deviceCards',
  templateUrl: './deviceCards.component.html',
  styleUrls: ['./deviceCards.component.css'],
})
export class DeviceCardsComponent implements OnInit {
  id: string = '';
  color: ThemePalette = 'primary';
  checked = true;
  disabled = false;
  notChecked = false;
  deviceUsages: { [id: string]: number } = {};
  consumers: any[] = [];
  producers: any[] = [];
  storages: any[] = [];
  devicesToShow: any[] = [];
  devices: any[] = [];
  role: string = '';
  loader: boolean = true;
  toggleClicked = false;

  constructor(
    private service: ProsumerService,
    private cookie: CookieService,
    private spiner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.cookie.get('id');
    this.role = this.cookie.get('role');
    this.service
      .getDevicesByProsumerId(this.id, this.role)
      .subscribe((response) => {
        this.devices = [
          ...response.consumers,
          ...response.producers,
          ...response.storage,
        ];
        this.devicesToShow = this.devices;
        this.devices.forEach((device) => {
          this.deviceUsages[device.Id] = 0;
          this.Usage(device);
        });
        this.spiner.hide();
      });
      this.activateBtn('offcanvasUserDevices');
      this.activateButton('sidebarUserDevices');
  }

  Usage(dev: any) {
    // this.service.getDeviceById(dev.Id).subscribe((response) => {
      this.deviceUsages[dev.Id] = Number(dev.CurrentUsage);
    // });
  }

  filterDevices() {
    let selectedCategories: any[] = [];
    if (this.consumers) selectedCategories.push(1);
    if (this.producers) selectedCategories.push(2);
    if (this.storages) selectedCategories.push(3);

    if (selectedCategories.length === 0) {
      this.devicesToShow = [];
    } else {
      this.devicesToShow = this.devices.filter((device) =>
        selectedCategories.includes(device.CategoryId)
      );
    }
    return this.devicesToShow;
  }
  navigateToDevice(deviceId: number) {
    this.router.navigate(['/ProsumerApp/userDevices', deviceId, 'deviceinfo']);
  }

  activateBtn(id : string)
  {
    const buttons = document.querySelectorAll('.offcanvasBtn');
    buttons.forEach(button=>{
      if(button.id == id)
      {
        button.classList.add('active');
      }
      else
      {
        button.classList.remove('active');
      }
    })
  }
  activateButton(id : string)
  {
    const buttons = document.querySelectorAll('.sidebarBtn');
    buttons.forEach(button=>{
      if(button.id == id)
      {
        button.classList.add('active');
      }
      else
      {
        button.classList.remove('active');
      }
    });
  }
}
