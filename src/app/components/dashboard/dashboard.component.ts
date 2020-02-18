import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { delay, finalize } from 'rxjs/operators';

import { GetDataChartsService } from '../../services/get-data-charts.service';
import { CreateChartService } from '../../services/create-chart.service';
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
    public charts: ChartI[];
    public filterByDay: string;
    public chartDayBy = 1;
    public preloader = false;
    
    public config: ChartI[] = [
        {
            id: 1,
            typeChart: 'line',
            chartName: 'Pressure',
            typeData: 'pressure',
            unitsFormat: 'P',
            color: '#7cb5ec',
            getFromField: 'main',
            data: null,
            time: null
        },
        {
            id: 2,
            typeChart: 'line',
            chartName: 'Temperature',
            typeData: 'temp_max',
            unitsFormat: '℃',
            color: '#f7a35c',
            getFromField: 'main',
            data: null,
            time: null
        },
        {
            id: 3,
            typeChart: 'line',
            chartName: 'Humidity',
            typeData: 'humidity',
            unitsFormat: 'φ',
            color: '#90ed7d',
            getFromField: 'main',
            data: null,
            time: null
        },
        {
            id: 4,
            chartName: 'Compare',
            dataSeries: [],
            time: null
        }
    ];

    constructor(
        private getCharts: GetDataChartsService,
        private createChart: CreateChartService) {}

  ngOnInit() {
    this.filterByDay = moment().add(this.chartDayBy, 'day').format('YYYY-MM-DD');

    this.getCharts.getData()
        .pipe(
            delay(2000),
            finalize(() => this.preloader = true),
        )
        .subscribe((data) => {
            this.data = data.list;
            this.collectDataConfig(this.data);
        });
    }

    private collectDataConfig(data: any): void {
        this.config.map(item => this.createChart.getData(data, item, item.getFromField, this.filterByDay));
        this.charts = JSON.parse(JSON.stringify(this.config));
    }

    public onChange(field: ChartI): void {
        this.config = this.config.map((i) => {
            if (i.id === field.id) {
                return field;
            }

            return i;
        });

        this.charts = this.config;
    }

    public onChangeDay(date: ByDayI): void {
        this.filterByDay = date.value;
        this.collectDataConfig(this.data);
    }

    public onAddSeries(series: SeriesI): void {
        this.config.map((configItem) => {
            if (configItem.chartName === 'Compare') {

                if (configItem.dataSeries.find(dataSeriesItem => dataSeriesItem.name === series.name)) {
                    configItem.dataSeries = configItem.dataSeries.filter(dataSeriesItem => dataSeriesItem.name !== series.name);
                    return configItem.dataSeries;
                }

                configItem.dataSeries.push(series);
                return configItem.dataSeries;
            }

            return configItem;
        });

        this.collectDataConfig(this.data);
    }
}
