import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';

import { ByDayI } from '../../models/byDay';
import { SelectorDataI } from '../../models/selectorData';
import * as moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    @Input() filterByDay: string;
    @Input() headerTemplate: TemplateRef<any>;
    @Output() dayBy: EventEmitter<ByDayI> = new EventEmitter<ByDayI>();

    public dayBy1: string = moment().add(1, 'day').format('YYYY-MM-DD');
    public dayBy2: string = moment().add(2, 'day').format('YYYY-MM-DD');
    public dayBy3: string = moment().add(3, 'day').format('YYYY-MM-DD');

    public title: string = 'Dashboard';

    public dates: SelectorDataI[] = [
        {
            value: this.dayBy1,
            viewValue: this.dayBy1
        },
        {
            value: this.dayBy2,
            viewValue: this.dayBy2
        },
        {
            value: this.dayBy3,
            viewValue: this.dayBy3
        },
    ];

  constructor() { }

  ngOnInit() {
  }

  public onChange(value: ByDayI) {
    this.dayBy.emit(value);
  }
}
