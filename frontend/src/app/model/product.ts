export class Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  price: number;
  quantity: number;
  rop: number;
  image:string;


  constructor(id: number, name: string, brand: string, description: string, price: number, quantity: number, rop: number, image: string) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.rop = rop;
    this.image = image;
  }
}
