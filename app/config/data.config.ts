export const colors = {
    primary: [
      { name: 'Red', hex: '#FF5733' },
      { name: 'Blue', hex: '#3498DB' },
      { name: 'Green', hex: '#1ABC9C' },
      { name: 'Purple', hex: '#9B59B6' },
      { name: 'Orange', hex: '#E74C3C' },
    ],
    secondary: [
      { name: 'Dark Red', hex: '#C70039' },
      { name: 'Dark Blue', hex: '#2980B9' },
      { name: 'Teal', hex: '#16A085' },
      { name: 'Dark Purple', hex: '#8E44AD' },
      { name: 'Maroon', hex: '#C0392B' },
    ],
  };
  
 export const categories = {
    Electronics: {
      subCategories: ['Mobile Phones', 'Laptops', 'Tablets', 'Cameras', 'Accessories', 'Others'],
      brands: ['Apple', 'Samsung', 'Sony', 'Dell', 'HP', 'Others']
    },
    'Personal Items': {
      subCategories: ['Wallets', 'Keys', 'Watches', 'Jewelry', 'Eyewear', 'Others'],
      brands: ['Fossil', 'Ray-Ban', 'Tissot', 'Gucci', 'Prada', 'Others']
    },
    Bags: {
      subCategories: ['Backpacks', 'Handbags', 'Suitcases', 'Wallets', 'Purses', 'Others'],
      brands: ['Samsonite', 'American Tourister', 'VIP', 'Wildcraft', 'Tommy Hilfiger', 'Others']
    },
    Documents: {
      subCategories: ['Passports', 'ID Cards', 'Driving Licenses', 'Credit/Debit Cards', 'Other Official Papers', 'Others'],
      brands: [] // No specific brands for documents
    },
    Clothing: {
      subCategories: ['Jackets', 'Hats', 'Scarves', 'Gloves', 'Shoes', 'Others'],
      brands: ['Nike', 'Adidas', 'Puma', 'Levi\'s', 'Zara', 'Others']
    },
    Accessories: {
      subCategories: ['Umbrellas', 'Belts', 'Sunglasses', 'Hats', 'Others'],
      brands: ['Ray-Ban', 'Oakley', 'Gucci', 'Louis Vuitton', 'Hermes', 'Others']
    },
    Miscellaneous: {
      subCategories: ['Toys', 'Books', 'Stationery', 'Musical Instruments'],
      brands: ['Lego', 'Fisher-Price', 'Crayola', 'Yamaha', 'Casio', 'Others']
    },
    Others: {
      subCategories: ['Others'],
      brands: ['Others'] 
    }
  };