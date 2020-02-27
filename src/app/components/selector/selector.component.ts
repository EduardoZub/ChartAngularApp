import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ByDayI } from '../../models/byDay';
import { SelectorDataI } from '../../models/selectorData';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {

  @Input() data: SelectorDataI;
  @Input() selectedOption: string;
  @Input() label: string;
  @Output() onChangeOption: EventEmitter<ByDayI> = new EventEmitter<ByDayI>();

  public selected: string;

  constructor() { }

  ngOnInit() {
    this.selected = this.selectedOption;
  }

  public onChange(value, field: string): void {
    const changeField: ByDayI = { value: value.innerText, field: field };
    this.onChangeOption.emit(changeField);
  }
}
