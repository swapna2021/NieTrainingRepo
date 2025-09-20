export default class Product{

    id!:number;
    name!:string;
    description!:string;
    category!:string;
    tags!:string[];
    price!:number;
    stock!:number;

    constructor(){
        this.id=0;
        this.name="";
        this.description="";
        this.category="";
        this.tags=[];
        this.price=0;
        this.stock=0;
    }
}