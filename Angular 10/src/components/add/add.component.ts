import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LandMarkDto } from 'src/app/models/land-mark.model';
import { LandMarkService } from 'src/services/landmark.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  readonly landMarkNameControlName = 'landMarkName';
  readonly addressControlName = 'address';
  readonly latitudeControlName = 'latitude';
  readonly longitudeControlName = 'longitude';
  readonly contactControlName = 'contact';
  formGroup: FormGroup;
  constructor(private _router: Router, private _fb: FormBuilder, private _service: LandMarkService, private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.InitForm();
  }

  private InitForm = () => {
    this.formGroup = this._fb.group({
      [this.landMarkNameControlName]: ['', [Validators.required]],
      [this.addressControlName]: [''],
      [this.latitudeControlName]: ['', [Validators.required, this.validationdecimal().bind(this)]],
      [this.longitudeControlName]: ['',
        [Validators.required, this.validationdecimal().bind(this)]],
      [this.contactControlName]: ['', [Validators.required, this.validationNumber().bind(this)]],
    })
  }

  cancel = () => {
    this._router.navigate(['/']);
  }

  validationdecimal(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let val = (control.value || '').trim();
      if (val) {
        if (!isNaN(val)) {
          val = +val;
          const isValid = /^\d{1,2}\.\d{0,6}$/.test(val);
          return isValid ? null : { 'decimalError': true };
        } else {
          return { 'decimalError': true };
        }
      } else {
        return null;
      }
    }
  }

  validationNumber(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const val = (control.value || '').trim();
      if (val) {
        if (+val == 0) {
          return { 'zero': true };
        } else {
          const isValid = /^\d+$/.test(val);
          return isValid ? null : { 'onlynumber': true };
        }
      } else {
        return null;
      }
    }
  }

  validateOnBlur(controlName) {
    const ctrl = this.formGroup.controls[controlName];
    ctrl.setValue(ctrl.value.trim());
  }

  submit = () => {
    if (this.formGroup.dirty && this.formGroup.valid) {
      const model = new LandMarkDto();
      model.landmarkId = 0;
      model.pointOrder = 0;
      model.landmarkName = this.formGroup.controls[this.landMarkNameControlName].value;
      model.address = this.formGroup.controls[this.addressControlName].value;
      model.contactDetails = this.formGroup.controls[this.contactControlName].value;
      model.contactDetails = +model.contactDetails;
      model.latitude = this.formGroup.controls[this.latitudeControlName].value;
      model.longitude = this.formGroup.controls[this.longitudeControlName].value;
      this._service.postData(model).pipe().subscribe(x => {
        this._snackbar.open("Saved Successfully", "OK", {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'left'
        });
        this._router.navigate(['/']);
      });
    }
  }

}
