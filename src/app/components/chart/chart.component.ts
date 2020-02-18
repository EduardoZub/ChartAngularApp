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

  @Input() config: ChartI;
  @Output() changedType: EventEmitter<any> = new EventEmitter<any>();
  @Output() onAddSeries: EventEmitter<SeriesI> = new EventEmitter<SeriesI>();

  public charts: object;
  public compare: boolean = true;
  public label: string = 'Chart type';
  public selectedOption: string;
  public colorChart: string;

  public chartTypes: SelectorDataI[] = [
    {value: 'line', viewValue: 'line'},
    {value: 'bar', viewValue: 'bar'},
    {value: 'column', viewValue: 'column'}
  ];

  constructor(private _createChart: CreateChartService) { }

  ngOnInit() {
    this.createChart(this.config);
    this.selectedOption = this.config.typeChart;
    this.colorChart = this.config.color;
    this.checkCompare(this.config);
  }

  private checkCompare(element: ChartI): void {
    if (element.chartName == 'Compare') {
      this.compare = false;
    }
  }

  private createChart(config: ChartI): object {
    return this.charts = this._createChart.createChart(config);
  }

  public onChange(value: OnChangeDataI): void {
    this.changedType.emit({ ...this.config, [value.field]: value.value });
  }

  public onCompare(element: ChartI): void {
    this.onAddSeries.emit({
       name: element.chartName,
       data: element.data,
       type: element.typeChart,
       color: element.color,
     });
  }

}
