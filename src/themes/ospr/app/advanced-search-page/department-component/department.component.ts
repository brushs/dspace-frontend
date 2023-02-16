// combo-box.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'department-combo-box',
  templateUrl: './department.component.html',
  styles: [`
    select {
      padding: 10px;
      font-size: 14px;
      width: 200px;
    }
  `]
})
export class DepartmentComponent implements OnInit {
  items = [
    { name: 'IT department', value: 'option-1' },
    { name: 'HR department', value: 'option-2' },
    { name: 'Geo Survey department', value: 'option-3' }
  ];

  selectedValue: string;

  ngOnInit() {
    this.selectedValue = this.items[0].value;
  }

  onSelectionChange(value: string) {
    this.selectedValue = value;
  }
}
