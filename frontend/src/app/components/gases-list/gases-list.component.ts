import { Component, EventEmitter, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { GasesService } from '../../services/gases.service.service';
import { OnInit } from '@angular/core';
import { Output } from '@angular/core';



@Component({
  selector: 'app-gases-list',
  standalone: true,
  imports: [
    CommonModule, NzTableModule, NzButtonModule, 
  ],
  templateUrl: './gases-list.component.html',
  styleUrl: './gases-list.component.css'
})
export class GasesListComponent implements OnInit {
  constructor(private service: GasesService){}
  data: any[] = [];
  @Output() gasSelected = new EventEmitter<any>();

  ngOnInit(): void {
    this.loadGases();
  }

  loadGases(){
    this.service.getGases().subscribe((data)=>{
      this.data = data;
    });
  }

  deleteGas(id: number):void{
    this.service.deleteGas(id).subscribe(()=>{
      this.loadGases();
    })
  }

  selectedGas(data:any):void{
    this.gasSelected.emit(data);
  }
}
