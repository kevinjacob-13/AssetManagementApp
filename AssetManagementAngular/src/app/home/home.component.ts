import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { PaginationService } from '../services/pagination.service';
import { ApiService } from '../services/api.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { Export } from '../models/export.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  assetsList = [];
  totalAssetList = [];
  pageNo: any = 1;  
  pageNumber: boolean[] = []; 
  manufacturerList = [];
  modelList = [];
  selectedManufacturer : string = '{00000000-0000-0000-0000-000000000000}';
  selectedModel : string = '{00000000-0000-0000-0000-000000000000}';

  ActivateAddEditComp: boolean=false;
  asset:any;
  editAssetId :any;
  action = "ADD";

  pageField = [];  
  exactPageList: any;  
  paginationData: number;  
  assetsPerPage: any = 5;  
  totalassets: any;  
  totalAssetsCount: any;  

  constructor(private service: HomeService, public paginationService: PaginationService,
    private apiService: ApiService) { }

  ngOnInit(): void {
    this.pageNumber[0] = true;  
    this.paginationService.temppage = 0; 
    this.getAllAssets();
    this.getAllManufacturers();
    this.getAllModels();
    console.log(this.pageNo);
    console.log(this.assetsPerPage);
  }

  filterChange(){
    this.getAllAssets();
  }

  exportToSheet() {
    this.getCompleteAssets();
    console.log(this.totalAssetList)
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Asset-List');
   
    worksheet.columns = [
      { header: 'Name', key: 'Name', width: 20 },
      { header: 'Model Name', key: 'ModelId', width: 20 },
      { header: 'Manufacturer Name', key: 'ManufacturerId', width: 20 },
      { header: 'Color Name', key: 'ColorId', width: 20 },
      { header: 'Description', key: 'Description', width: 20 },
      { header: 'Purchase Date', key: 'PurchaseDate', width: 15 },
      { header: 'InUse', key: 'InUse', width: 10 },
      { header: 'Price', key: 'Price', width: 10 },
      { header: 'Isdeleted', key: 'IsDeleted', width: 10 },
      //{ header: 'Created Date', key: 'CreatedOn', width: 20 },
      //{ header: 'Last Updated Date', key: 'LastUpdatedOn', width: 20 },
    ];
    this.totalAssetList.forEach(e => {
     console.log(e)
     if(e.inUse == true){
       var inUse="YES"
     }
     else{
       var inUse="NO"
     }
     if(e.isDeleted==true){
       var isdelete="YES"
     }
     else{
       var isDelete="NO"
     }
      worksheet.addRow(
    { 
      Name:e.name, 
      ModelId:e.modelName,
      ManufacturerId:e.manufacturerName, 
      ColorId:e.colorName, 
      Description:e.description,
      InUse:inUse, 
      Price:e.price, 
      PurchaseDate:e.purchaseDate,
      IsDeleted:isDelete, 
      // CreatedOn:e.createdOn, 
      // LastUpdatedOn:e.lastupdatedOn
    }
      ,"n");
    });
   
    workbook.xlsx.writeBuffer().then((totalAssetList) => {
      let blob = new Blob([totalAssetList], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'AssetGrid.xlsx');
    })
   
  }



  openPopup() {
    this.action = "ADD";
    // this.asset={
    //   Id:"",
    //   Name:"",
    //   ManuFacturerId:"",
    //   ModelId:"",
    //   ColorId:"",
    //   Price:"",
    //   InUse:false,
    //   PurchaseDate:Date,
    //   Description:"" 
    // }
    this.ActivateAddEditComp=true;
  }
  editPopup(assetId: any){
    this.action = "EDIT"
    this.editAssetId=assetId;
    this.ActivateAddEditComp=true;
  }

  closePopup() {
    this.ActivateAddEditComp=false;
  }

  getAllManufacturers() {
    this.apiService.getAllManufacturers().subscribe((data: any) => {
      //this.manufacturerList = []
      this.manufacturerList = data
    });
  }

  getAllModels() {
    this.apiService.getAllModels().subscribe((data: any) => {
      //this.modelList = []
      this.modelList = data
    });
  }

  getCompleteAssets() {
    this.apiService.getCompleteAssets().subscribe((data: any) => {
      //this.modelList = []
      this.totalAssetList = data
    });
  }

  getAllAssets() {
    this.service.getAllAssetsByFilter
    (this.pageNo, this.assetsPerPage, this.selectedManufacturer , this.selectedModel).subscribe((data: any) => {  
      this.assetsList = data;  
      this.getAllAssetsCount();  
    })  
    console.log(this.assetsList);
  }

  rowsPerPageChangeHandler (event: any) {
    this.assetsPerPage = event.target.value;
    this.pageNo = 1;
    this.ngOnInit();
    console.log(this.assetsPerPage);
  }

  totalNoOfPages() {  
  
    this.paginationData = Number(this.totalAssetsCount / this.assetsPerPage);  
    let tempPageData = this.paginationData.toFixed();  
    if (Number(tempPageData) < this.paginationData) {  
      this.exactPageList = Number(tempPageData) + 1;  
      this.paginationService.exactPageList = this.exactPageList;  
    } else {  
      this.exactPageList = Number(tempPageData);  
      this.paginationService.exactPageList = this.exactPageList  
    }  
    this.paginationService.pageOnLoad();  
    this.pageField = this.paginationService.pageField;  
  
  }

  showAssetsByPageNumber(page, i) {  
    this.assetsList = [];  
    this.pageNumber = [];  
    this.pageNumber[i] = true;  
    this.pageNo = page;  
    this.getAllAssets();  
    console.log(this.pageNo);
    console.log(this.assetsPerPage);
  }  

  leftArrowClick(page, i) {  
    this.assetsList = [];  
    this.pageNumber = [];  
    this.pageNumber[i] = true;  
    this.pageNo = page - 1;  
    this.getAllAssets();  
    console.log(this.pageNo);
  } 

  rightArrowClick(page, i) {  
    this.assetsList = [];  
    this.pageNumber = [];  
    this.pageNumber[i] = true;  
    this.pageNo = page + 1;  
    this.getAllAssets();  
    console.log(this.pageNo);
  } 
  
  getAllAssetsCount() {  
    this.service.getAllAssetsCount(this.pageNo, this.assetsPerPage, this.selectedManufacturer , this.selectedModel).subscribe((res: any) => {  
      this.totalAssetsCount = res;  
      this.totalNoOfPages();  
    })  
  }

}
