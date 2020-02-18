import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OnChangeDataI } from '../../models/onChangeData';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent implements OnInit {

  @Input() color: string;
  @Output() changeColor: EventEmitter<OnChangeDataI> = new EventEmitter<OnChangeDataI>();

  constructor() { }

  ngOnInit() {
  }

  public onChange(color: string, field: string) {
    const changeField: OnChangeDataI = { value: color, field: field };
    this.changeColor.emit(changeField);
  }
}
