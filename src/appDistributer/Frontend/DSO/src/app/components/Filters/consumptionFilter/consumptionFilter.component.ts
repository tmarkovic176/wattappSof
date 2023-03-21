import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-consumptionFilter',
  templateUrl: './consumptionFilter.component.html',
  styleUrls: ['./consumptionFilter.component.css'],
})
export class ConsumptionFilterComponent implements OnInit {
  disabled = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = true;
  constructor() {}

  ngOnInit() {}
}
