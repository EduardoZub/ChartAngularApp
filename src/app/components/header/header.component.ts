import { Component, Input, Output, EventEmitter, TemplateRef } from '@angular/core';

import { ByDayI } from '../../models/byDay';
import { SelectorDataI } from '../../models/selectorData';
import * as moment from 'moment';

const FORMAT = 'YYYY-MM-DD';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    @Input() filterByDay: string;
    @Input() headerTemplate: TemplateRef<any>;
    @Output() dayBy: EventEmitter<ByDayI> = new EventEmitter<ByDayI>();

    public day1: string = moment().add(1, 'day').format(FORMAT);
    public day2: string = moment().add(2, 'day').format(FORMAT);
    public day3: string = moment().add(3, 'day').format(FORMAT);

    public title: string = 'Dashboard';

    public dates: SelectorDataI[] = [
        {
            value: this.day1,
            viewValue: this.day1
        },
        {
            value: this.day2,
            viewValue: this.day2
        },
        {
            value: this.day3,
            viewValue: this.day3
        },
    ];

  constructor() { }

  public onChange(value: ByDayI) {
    this.dayBy.emit(value);
  }
}
