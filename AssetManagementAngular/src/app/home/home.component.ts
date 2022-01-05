import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { PaginationService } from '../services/pagination.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  assetsList = [];
  pageNo: any = 1;  
  pageNumber: boolean[] = []; 
  manufacturerList = [];
  modelList = [];

  ActivateAddEditComp: boolean=false;
  asset:any;
  editAssetId :any;
  action = "ADD";

  pageField = [];  
  exactPageList: any;  
  paginationData: number;  
  assetsPerPage: any = 3;  
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

  openPopup() {
    this.action = "ADD";
    this.asset={
      Id:"",
      Name:"",
      ManuFacturerId:"",
      ModelId:"",
      ColorId:"",
      Price:"",
      InUse:false,
      PurchaseDate:Date,
      Description:"" 
    }
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

  getAllAssets() {
    this.service.getAllAssetsByFilter
    (this.pageNo, this.assetsPerPage, '', '').subscribe((data: any) => {  
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
    this.service.getAllAssetsCount().subscribe((res: any) => {  
      this.totalAssetsCount = res;  
      this.totalNoOfPages();  
    })  
  }

}
