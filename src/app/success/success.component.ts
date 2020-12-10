import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public Data: any,
    public dialogRef: MatDialogRef<SuccessComponent>,) { }

  ngOnInit(): void {
  }
  onClose() {
    this.dialogRef.close(this.Data);
  }

}
