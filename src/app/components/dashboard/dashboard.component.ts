import { Component, OnInit } from '@angular/core';
import { delay, finalize } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';
import { GetDataChartsService } from '../../services/get-data-charts.service';
import { ChartI } from '../../models/charts';
import { ByDayI } from '../../models/byDay';
import { SeriesI } from '../../models/series';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    public data: any;
    public filterByDay: string;
    public chartDayBy = 1;
    public preloader = false;
    
    public config: any[] = [
        {
            name: 'Pressure',
            id: 1,
            typeData: 'pressure',
            unitsFormat: 'P',
            getFromField: 'main',
            comparing: false,
            settings: {
                typeChart: 'line',
                color: '#7cb5ec',
                data: null,
                time: null
            }
        },
        {
            name: 'Temperature',
            id: 2,
            typeData: 'temp_max',
            unitsFormat: '℃',
            getFromField: 'main',
            comparing: false,
            settings: {
                typeChart: 'line',
                color: '#f7a35c',
                data: null,
                time: null
            }
        },
        {
            name: 'Humidity',
            id: 3,
            typeData: 'humidity',
            unitsFormat: 'φ',
            getFromField: 'main',
            comparing: false,
            settings: {
                typeChart: 'line',
                color: '#90ed7d',
                data: null,
                time: null
            }
        },
        {
            id: 4,
            name: 'Compare',
            settings: {
                dataSeries: [],
                time: null
            }
        }
    ];

    constructor(
        private getCharts: GetDataChartsService,
        private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.filterByDay = moment().add(this.chartDayBy, 'day').format('YYYY-MM-DD');

    this.getCharts.getData()
        .pipe(
            delay(2000),
            finalize(() => this.preloader = true),
        )
        .subscribe((data) => {
            this.data = data.list;
        });
    }

    public onChange(field: ChartI): void {
        this.config = this.config.map((i) => {
            this.checkCompare(i, this.config.filter((c) => c.name === 'Compare')[0]);

            if (i.id === field.id) {
                i = { ...i, settings: field.settings};
                return i;
            }

            return i;
        });
    }

    public onChangeDay(date: ByDayI): void {
        this.filterByDay = date.value;
    }

    public trackByFn(index, item) {
        return item;
    }

    public onAddSeries(series: SeriesI): void {
        let compareStatus = 'added to';

        this.config = this.config.map((configItem) => {
            if (configItem.name !== 'Compare') {
                this.checkCompare(configItem, this.config.filter((c) => c.name === 'Compare')[0]);
                return configItem;
            }

            if (configItem.settings.dataSeries.find(dataSeriesItem => dataSeriesItem.name === series.name)) {
                configItem.settings.dataSeries = configItem.settings.dataSeries.filter(dataSeriesItem => dataSeriesItem.name !== series.name);
                compareStatus = 'remove from';
                return JSON.parse(JSON.stringify(configItem));
            }

            const newDSeries = [...configItem.settings.dataSeries, ...[series]];

            configItem.settings = {...configItem.settings, ...{ dataSeries: newDSeries }};
            return  JSON.parse(JSON.stringify(configItem));
        });

        this.openSnackBar(compareStatus, series.name);
    }

    private checkCompare(element, compareConfig): void {
        if (compareConfig.settings.dataSeries.find(d => d.name === element.name)) {
         element.comparing = true;
        } else {
          element.comparing = false;
        }
    }

    private openSnackBar(status: string, chartName: string): void {
        let message = `${chartName}: ${status} compare`;
        this._snackBar.open(message, null, {
          duration: 2000,
          panelClass: 'cust-theme',
          verticalPosition: 'bottom',
          horizontalPosition: 'right'
        });
    }
}
