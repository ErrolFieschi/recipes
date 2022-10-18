import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-suppress',
  templateUrl: './dialog-suppress.component.html',
  styleUrls: ['./dialog-suppress.component.scss']
})
export class DialogSuppressComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(){
    this.dialog.open(DialogSuppressComponent);
  }
}
