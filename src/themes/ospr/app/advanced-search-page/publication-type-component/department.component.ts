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
    { name: 'Animation', value: 'Animation' }, 
    { name: 'Article', value: 'Article' }, 
    { name: 'Book', value: 'Book' }, 
    { name: 'Book chapter', value: 'Book chapter' }, 
    { name: 'Dataset', value: 'Dataset' }, 
    { name: 'Learning Object', value: 'Learning Object' }, 
    { name: 'Image', value: 'Image' }, 
    { name: 'Image, 3-D', value: 'Image, 3-D' }, 
    { name: 'Map', value: 'Map' }, 
    { name: 'Musical Score', value: 'Musical Score' }, 
    { name: 'Plan or blueprint', value: 'Plan or blueprint' }, 
    { name: 'Preprint', value: 'Preprint' }, 
    { name: 'Presentation', value: 'Presentation' }, 
    { name: 'Recording, acoustical', value: 'Recording, acoustical' }, 
    { name: 'Recording, musical', value: 'Recording, musical' }, 
    { name: 'Recording, oral', value: 'Recording, oral' }, 
    { name: 'Software', value: 'Software' }, 
    { name: 'Technical Report', value: 'Technical Report' }, 
    { name: 'Thesis', value: 'Thesis' }, 
    { name: 'Video', value: 'Video' }, 
    { name: 'Working Paper', value: 'Working Paper' }, 
    { name: 'Other', value: 'Other' }

  ];

  selectedValue: string;

  ngOnInit() {
    this.selectedValue = this.items[0].value;
  }

  onSelectionChange(value: string) {
    this.selectedValue = value;
  }

  getData() {
    return this.selectedValue;
  }
}
