import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CreateChartService } from '../../services/create-chart.service';
import { OnChangeDataI } from '../../models/onChangeData';
import { SelectorDataI } from '../../models/selectorData';
import { ChartI } from '../../models/charts';
import { SeriesI } from '../../models/series';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() data;
  @Input()
  set config(dataConf) {
    if (dataConf) {
      this._config = dataConf;
      this.createChart(this._config, this.data, this._config.getFromField, this.dayBy);
      this.checkCompare(this._config);
    }
  }

  @Input()
  set dayBy(time) {
    if (time) {
      this.createChart(this._config, this.data, this._config.getFromField, time);
    }
  }

  @Output() changedType: EventEmitter<any> = new EventEmitter<any>();
  @Output() onAddSeries: EventEmitter<SeriesI> = new EventEmitter<SeriesI>();

  public _config;
  public charts: object;
  public compare: boolean = true;
  public label: string = 'Chart type';
  public selectedOption: string;
  public colorChart: string;
  public active: boolean;

  public chartTypes: SelectorDataI[] = [
    {value: 'line', viewValue: 'line'},
    {value: 'bar', viewValue: 'bar'},
    {value: 'column', viewValue: 'column'}
  ];

  constructor(private _createChart: CreateChartService) { }

  ngOnInit() {
    this.selectedOption = this._config.settings.typeChart;
    this.colorChart = this._config.settings.color;
  }

  private checkCompare(element: ChartI): void {
    if (element.comparing) {
      this.active = true;
    }

    if (element.name === 'Compare') {
      this.compare = false;
    }
  }

  private createChart(config: ChartI, chartData, findBy, filterBy): object {
    return this.charts = this._createChart.createChart(config, chartData, findBy, filterBy);
  }

  public onChange(value: OnChangeDataI): void {
    this._config.settings[value.field] = value.value;
    this.changedType.emit(this._config);
  }

  public onCompare(element: ChartI): void {
    this.onAddSeries.emit({
       name: element.name,
       data: element.settings.data,
       type: element.settings.typeChart,
       color: element.settings.color,
     });
    this.active = !this.active;
  }

}
