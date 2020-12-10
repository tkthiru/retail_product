import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'retail-shop';
}

export interface categories {
  name: string;
  description: string;
  status: any;
  quantity: number;
  result: any;
  message: any;
}