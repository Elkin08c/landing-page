import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
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

@Component({
  selector: 'app-crud-update-form',
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
  ],
  templateUrl: './crud-update-from.component.html',
  styleUrls: ['./crud-update-from.component.css'],
})
export class CrudUpdateFormComponent implements OnChanges {
  validateForm: FormGroup<{
    nombre: FormControl<string>;
    description: FormControl<string>;
    nomenclatura: FormControl<number>;
  }>;

  @Input() crud: any;
  @Output() crudUpdated = new EventEmitter<void>();

  constructor(
    private fb: NonNullableFormBuilder,
    private apiService: ApiService,
    private notification: NzNotificationService
  ) {
    const { required } = MyValidators;
    this.validateForm = this.fb.group({
      nombre: ['', [required]],
      description: ['', [required]],
      nomenclatura: [0, [required]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['crud']) {
      this.setFormValues();
    }
  }

  setFormValues(): void {
    if (this.crud) {
      this.validateForm.setValue({
        nombre: this.crud.nombre,
        description: this.crud.description,
        nomenclatura: this.crud.nomenclatura,
      });
    }
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.apiService
        .updateCrud(this.crud.id, this.validateForm.value)
        .subscribe(() => {
          this.createNotification(
            'success',
            `${this.validateForm.value.nombre} ${this.validateForm.value.description}`,
            'The crud has been updated successfully!'
          );
          this.crudUpdated.emit();
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
}
