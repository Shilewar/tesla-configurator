export interface CarModel {
    code: string;
    description: string;
    colors: CarColor[];
    price:number;
  }
  
  export interface CarColor {
    code: string;
    description: string;
    price: number;
  }