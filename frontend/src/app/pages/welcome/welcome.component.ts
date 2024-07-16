import { Component, OnInit } from '@angular/core';
import { CrudFormComponent } from '../../crud-form/crud-form.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  imports: [
    CrudFormComponent,
  ],
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  product: any = [];
  constructor() {}

  ngOnInit() {}
}
