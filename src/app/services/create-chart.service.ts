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

  public createChart(_data: ChartI) {
    let seriesDefault: SeriesI[] = [];

    const {typeChart, chartName, color, unitsFormat, data, time} = _data;

    if (_data.id == 4) {
       seriesDefault = _data.dataSeries;

    } else {
      seriesDefault = [{name: chartName, data: data, color: color, type: typeChart}];
    }

    return new Chart({
        title: {
           text: chartName
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

  public getData(arr: object[], item: ChartI, findBy: string, filterBy: string): ChartI {
     const byDay: object[] = this.filterByDay(arr, filterBy);
     return this.mapData(byDay, item, findBy);
  }

  private filterByDay(arr: any, filterBy: string): object[] {
     return arr.filter((i) => moment.utc(moment.unix(i.dt)).format('YYYY-MM-DD') == filterBy);
  }

  private mapData(arr: any, item: ChartI, findBy: string): ChartI {
    arr.map(() => {
      if (findBy) {
         item.data = arr.map(dataVal => dataVal[findBy][item.typeData]);
      }
   });

   item.time = arr.map(dataTime => moment(dataTime.dt_txt).format('H:m:s'));

   return item;
  }
}
