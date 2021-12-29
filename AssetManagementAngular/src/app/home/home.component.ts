import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  p: number = 1;
  assetsList: any = [];

  constructor(private service: HomeService) { }

  ngOnInit(): void {
    this.getAllAssets();
  }

  getAllAssets() {
    this.service.getAllAssets().subscribe((response) => {
      //this.assetsList = []
      this.assetsList.push(response)
    });
    console.log(this.assetsList);
  }

}
