import { Component, Input, OnInit } from '@angular/core';
import { Step } from 'src/app/core/models/step.model';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {

  @Input() steps!: Step[]; 
  constructor() { }

  ngOnInit(): void {
  }

}
