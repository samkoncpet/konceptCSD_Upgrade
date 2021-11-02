import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-groups',
  templateUrl: './button-groups.component.html',
  styleUrls: []
})
export class ButtonGroupsComponent implements OnInit {

  radio1 = 1;
  radio2 = 2;
  radio3! : number;
  radio4! : number;
  checkbox1 = false;

  radio5 = 1;

  skills = {
    php: true,
    html: false,
    wordpress: false,
    javascript: true
  }

  editor = {
    bold: false,
    italic: false,
    underline: false
  }

  residence!: number;
  transportation!: number;
  feedback!: number;
  payment!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
