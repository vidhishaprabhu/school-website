import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-admission',
  imports: [ReactiveFormsModule],
  templateUrl: './admission.html',
  styleUrl: './admission.scss'
})
export class Admission {
  admissionForm!: FormGroup;
  constructor(private fb:FormBuilder){
    this.admissionForm=this.fb.group({
      studentDetails:this.fb.group({
        fullName:['',Validators.required],
        dob:['',Validators.required],
        gender:['',Validators.required],
        age:['',Validators.required,Validators.min(3),Validators.max(18)],
        bloodGroup:[''],
        religion:['',Validators.required],
        casteCategory:['',Validators.required],
        nationality:['',Validators.required],
        montherTongue:['',Validators.required],
        aadharNumber:['',Validators.required]
      }),
      admissionDetails:this.fb.group({
        admissionForClass:['',Validators.required],
        academicYear:['',Validators.required],
        previousSchoolName:[''],
        reasonForLeavingPreviousSchool:['']
      }),
      father:this.fb.group({
        fullName:['',Validators.required],
        qualification:['',Validators.required],
        occupation:['',Validators.required],
        officeAddress:[''],
        contactNumber:['',Validators.required],
        email:[''],
        aadharNumber:['',Validators.required]
      }),
      mother:this.fb.group({
        fullName:['',Validators.required],
        qualification:['',Validators.required],
        occupation:['',Validators.required],
        officeAddress:[''],
        contactNumber:['',Validators.required],
        email:[''],
        aadharNumber:['',Validators.required]     
      }),
      guardianInfo:this.fb.group({
        fullName:[''],
        relationship:[''],
        contactNumber:[''],
        address:['']
      }),
      addressDetails:this.fb.group({
        presentAddress:['',Validators.required],
        permanentAddress:['',Validators.required],
        emergencyContactNumber:['',Validators.required],
        alternativeContactNumber:['',Validators.required]

      }),
      documents:this.fb.group({
        studentPhoto:[null,Validators.required]

      }),
      declaration:fb.group({
        agree:[false,Validators.requiredTrue],
        declarationDate:['',Validators.required]
      })
  

    })
  }



}
