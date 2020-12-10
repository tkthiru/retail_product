import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SuccessComponent } from '../success/success.component';
import { ApiserviceService } from '../apiservice.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  columns = [
    { name: 'Product Name', prop: 'productName', width: 120, minWidth: 120 },
    { name: 'Available Quantity', prop: 'availableQuantity', width: 125, minWidth: 120 },
  ];
  FDcount = 5;
  pageLimit = 100;
  rowDatas: any;
  rowCount: any;
  showTable = false;
  constructor(private formBuilder: FormBuilder, private router: Router, public dialog: MatDialog, private apiService: ApiserviceService) { }

  ngOnInit(): void {
    this.onSearchSubmit();
  }

  onSearchSubmit() {
    this.showTable = true;
    this.apiService.getAll().subscribe((data) => {
      this.rowDatas = data;
      this.rowDatas = this.rowDatas.filter((x) => {
        if (x.productName !== null) {
          return x;
        }
      })

      this.rowCount = this.rowDatas.length;
    });
  }

  OnOrder(data) {
    const datas = {
      orderId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      customerId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      productId: data.productId,
      quantity: 1

    }
    if (data.availableQuantity > 0) {
      this.apiService.PlaceOrder(datas)
        .pipe(
          catchError(err => {
            this.showPopup({ data: 'Internal server error', action: 'error' });
            return throwError(err);
          })
        ).subscribe(data => {
          this.showPopup({ data: 'Your Order has been placed successfully', action: 'success' });
        });
    } else {
      this.showPopup({ data: 'Insufficient Quantity. Add quantity for this product', action: 'create' });
    }

  }


  showPopup(data) {
    const dialogRef = this.dialog.open(SuccessComponent, {
      height: 'auto',
      width: '25%',
      data: data
    })
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result.action === 'create'){
        this.router.navigate(['/create']);
      } else {
        this.onSearchSubmit();
      }
    });
  }
}
