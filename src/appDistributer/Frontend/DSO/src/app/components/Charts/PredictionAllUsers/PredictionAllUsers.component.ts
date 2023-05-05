import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { strings } from '@material/slider';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { ScaleType, Color, LegendComponent } from '@swimlane/ngx-charts';
import { BrowserModule } from '@angular/platform-browser';
import { TimestampService } from 'src/app/services/timestamp.service';
import * as XLSX from 'xlsx';
import { NgxSpinnerService } from 'ngx-spinner';
import { ScreenWidthService } from 'src/app/services/screen-width.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-PredictionAllUsers',
  templateUrl: './PredictionAllUsers.component.html',
  styleUrls: ['./PredictionAllUsers.component.css'],
})
export class PredictionAllUsersComponent implements OnInit {
  chart: any;
  production = true;
  consumption = true;
  id: string = '';
  data: any[] = ['z'];
  dataConsumers: any = [];
  dataProducers: any = [];
  colors: Color = {
    name: 'mycolors',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#FF414E', '#80BC00'],
  };
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  show!: boolean;
  constructor(
    private service: UsersServiceService,
    private router: ActivatedRoute,
    private servicetime: TimestampService,
    private spiner: NgxSpinnerService,
    private widthService: ScreenWidthService
  ) {}

  exportTable(): void {
    const headerRow = [
      'Day',
      'Predicted Consumption (kW)',
      'Predicted Production (kW)',
    ];
    const sheetData = [
      headerRow,
      ...this.data.map((data: any) => [
        data.name,
        ...data.series.map((series: { value: number }) => series.value),
      ]),
    ];
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(sheetData);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Chart Data');
    XLSX.writeFile(workbook, 'chart-data.xlsx');
  }

  ngOnInit() {
    this.PredictionDay();
    document.getElementById(
      'modalFadePredictionAllProsumers'
    )!.style.maxHeight = this.widthService.height * 0.7 + 'px';
  }

  PredictionWeek() {
    this.spiner.show();
    this.servicetime.PredictionNextWeek().subscribe((response: any) => {
      const consumptionTimestamps = response.consumption || {};
      const productionTimestamps = response.production || {};

      const consumptionData = Object.keys(consumptionTimestamps).map(
        (name: any) => {
          const date = new Date(name);
          const dayNumber = date.getDate();
          const monthName = date.toLocaleString('default', { month: 'long' });
          return {
            x: `${monthName} ${dayNumber}`,
            y: consumptionTimestamps[name] || 0.0,
          };
        }
      );

      const productionData = Object.keys(productionTimestamps).map(
        (name: any) => {
          const date = new Date(name);
          const dayNumber = date.getDate();
          const monthName = date.toLocaleString('default', { month: 'long' });
          return {
            x: `${monthName} ${dayNumber}`,
            y: productionTimestamps[name] || 0.0,
          };
        }
      );
      productionData[0]
        ? (this.data = [
            { type: 'consumption', values: consumptionData },
            { type: 'production', values: productionData },
          ])
        : (this.data = []);

      if (this.data.length == 0) {
        this.spiner.hide();
        return;
      }

      const chartData = {
        datasets: [
          {
            label: 'Predicted Consumption',
            data: consumptionData,
            backgroundColor: 'rgba(255, 125, 65, 1)',
            borderColor: 'rgba(255, 125, 65, 0.5)',
          },
          {
            label: 'Predicted Production',
            data: productionData,
            backgroundColor: 'rgba(0, 188, 179, 1)',
            borderColor: 'rgba(0, 188, 179, 0.5)',
          },
        ],
      };

      const chartElement: any = document.getElementById(
        'chartCanvasPredictionAll'
      ) as HTMLElement;
      if (this.chart) {
        this.chart.destroy();
      }
      const chart2d = chartElement.getContext('2d');
      this.chart = new Chart(chart2d, {
        type: 'bar',
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: false,
            },
          },
          maintainAspectRatio: false,
        },
      });

      this.spiner.hide();
    });
  }

  Prediction3Days() {
    this.spiner.show();
    this.servicetime.PredictionNext3Days().subscribe((response: any) => {
      const consumptionTimestamps = response.consumption || {};
      const productionTimestamps = response.production || {};

      const consumptionData = Object.keys(consumptionTimestamps).map(
        (name: any) => {
          const date = new Date(name);
          const dayNumber = date.getDate();
          const monthName = date.toLocaleString('default', { month: 'long' });
          return {
            x: `${monthName} ${dayNumber}`,
            y: consumptionTimestamps[name] || 0.0,
          };
        }
      );

      const productionData = Object.keys(productionTimestamps).map(
        (name: any) => {
          const date = new Date(name);
          const dayNumber = date.getDate();
          const monthName = date.toLocaleString('default', { month: 'long' });
          return {
            x: `${monthName} ${dayNumber}`,
            y: productionTimestamps[name] || 0.0,
          };
        }
      );
      productionData[0]
        ? (this.data = [
            { type: 'consumption', values: consumptionData },
            { type: 'production', values: productionData },
          ])
        : (this.data = []);

      if (this.data.length == 0) {
        this.spiner.hide();
        return;
      }

      const chartData = {
        datasets: [
          {
            label: 'Predicted Consumption',
            data: consumptionData,
            backgroundColor: 'rgba(255, 125, 65, 1)',
            borderColor: 'rgba(255, 125, 65, 0.5)',
          },
          {
            label: 'Predicted Production',
            data: productionData,
            backgroundColor: 'rgba(0, 188, 179, 1)',
            borderColor: 'rgba(0, 188, 179, 0.5)',
          },
        ],
      };

      const chartElement: any = document.getElementById(
        'chartCanvasPredictionAll'
      ) as HTMLElement;
      if (this.chart) {
        this.chart.destroy();
      }
      const chart2d = chartElement.getContext('2d');
      this.chart = new Chart(chart2d, {
        type: 'bar',
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: false,
            },
          },
          maintainAspectRatio: false,
        },
      });

      this.spiner.hide();
    });
  }

  PredictionDay() {
    this.spiner.show();
    this.servicetime.PredictionNextDay().subscribe((response: any) => {
      const consumptionTimestamps = response.consumption || {};
      const productionTimestamps = response.production || {};

      const consumptionData = Object.keys(consumptionTimestamps).map(
        (name: any) => {
          const date = new Date(name);
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          return {
            x: `${hours}:${minutes}`,
            y: consumptionTimestamps[name] || 0.0,
          };
        }
      );

      const productionData = Object.keys(productionTimestamps).map(
        (name: any) => {
          const date = new Date(name);
          const hours = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          return {
            x: `${hours}:${minutes}`,
            y: consumptionTimestamps[name] || 0.0,
          };
        }
      );

      const chartData = {
        datasets: [
          {
            label: 'Predicted Consumption',
            data: consumptionData,
            backgroundColor: 'rgba(255, 125, 65, 1)',
            borderColor: 'rgba(255, 125, 65, 0.5)',
          },
          {
            label: 'Predicted Production',
            data: productionData,
            backgroundColor: 'rgba(0, 188, 179, 1)',
            borderColor: 'rgba(0, 188, 179, 0.5)',
          },
        ],
      };
      productionData[0]
        ? (this.data = [
            { type: 'consumption', values: consumptionData },
            { type: 'production', values: productionData },
          ])
        : (this.data = []);

      if (this.data.length == 0) {
        this.spiner.hide();
        return;
      }

      const chartElement: any = document.getElementById(
        'chartCanvasPredictionAll'
      ) as HTMLElement;
      if (this.chart) {
        this.chart.destroy();
      }

      const chart2d = chartElement.getContext('2d');
      this.chart = new Chart(chart2d, {
        type: 'bar',
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: false,
            },
          },
          maintainAspectRatio: false,
        },
      });
      this.spiner.hide();
    });
  }
  activateButton(buttonNumber: string) {
    const buttons = document.querySelectorAll('.realizationbtn');
    buttons.forEach((button) => {
      if (button.id == buttonNumber) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  }
}
