import { Component, OnInit } from '@angular/core';
import { GasesComponent } from '../../components/gases/gases.component';
import { GasesListComponent } from '../../components/gases-list/gases-list.component';
import { UpdateGasesComponent } from '../../components/update-gases/update-gases.component';


@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  imports: [
    GasesComponent,
    GasesListComponent,
    UpdateGasesComponent
],
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  product: any = [];
  constructor() {}

  ngOnInit() {}
}
