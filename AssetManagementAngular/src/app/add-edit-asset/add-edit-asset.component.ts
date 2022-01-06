import { Component, OnInit, Input,Output,EventEmitter, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-add-edit-asset',
  templateUrl: './add-edit-asset.component.html',
  styleUrls: ['./add-edit-asset.component.css']
})

export class AddEditAssetComponent implements OnInit {
  @ViewChild('closebutton') closebutton;

  @Input() action:any;
  @Input() assetId:any;

  @Output() someEvent = new EventEmitter<string>();

  manufacturerList = [];
  modelList = [];
  colorList = [];
  public userModel: any = {};
  errorMessage = '';
  asset:any = {};

  currentDate = new Date();
  msgNameInvalid = ""
  msgManufacturerInvalid = ""
  msgModelInvalid = ""
  msgPriceInvalid = ""
  msgDateInvalid = ""
  msgpurchaseDateInvalid = ""
  isValidated: boolean=false;

  constructor(private service: ApiService,  private router: Router) { }

  AddEditForm = new FormGroup({
    Id: new FormControl('{00000000-0000-0000-0000-000000000000}'),
    Name: new FormControl('',[Validators.required]),
    ManuFacturerId: new FormControl('',[Validators.required]),
    ModelId: new FormControl(''),
    ColorId: new FormControl(''),
    Price: new FormControl(''),
    InUse: new FormControl(false),
    PurchaseDate: new FormControl(''),
    Description: new FormControl('')
  });

  clearValidationMessages () {
    this.msgNameInvalid = ""
    this.msgManufacturerInvalid = ""
    this.msgModelInvalid = ""
    this.msgPriceInvalid = ""
    this.msgDateInvalid = ""
    this.msgpurchaseDateInvalid = ""
  }
  
  validateForm () {
  this.clearValidationMessages()
  this.isValidated = false;

  var name = this.AddEditForm.controls["Name"] 
  var nameErrors = name.errors
  var manufacturer =this.AddEditForm.controls["ManuFacturerId"]
  var manufacturerErrors = manufacturer.errors
  var model = this.AddEditForm.controls["ModelId"] 
  var modelErrors = model.errors
  var price = this.AddEditForm.controls["Price"]
  var purchaseDate = this.AddEditForm.controls["PurchaseDate"]
  console.log(purchaseDate.value)

  if (price.value < 0)
    this.AddEditForm.controls["Price"].setErrors({'negativePrice':true})
  
  if(purchaseDate.value > (formatDate(new Date(), 'yyyy-MM-dd', 'en')))
    this.AddEditForm.controls["PurchaseDate"].setErrors({'futureDate':true})


  var priceErrors = price.errors
  var purchaseDateErrors = purchaseDate.errors

  if(nameErrors || manufacturerErrors || modelErrors || priceErrors || purchaseDateErrors)
  {
    if( nameErrors && nameErrors["required"]) {
      this.msgNameInvalid = "Name is required"
    }
    if(manufacturerErrors && manufacturerErrors["required"]) {
      this.msgManufacturerInvalid = "Please select a Manufacturer"
    }
    if(modelErrors && modelErrors["required"]) {
      this.msgModelInvalid = "Please select a Model"
    }
    if(purchaseDateErrors && purchaseDateErrors["futureDate"]) {
      this.msgpurchaseDateInvalid = "Please select a valid date"
    }
    if(priceErrors && priceErrors["required"]) {
      this.msgPriceInvalid = "Price is required"
    }
    else if(priceErrors && priceErrors["negativePrice"])
    {
      this.msgPriceInvalid = "Price cannot be negative"
    }
    else
    {
    }
    return false;
  }
  else
  {
    this.isValidated = true;
    this.closebutton.nativeElement.click();
    return true
  }


  // if( nameErrors) {
  //   if( nameErrors["required"]) {
  //     this.msgInvalid = "Name is required"
  //   }
  //   return false
  // }
  
  // if( manufacturerErrors) {
  //   if( manufacturerErrors["required"]) {
  //     this.msgmanInvalid = "Please select a Manufacturer"
  //   }
  //   return false
  // }

  // return true  
  }

  onSubmit() {
    console.log('submit button clicked');
    console.log(this.AddEditForm.getRawValue());
    console.log(this.action);
    if(!this.validateForm()) {
      return
    }

    if(this.action=="ADD")
    {   
       this.service.addAsset(this.AddEditForm.getRawValue())
      .subscribe(
        {
        next:(data)=> 
        {
          this.someEvent.emit();
          error => console.error('Error!', error);  
        }   
        
        }
      );
      this.AddEditForm.reset();
    }
    if(this.action=="EDIT")
    {
      this.AddEditForm.controls["Id"].setValue(this.assetId)

      this.service.editAsset(this.AddEditForm.getRawValue())
      .subscribe({
        next:(data)=> {
          this.someEvent.emit();
   
     }
       } 
        //error => console.error('Error!', error) // defualt we log error to console
  
        // store error in data member / property to bind to the view
        // error => this.errorMessage = error.statusText
      );
    }
    
  }

  ngOnInit(): void {
    this.getAllManufacturers();
    this.getAllModels();
    this.getAllColors();
    // console.log(this.action);
    // console.log(this.assetId);
    // if(this.action === 'EDIT' && this.assetId != "")
    //   this.getAssetByAssetId();
  }

  ngOnChanges() : void {
    // console.log(this.action);
    // console.log(this.assetId);
    // if(this.action === 'EDIT' && this.assetId != "")
    // {  this.getAssetByAssetId();
    //    this.populateForm();
    // }
    if(this.action=="EDIT")
      {
        this.getValues();
        
      }
      // console.log("@@@",this.assetId)

    }

getValues(){
console.log(this.assetId);
this.service.getAssetByAssetId(this.assetId).subscribe({
  next:(data:any)=> {
    this.asset = data
    console.log(this.asset)
    this.setFormValues(this.asset)
  }
})
}

setFormValues(asset:any) {
  var d
  this.AddEditForm.controls["Name"].setValue(asset.name)
  this.AddEditForm.controls["ManuFacturerId"].setValue(asset.manuFacturerId)
  this.AddEditForm.controls["ModelId"].setValue(asset.modelId)
  this.AddEditForm.controls["ColorId"].setValue(asset.colorId)
  this.AddEditForm.controls["Price"].setValue(asset.price)
  this.AddEditForm.controls["Description"].setValue(asset.description)
  this.AddEditForm.controls["InUse"].setValue(asset.inUse)
  if(asset.purchaseDate != null)
    d = asset.purchaseDate.toString().substring(0,10)
  console.log(d)
  this.AddEditForm.controls["PurchaseDate"].setValue(d)
}

getAssetInput() {
  let asset = {}
    asset = {
      Name:this.AddEditForm.controls["Name"].value,
      ManuFactId:this.AddEditForm.controls["ManuFactId"].value,
      ModelId:this.AddEditForm.controls["ModelId"].value,
      ColorId:this.AddEditForm.controls["ColorId"].value,
      Description:this.AddEditForm.controls["Description"].value,
      PurchaseDate:this.AddEditForm.controls["PurchaseDate"].value,
      Price:this.AddEditForm.controls["Price"].value,
      InUse:this.AddEditForm.controls["InUse"].value
    }
    return asset
}


  getAssetByAssetId(){
    this.service.getAssetByAssetId(this.assetId).subscribe((data: any) => {
      //this.manufacturerList = []
      this.asset = data
      console.log(data)
    });
  }

  getAllManufacturers() {
    this.service.getAllManufacturers().subscribe((data: any) => {
      //this.manufacturerList = []
      this.manufacturerList = data
    });
  }

  getAllModels() {
    this.service.getAllModels().subscribe((data: any) => {
      //this.modelList = []
      this.modelList = data
    });
  }

  getAllColors() {
    this.service.getAllColors().subscribe((data: any) => {
      //this.modelList = []
      this.colorList = data
    });
  }

}
