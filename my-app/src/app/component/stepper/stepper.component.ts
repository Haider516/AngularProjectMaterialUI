import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [MatStepperModule],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent  {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder) {}
}