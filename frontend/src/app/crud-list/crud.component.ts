import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../product.service';
import { CommonModule, NgFor } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-crud-list',
  standalone: true,
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
  imports: [CommonModule, NzTableModule, NzButtonModule, NgFor],
})
export class CrudListComponent implements OnInit {
  crud: any[] = [];
  @Output() crudSelected = new EventEmitter<any>();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCrud();
  }

  loadCrud(): void {
    this.apiService.getCrud().subscribe((data: any[]) => {
      this.crud = data;
      console.log(this.crud);
    });
  }

  selectCrud(crud: any): void {
    this.crudSelected.emit(crud);
  }

  deleteCrud(crudId: string): void {
    this.apiService.deleteCrud(crudId).subscribe(() => {
      this.loadCrud();
    });
  }
}
