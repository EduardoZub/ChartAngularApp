import { Injectable } from '@angular/core';

import { Chart } from 'angular-highcharts';
import { ChartI } from '../models/charts';
import { SeriesI } from '../models/series';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CreateChartService {

  constructor() { }

  public createChart(_dataConfig: ChartI, _chartData, _findBy, _filterBy) {
    this.getData(_chartData, _dataConfig, _findBy, _filterBy);

    let seriesDefault: SeriesI[] = [];

    const { name, unitsFormat} = _dataConfig;
    const { typeChart, color, data, time } = _dataConfig.settings;

    if (_dataConfig.id == 4) {
       seriesDefault = _dataConfig.settings.dataSeries;

    } else {
      seriesDefault = [{ name: name, data: data, color: color, type: typeChart }];
    }

    return new Chart({
        title: {
           text: name
        },
        credits: {
           enabled: false
        },
        yAxis: {
            title: {
               text: unitsFormat,
            }
        },
        xAxis: {
           categories: time
        },
        series: seriesDefault
    } as any);
  }

  private getData(arr: object[], item: ChartI, findBy: string, filterBy: string): ChartI {
     const byDay: object[] = this.filterByDay(arr, filterBy);
     return this.mapData(byDay, item, findBy);
  }

  private filterByDay(arr: any, filterBy: string): object[] {
     return arr.filter((i) => moment.utc(moment.unix(i.dt)).format('YYYY-MM-DD') == filterBy);
  }

  private mapData(arr: any, item: ChartI, findBy: string): ChartI {
    arr.forEach(() => {
      if (findBy) {
         item.settings.data = arr.map(dataVal => dataVal[findBy][item.typeData]);
      }
   });

   item.settings.time = arr.map(dataTime => moment(dataTime.dt_txt).format('H:m:s'));

   return item;
  }
}
