import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFormControlComponent } from 'ng-zorro-antd/form';
import { NzFormDirective } from 'ng-zorro-antd/form';
import { NzFormItemComponent } from 'ng-zorro-antd/form';
import { NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzColDirective } from 'ng-zorro-antd/grid';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { NgIf } from '@angular/common';
import { GasesListComponent } from '../gases-list/gases-list.component';
import { UpdateGasesComponent } from '../update-gases/update-gases.component';
import { GasesService } from '../../services/gases.service.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-gases',
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
    CommonModule,
    NgIf,
    GasesListComponent,
    UpdateGasesComponent,
  ],
  templateUrl: './gases.component.html',
  styleUrl: './gases.component.css'
})
export class GasesComponent {
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
  selectedGas: any;

  validateForm: FormGroup<{
    name: FormControl<string>;
    description: FormControl<string>;
    nomenclature: FormControl<string>;
  }>;

  submitForm(): void {
    if(this.validateForm.valid) {
      this.service.createGases(this.validateForm.value).subscribe(() => {
        this.createNotification('success', `${this.validateForm.value.name}\n${this.validateForm.value.description}`, 'The gas was created successfully'
        );
      });
    }
  }

  createNotification(type: string, title: string, content: string): void {
    this.notification.create(type, title, content);
  }

  onGasUpdate():void {
    this.selectedGas = null;
  }

  editGas(data: any): void {
    this.selectedGas = data;
  }
}
