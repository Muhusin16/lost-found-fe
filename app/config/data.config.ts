export const colors = {
  primary: [
    { name: 'Red', hex: '#FF0000' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Green', hex: '#008000' },
    { name: 'Yellow', hex: '#FFFF00' },
    { name: 'Orange', hex: '#FFA500' },
    { name: 'Purple', hex: '#800080' },
    { name: 'Pink', hex: '#FFC0CB' },
    { name: 'Cyan', hex: '#00FFFF' },
    { name: 'Magenta', hex: '#FF00FF' },
    { name: 'Lime', hex: '#00FF00' },
  ],
  secondary: [
    { name: 'Dark Red', hex: '#8B0000' },
    { name: 'Dark Blue', hex: '#00008B' },
    { name: 'Dark Green', hex: '#006400' },
    { name: 'Gold', hex: '#FFD700' },
    { name: 'Dark Orange', hex: '#FF8C00' },
    { name: 'Violet', hex: '#EE82EE' },
    { name: 'Brown', hex: '#A52A2A' },
    { name: 'Navy', hex: '#000080' },
    { name: 'Olive', hex: '#808000' },
    { name: 'Teal', hex: '#008080' },
    { name: 'Maroon', hex: '#800000' },
    { name: 'Gray', hex: '#808080' },
    { name: 'Light Gray', hex: '#D3D3D3' },
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

  export const initialProducts = [
    {
      title: "Bag",
      image: "/shopping-bags.svg",
      primaryColor: ["Pink", "Red"],
      category: "Bags, Baggage",
      subCategory: "Shopping bag",
      brand: "-",
      actionIcons: ["edit", "delete"],
    },
    {
      title: "Iphone 14",
      image: "/mobile-phone.svg",
      primaryColor: ["Black", "Grey"],
      category: "Electronics",
      subCategory: "Phone",
      brand: "Iphone",
      actionIcons: ["edit", "delete"],
    },
    {
      title: "Noise Watch 3",
      image: "/smart-watch.svg",
      primaryColor: ["Pink"],
      category: "Electronics",
      subCategory: "SmartWatch",
      brand: "Noise",
      actionIcons: ["edit", "delete"],
    },
    {
      title: "Red Bag",
      image: "/red-purse.svg",
      primaryColor: ["Red"],
      category: "Bags, Baggage",
      subCategory: "Purse",
      brand: "-",
      actionIcons: ["edit", "delete"],
    },
    {
      title: "Laptop",
      image: "/laptop.svg",
      primaryColor: ["Grey"],
      category: "Electronics",
      subCategory: "Laptop",
      brand: "Dell",
      actionIcons: ["edit", "delete"],
    },
    {
      title: "Grocery Bag",
      image: "/paper-bag.svg",
      primaryColor: ["Purple", "Blue"],
      category: "Bags, Baggage",
      subCategory: "Shopping bag",
      brand: "Puma",
      actionIcons: ["edit", "delete"],
      
    },
  
    {
      title: "Peace",
      image: "/peace.jpg",
      primaryColor: ["Purple", "Blue"],
      category: "Intangible",
      subCategory: "Shopping bag",
      brand: "Self Owned",
      actionIcons: ["edit", "delete"],
    }
  ];