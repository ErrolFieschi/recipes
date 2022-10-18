import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RecipesService } from 'src/app/recipe/services/recipes.service';

@Component({
  selector: 'app-dialog-suppress',
  templateUrl: './dialog-suppress.component.html',
  styleUrls: ['./dialog-suppress.component.scss']
})
export class DialogSuppressComponent implements OnInit {

  formSupp!: FormControl;
  suppWord = new FormControl;
  
 

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {

  }

}