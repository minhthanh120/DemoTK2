export class ProductDocument {
    id: string;
    name: string;
    price: number;
    description:string;
    stock:number;
    createdAt:Date;
    updatedAt:Date;
    categories:any []
  }