// Basato sull'entità Product del tuo BE
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number; // Mappatura da Double
  stock: number; // Mappatura da Integer
  imageUrl: string;
}
