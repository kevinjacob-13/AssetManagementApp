import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-asset',
  templateUrl: './add-edit-asset.component.html',
  styleUrls: ['./add-edit-asset.component.css']
})

export class AddEditAssetComponent implements OnInit {
  @Input() action:any;
  @Input() assetId:any;

  manufacturerList = [];
  modelList = [];
  colorList = [];
  public userModel: any = {};
  errorMessage = '';
  asset:any = {};

  constructor(private service: ApiService) { }

  AddEditForm = new FormGroup({
    Name: new FormControl('',[Validators.required]),
    ManuFacturerId: new FormControl('',[Validators.required]),
    ModelId: new FormControl(''),
    ColorId: new FormControl(''),
    Price: new FormControl(''),
    InUse: new FormControl(false),
    PurchaseDate: new FormControl(''),
    Description: new FormControl('')
  });

  onSubmit() {
    console.log('submit button clicked');
    console.log(this.AddEditForm.getRawValue());
    console.log(this.action);
    if(this.action=="ADD")
    {   
       this.service.addAsset(this.AddEditForm.getRawValue())
      .subscribe(
        data => console.log('Success post data!', data)
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
      console.log("@@@",this.assetId)

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
