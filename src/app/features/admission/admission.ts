import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
        age:['', [Validators.required, Validators.min(3), Validators.max(18)]],
        bloodGroup:[''],
        religion:['',Validators.required],
        casteCategory:['',Validators.required],
        nationality:['',Validators.required],
        motherTongue:['',Validators.required],
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
      declaration:this.fb.group({
        agree:[false,Validators.requiredTrue],
        declarationDate:['',Validators.required]
      })
  

    })
  }
  ngOnInit(){
    window.scrollTo(0, 0);
  }
  copyAddress(event:Event){
    const isChecked=(event.target as HTMLInputElement).checked;
    const present=this.admissionForm.get('addressDetails.presentAddress');
    const permanent=this.admissionForm.get('addressDetails.permanentAddress');
    if(isChecked && present && permanent){
      permanent?.setValue(present.value)
      permanent.disable();

    }
    else{
      permanent?.enable();
    }
  }
  generatePDF():void{
    // console.log(this.admissionForm.value);
    const content=document.getElementById('pdf');
    if(content){
      content.style.display='block';
      html2canvas(content).then((canvas)=>{
        const imgData=canvas.toDataURL('image/png');
        const pdf=new jsPDF('p','mm','a4');
        const imgProps=pdf.getImageProperties(imgData);
        const pdfWidth=pdf.internal.pageSize.getWidth();
        const pdfHeight=(imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData,'PNG',0,0,pdfWidth,pdfHeight);
        pdf.save('admission-formss.pdf');

       
      })
      content.style.display='none';
    }
    
    
  }
  onImageSelect(event:Event){
    const file=(event.target as HTMLInputElement).files?.[0];
    if(file){
      const reader=new FileReader();
      reader.onload=()=>{
        this.admissionForm.get('documents.studentPhoto')?.setValue(reader.result);
      }
      reader.readAsDataURL(file);
    }
   
  }



}
