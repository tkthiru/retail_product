import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { SuccessComponent } from '../success/success.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  createForm: FormGroup;
  buttonLabel = 'Create';
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private apiService: ApiserviceService) { }

  ngOnInit(): void {

    // initate the form
    this.createForm = this.formBuilder.group({
      availableQuantity: ['', Validators.required],
      productName: ['', Validators.required]
    });

  }

  onSubmit(formtype) {

    if (formtype === 'Create') {  // create flow
      this.apiService.create(this.createForm.value)
        .subscribe(data => {
          this.showPopup({ data: 'Record has been created successfully', action: 'search' });
        });
    }

  }

  showPopup(data) {
    const dialogRef = this.dialog.open(SuccessComponent, {
      height: 'auto',
      width: '25%',
      data: data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/search']);
    });
  }


}
