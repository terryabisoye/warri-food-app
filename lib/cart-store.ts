import type { CartItem } from "./data"

const CART_KEY = "warri-food-cart"

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return []
  const cart = localStorage.getItem(CART_KEY)
  return cart ? JSON.parse(cart) : []
}

export function saveCart(cart: CartItem[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

export function addToCart(item: CartItem) {
  const cart = getCart()
  const existingItem = cart.find((i) => i.id === item.id)

  if (existingItem) {
    existingItem.quantity += item.quantity
  } else {
    cart.push(item)
  }

  saveCart(cart)
}

export function removeFromCart(itemId: string) {
  const cart = getCart().filter((item) => item.id !== itemId)
  saveCart(cart)
}

export function updateCartItemQuantity(itemId: string, quantity: number) {
  const cart = getCart()
  const item = cart.find((i) => i.id === itemId)

  if (item) {
    if (quantity <= 0) {
      removeFromCart(itemId)
    } else {
      item.quantity = quantity
      saveCart(cart)
    }
  }
}

export function clearCart() {
  if (typeof window === "undefined") return
  localStorage.removeItem(CART_KEY)
}

export function getCartTotal(): number {
  const cart = getCart()
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
}

export function getCartItemCount(): number {
  const cart = getCart()
  return cart.reduce((count, item) => count + item.quantity, 0)
}
