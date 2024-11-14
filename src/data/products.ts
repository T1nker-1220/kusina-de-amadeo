import { Product, CategoryType } from '@/types';

export const products: Product[] = [
  // Budget Meals
  {
    id: 'hotsilog',
    name: 'Hotsilog',
    price: 60,
    category: 'budget-meals',
    description: 'Hotdog with Sinangag (Fried Rice) and Itlog (Egg)',
      image: '/images/products/hotsilog.jpg'
  },
  {
    id: 'hamsilog',
    name: 'Hamsilog',
    price: 55,
    category: 'budget-meals',
    description: 'Ham with Sinangag (Fried Rice) and Itlog (Egg)',
    image: '/images/products/hamsilog.jpg'
  },
  {
    id: 'silog',
    name: 'Silog',
    price: 35,
    category: 'budget-meals',
    description: 'Sinangag (Fried Rice) and Itlog (Egg)',
    image: '/images/products/silog.jpg'
  },
  {
    id: 'skinless',
    name: 'Skinless Rice',
    price: 40,
    category: 'budget-meals',
    description: 'Skinless Longganisa with Rice',
    image: '/images/products/skinless.jpg'
  },
  {
    id: 'pork-chaofan',
    name: 'Pork Chaofan',
    price: 45,
    category: 'budget-meals',
    description: 'Pork Fried Rice Chinese Style',
    image: '/images/products/pork-chaofan.jpg'
  },
  {
    id: 'beef-chaofan',
    name: 'Beef Chaofan',
    price: 50,
    category: 'budget-meals',
    description: 'Beef Fried Rice Chinese Style',
    image: '/images/products/beef-chaofan.jpg'
  },
  {
    id: 'siomai-rice',
    name: 'Siomai Rice',
    price: 39,
    category: 'budget-meals',
    description: 'Siomai with Steamed Rice',
    image: '/images/products/siomai-rice.jpg'
  },
  {
    id: 'shanghai-rice',
    name: 'Shanghai Rice',
    price: 39,
    category: 'budget-meals',
    description: 'Lumpia Shanghai with Rice',
    image: '/images/products/shanghai-rice.jpg'
  },

  // Silog Meals
  {
    id: 'tapsilog',
    name: 'Tapsilog',
    price: 100,
    category: 'silog-meals',
    description: 'Beef Tapa with Sinangag and Itlog',
    image: '/images/products/tapasilog.jpg'
  },
  {
    id: 'porksilog',
    name: 'Porksilog',
    price: 95,
      category: 'silog-meals',
    description: 'Pork with Sinangag and Itlog',
    image: '/images/products/porksilog.jpg'
  },
  {
    id: 'chicksilog',
    name: 'Chicksilog',
    price: 95,
    category: 'silog-meals',
    description: 'Chicken with Sinangag and Itlog',
    image: '/images/products/chicksilog.jpg'
  },
  {
    id: 'bangsilog',
    name: 'Bangsilog',
    price: 100,
    category: 'silog-meals',
    description: 'Bangus with Sinangag and Itlog',
    image: '/images/products/bangsilog.jpg'
  },
  {
    id: 'sisigsilog',
    name: 'Sisigsilog',
    price: 95,
    category: 'silog-meals',
    description: 'Sisig with Sinangag and Itlog',
    image: '/images/products/sisigsilog.jpg'
  },
  {
    id: 'tocilog',
    name: 'Tocilog',
    price: 85,
    category: 'silog-meals',
    description: 'Tocino with Sinangag and Itlog',
    image: '/images/products/tocilog.jpg'
  },

  // Alacarte
  {
    id: 'lugaw',
    name: 'Lugaw',
    price: 20,
    category: 'ala-carte',
    description: 'Filipino Rice Porridge',
    image: '/images/products/lugaw.jpg'
  },
  {
    id: 'goto',
    name: 'Goto',
    price: 35,
    category: 'ala-carte',
    description: 'Rice Porridge with Beef Tripe',
    image: '/images/products/goto.jpg'
  },
  {
    id: 'beef-mami',
    name: 'Beef Mami',
    price: 45,
    category: 'ala-carte',
    description: 'Beef Noodle Soup',
    image: '/images/products/beef-mami.jpg'
  },
  {
    id: 'pares',
    name: 'Pares',
    price: 60,
    category: 'ala-carte',
    description: 'Beef Stew with Rice',
    image: '/images/products/pares.jpg'
  },
  {
    id: 'fries',
    name: 'Fries',
    price: 25,
    category: 'ala-carte',
    description: 'Crispy French Fries',
    image: '/images/products/fries.jpg'
  },
  {
    id: 'waffle',
    name: 'Waffle',
    price: 15,
    category: 'ala-carte',
    description: 'Fresh Baked Waffle',
    image: '/images/products/waffle.jpg'
  },
  {
    id: 'graham-bar',
    name: 'Graham Bar',
    price: 20,
    category: 'ala-carte',
    description: 'Graham Cracker Dessert Bar',
    image: '/images/products/grahambar.jpg'
  },
  {
    id: 'cheesetick',
    name: 'Cheese Stick',
    price: 10,
    category: 'ala-carte',
    description: 'Crispy Cheese Stick',
    image: '/images/products/cheesetick.jpg'
  },

  // Drinks
  {
    id: 'coke-float',
    name: 'Coke Float',
    price: 29,
    category: 'beverages',
    description: 'Coca-Cola with Ice Cream',
    image: '/images/products/coke-float.jpg'
  },
  {
    id: 'iced-coffee',
    name: 'Iced Coffee',
    price: 29,
    category: 'beverages',
    description: 'Cold Brewed Coffee with Ice',
    image: '/images/products/iced-coffee.jpg'
  },
  {
    id: 'hot-coffee',
    name: 'Hot Coffee',
    price: 15,
    category: 'beverages',
    description: 'Freshly Brewed Hot Coffee',
    image: '/images/products/hot-coffee.jpg'
  },
  {
    id: 'fruit-soda-16',
    name: 'Fruit Soda 16oz',
    price: 20,
    category: 'beverages',
    description: 'Fruit-flavored Soda (16oz)',
    image: '/images/products/16oz-fruits.jpg'
  },
  {
    id: 'fruit-soda-22',
    name: 'Fruit Soda 22oz',
    price: 39,
    category: 'beverages',
    description: 'Fruit-flavored Soda (22oz)',
    image: '/images/products/22ozfruitsoda.jpg'
  },
];

export const categories = [
  'budget-meals',
  'silog-meals',
  'ala-carte',
  'beverages'
];