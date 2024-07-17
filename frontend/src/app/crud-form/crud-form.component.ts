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
import { Validators as MyValidators } from '@angular/forms';
import { CrudListComponent } from '../crud-list/crud.component'; 
import { CrudUpdateFormComponent } from '../update-crud-from/crud-update-from.component';
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
    CrudUpdateFormComponent,
    CommonModule,
    NgIf,
  ],
  templateUrl: './crud-form.component.html',
  styleUrls: ['./crud-form.component.css'],
})
export class CrudFormComponent {

  validateForm: FormGroup<{
    name: FormControl<string>;
    description: FormControl<string>;
    nomenclature: FormControl<string>;
  }>;

  selectedCrud: any;

  constructor(
    private apiService: ApiService,
    private fb: NonNullableFormBuilder,
    private notification: NzNotificationService
  ) {
    const { required } = MyValidators;
    this.validateForm = this.fb.group({
      name: ['', [required]],
      description: ['', [required]],
      nomenclature: ['', [required]],
    });
  }

  submitFormCrud(): void {
    if (this.validateForm.valid) {
      this.apiService.createCrud(this.validateForm.value).subscribe(() => {
        this.createNotification(
          'success',
          `${this.validateForm.value.name} ${this.validateForm.value.description}`,
          'The Product has been created successfully!'
        );
        this.validateForm.reset();
      });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

  editCrud(product: any): void {
    this.selectedCrud = product;
  }

  onCrudUpdated(): void {
    this.selectedCrud = null;
  }
}
