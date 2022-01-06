import { Guid } from "guid-typescript";


export class Export{

    public Name:string;
    public modelId:string;
    public manuFacturerId:string;
    public colorId:string;
    public price: number;
    public description:string;
    public inUse:boolean;
    public purchaseDate:Date;
    public id:Guid;

    constructor(id:Guid,name:string, modelId:string, purchaseDate:Date, manuFacturerId:string, colorId:string, price:number,description:string,inUse:boolean){
        this.Name=name;
    
        this.id=id;
        this.modelId=modelId;
        this.manuFacturerId=manuFacturerId;
        this.price=price;
        this.purchaseDate=purchaseDate;
        this.colorId=colorId;
        this.description=description;
        this.inUse=inUse;
     
    }

}