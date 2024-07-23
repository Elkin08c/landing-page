import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';
import { GasesService } from '../../services/gases.service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { NonNullableFormBuilder } from '@angular/forms';
import { NzFormControlComponent } from 'ng-zorro-antd/form';
import { NzFormDirective } from 'ng-zorro-antd/form';
import { NzFormItemComponent } from 'ng-zorro-antd/form';
import { NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzColDirective } from 'ng-zorro-antd/grid';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-update-gases',
  standalone: true,
  imports: [
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzColDirective,
    ReactiveFormsModule,
    NzInputDirective,
    NzButtonComponent,
    NzInputNumberComponent,
  ],
  templateUrl: './update-gases.component.html',
  styleUrl: './update-gases.component.css'
})
export class UpdateGasesComponent implements OnChanges{
  constructor(
    private service: GasesService,
    private fb: NonNullableFormBuilder,
    private notification: NzNotificationService
  ) {
    const { required } = Validators;
    this.validateForm = this.fb.group({
      name: ["", [required]],
      description: ["", [required]],
      nomenclature: ["", [required]],
    });
  }

  @Input() data: any;
  @Output() gasUpdated = new EventEmitter<any>();

  validateForm: FormGroup<{
    name: FormControl<string>;
    description: FormControl<string>;
    nomenclature: FormControl<string>;
  }>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["data"]){
      this.setValues(changes);
    }
  }

  setValues(data: any): void {
    if(this.data){
      this.validateForm.setValue({
        name: this.data.name,
        description: this.data.description,
        nomenclature: this.data.nomenclature,
      });
    }
  }

  submitFormGasUpdate(): void {
    if(this.validateForm.valid){
      this.service.updateGas(this.data.id, this.validateForm.value).subscribe(()=>{
        this.createNotification("success", "Gas Updated", "The gas has been updated successfully");  
      });
    }
 } 

 createNotification(type: string, title: string, content: string): void {
  this.notification.create(type, title, content);
 }
}
