export interface Restaurant {
  id: string
  name: string
  description: string
  image: string
  rating: number
  deliveryTime: string
  cuisine: string[]
}

export interface MenuItem {
  id: string
  restaurantId: string
  name: string
  description: string
  price: number
  image: string
  category: string
  available: boolean
}

export interface CartItem extends MenuItem {
  quantity: number
}

export interface Order {
  id: string
  customerName: string
  customerPhone: string
  customerAddress: string
  items: CartItem[]
  total: number
  paymentMethod: "cash" | "card"
  status: "pending" | "accepted" | "delivered"
  createdAt: Date
}

// Sample restaurant data for Warri, Delta State
export const restaurants: Restaurant[] = [
  {
    id: "r1",
    name: "Mama Put Kitchen",
    description: "Authentic Nigerian dishes made with love",
    image: "/nigerian-restaurant-kitchen.jpg",
    rating: 4.8,
    deliveryTime: "25-35 min",
    cuisine: ["Nigerian", "Local"],
  },
  {
    id: "r2",
    name: "Warri Grill House",
    description: "Best grilled fish and chicken in town",
    image: "/african-grilled-food-restaurant.jpg",
    rating: 4.6,
    deliveryTime: "30-40 min",
    cuisine: ["Grills", "BBQ"],
  },
  {
    id: "r3",
    name: "Buka Express",
    description: "Fast and delicious local meals",
    image: "/nigerian-buka-food-stall.jpg",
    rating: 4.5,
    deliveryTime: "20-30 min",
    cuisine: ["Nigerian", "Fast Food"],
  },
]

// Sample menu items
export const menuItems: MenuItem[] = [
  // Mama Put Kitchen
  {
    id: "m1",
    restaurantId: "r1",
    name: "Jollof Rice & Chicken",
    description: "Spicy jollof rice with grilled chicken",
    price: 2500,
    image: "/nigerian-jollof-rice-with-chicken.jpg",
    category: "Main Course",
    available: true,
  },
  {
    id: "m2",
    restaurantId: "r1",
    name: "Egusi Soup & Pounded Yam",
    description: "Rich egusi soup with smooth pounded yam",
    price: 3000,
    image: "/nigerian-egusi-soup-and-pounded-yam.jpg",
    category: "Main Course",
    available: true,
  },
  {
    id: "m3",
    restaurantId: "r1",
    name: "Fried Rice & Plantain",
    description: "Colorful fried rice with sweet plantain",
    price: 2200,
    image: "/nigerian-fried-rice-with-plantain.jpg",
    category: "Main Course",
    available: true,
  },
  {
    id: "m4",
    restaurantId: "r1",
    name: "Pepper Soup",
    description: "Spicy goat meat pepper soup",
    price: 1800,
    image: "/nigerian-pepper-soup.jpg",
    category: "Soup",
    available: true,
  },
  // Warri Grill House
  {
    id: "m5",
    restaurantId: "r2",
    name: "Grilled Catfish",
    description: "Fresh catfish grilled to perfection",
    price: 3500,
    image: "/grilled-african-catfish.jpg",
    category: "Grills",
    available: true,
  },
  {
    id: "m6",
    restaurantId: "r2",
    name: "BBQ Chicken",
    description: "Smoky BBQ chicken with special sauce",
    price: 2800,
    image: "/bbq-grilled-chicken.jpg",
    category: "Grills",
    available: true,
  },
  {
    id: "m7",
    restaurantId: "r2",
    name: "Suya Platter",
    description: "Spicy suya beef with onions and tomatoes",
    price: 2000,
    image: "/nigerian-suya-meat-skewers.jpg",
    category: "Grills",
    available: true,
  },
  // Buka Express
  {
    id: "m8",
    restaurantId: "r3",
    name: "Beans & Plantain",
    description: "Honey beans with ripe plantain",
    price: 1500,
    image: "/nigerian-beans-and-plantain.jpg",
    category: "Main Course",
    available: true,
  },
  {
    id: "m9",
    restaurantId: "r3",
    name: "Yam & Egg Sauce",
    description: "Boiled yam with pepper egg sauce",
    price: 1200,
    image: "/nigerian-yam-and-egg-sauce.jpg",
    category: "Main Course",
    available: true,
  },
  {
    id: "m10",
    restaurantId: "r3",
    name: "Ofada Rice & Stew",
    description: "Local rice with spicy ofada stew",
    price: 2500,
    image: "/nigerian-ofada-rice-and-stew.jpg",
    category: "Main Course",
    available: true,
  },
]

// In-memory order storage (in a real app, this would be a database)
export const orders: Order[] = []

export function addOrder(order: Order) {
  orders.push(order)
}

export function updateOrderStatus(orderId: string, status: Order["status"]) {
  const order = orders.find((o) => o.id === orderId)
  if (order) {
    order.status = status
  }
}

export function getOrders() {
  return orders
}
