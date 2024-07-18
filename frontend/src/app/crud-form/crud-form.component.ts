import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ApiService } from '../product.service';
import {
  NzFormControlComponent,
  NzFormDirective,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzColDirective } from 'ng-zorro-antd/grid';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { FormBuilder, Validators as Validators } from '@angular/forms';
import { CrudListComponent } from '../crud-list/crud.component'; 
import { CommonModule, NgIf } from '@angular/common';


@Component({
  selector: 'app-crud-form',
  standalone: true,
  imports: [
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzColDirective,
    ReactiveFormsModule,
    NzInputDirective,
    NzDatePickerComponent,
    NzButtonComponent,
    NzInputNumberComponent,
    CrudListComponent,
    CommonModule,
    NgIf,
  ],
  templateUrl: './crud-form.component.html',
  styleUrls: ['./crud-form.component.css'],
})

export class CrudFormComponent {
  validateForm: FormGroup;
  selectedCrud: any = null;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private notification: NzNotificationService
  ) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      nomenclature: ['', [Validators.required]],
    });
  }

  submitFormCrud(): void {
    if (this.validateForm.valid) {
      const formData = this.validateForm.value;
      if (this.selectedCrud) {
        this.apiService.updateCrud(this.selectedCrud.id, formData).subscribe(() => this.onSuccess('updated'));
      } else {
        this.apiService.createCrud(formData).subscribe(() => this.onSuccess('created'));
      }
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
    }
  }


  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

  onSuccess(action: string): void {
    this.createNotification('success', 'Success', `Product has been ${action} successfully!`);
    this.validateForm.reset();
    this.selectedCrud = null;
  }
}