export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  image?: string;
}

export const products: Product[] = [
  // Budget Meals
  {
    id: 'hotsilog',
    name: 'Hotsilog',
    price: 60,
    category: 'Budget Meal',
    description: 'Hotdog with Sinangag (Fried Rice) and Itlog (Egg)',
    image: '/images/products/hotsilog.jpg'
  },
  {
    id: 'hamsilog',
    name: 'Hamsilog',
    price: 55,
    category: 'Budget Meal',
    description: 'Ham with Sinangag (Fried Rice) and Itlog (Egg)',
  },
  {
    id: 'silog',
    name: 'Silog',
    price: 35,
    category: 'Budget Meal',
    description: 'Sinangag (Fried Rice) and Itlog (Egg)',
  },
  {
    id: 'skinless',
    name: 'Skinless',
    price: 40,
    category: 'Budget Meal',
    description: 'Skinless Longganisa with Rice',
  },
  {
    id: 'pork-chaofan',
    name: 'Pork Chaofan',
    price: 45,
    category: 'Budget Meal',
    description: 'Pork Fried Rice Chinese Style',
  },
  {
    id: 'beef-chaofan',
    name: 'Beef Chaofan',
    price: 50,
    category: 'Budget Meal',
    description: 'Beef Fried Rice Chinese Style',
  },
  {
    id: 'siomai-rice',
    name: 'Siomai Rice',
    price: 39,
    category: 'Budget Meal',
    description: 'Siomai with Steamed Rice',
  },
  {
    id: 'shanghai-rice',
    name: 'Shanghai Rice',
    price: 39,
    category: 'Budget Meal',
    description: 'Lumpia Shanghai with Rice',
  },

  // Silog Meals
  {
    id: 'tapsilog',
    name: 'Tapsilog',
    price: 100,
    category: 'Silog Meals',
    description: 'Beef Tapa with Sinangag and Itlog',
  },
  {
    id: 'porksilog',
    name: 'Porksilog',
    price: 95,
    category: 'Silog Meals',
    description: 'Pork with Sinangag and Itlog',
  },
  {
    id: 'chicksilog',
    name: 'Chicksilog',
    price: 95,
    category: 'Silog Meals',
    description: 'Chicken with Sinangag and Itlog',
  },
  {
    id: 'bangsilog',
    name: 'Bangsilog',
    price: 100,
    category: 'Silog Meals',
    description: 'Bangus with Sinangag and Itlog',
  },
  {
    id: 'sisigsilog',
    name: 'Sisigsilog',
    price: 95,
    category: 'Silog Meals',
    description: 'Sisig with Sinangag and Itlog',
  },
  {
    id: 'tocilog',
    name: 'Tocilog',
    price: 85,
    category: 'Silog Meals',
    description: 'Tocino with Sinangag and Itlog',
  },

  // Alacarte
  {
    id: 'lugaw',
    name: 'Lugaw',
    price: 20,
    category: 'Alacarte',
    description: 'Filipino Rice Porridge',
  },
  {
    id: 'goto',
    name: 'Goto',
    price: 35,
    category: 'Alacarte',
    description: 'Rice Porridge with Beef Tripe',
  },
  {
    id: 'beef-mami',
    name: 'Beef Mami',
    price: 45,
    category: 'Alacarte',
    description: 'Beef Noodle Soup',
  },
  {
    id: 'pares',
    name: 'Pares',
    price: 60,
    category: 'Alacarte',
    description: 'Beef Stew with Rice',
  },
  {
    id: 'fries',
    name: 'Fries',
    price: 25,
    category: 'Alacarte',
    description: 'Crispy French Fries',
  },
  {
    id: 'waffle',
    name: 'Waffle',
    price: 25,
    category: 'Alacarte',
    description: 'Fresh Baked Waffle',
  },
  {
    id: 'graham-bar',
    name: 'Graham Bar',
    price: 20,
    category: 'Alacarte',
    description: 'Graham Cracker Dessert Bar',
  },
  {
    id: 'cheesetick',
    name: 'Cheese Stick',
    price: 10,
    category: 'Alacarte',
    description: 'Crispy Cheese Stick',
  },

  // Drinks
  {
    id: 'coke-float',
    name: 'Coke Float',
    price: 29,
    category: 'Drinks',
    description: 'Coca-Cola with Ice Cream',
  },
  {
    id: 'iced-coffee',
    name: 'Iced Coffee',
    price: 29,
    category: 'Drinks',
    description: 'Cold Brewed Coffee with Ice',
  },
  {
    id: 'hot-coffee',
    name: 'Hot Coffee',
    price: 15,
    category: 'Drinks',
    description: 'Freshly Brewed Hot Coffee',
  },
  {
    id: 'fruit-soda-16',
    name: 'Fruit Soda 16oz',
    price: 20,
    category: 'Drinks',
    description: 'Fruit-flavored Soda (16oz)',
  },
  {
    id: 'fruit-soda-22',
    name: 'Fruit Soda 22oz',
    price: 39,
    category: 'Drinks',
    description: 'Fruit-flavored Soda (22oz)',
  },
];

export const categories = [
  'Budget Meal',
  'Silog Meals',
  'Alacarte',
  'Drinks'
]; 