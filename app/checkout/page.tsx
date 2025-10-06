"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { getCart, getCartTotal, clearCart } from "@/lib/cart-store"
import { addOrder } from "@/lib/data"
import { CreditCard, Wallet } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { CartItem } from "@/lib/data"

export default function CheckoutPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "cash" as "cash" | "card",
  })

  useEffect(() => {
    const items = getCart()
    if (items.length === 0) {
      router.push("/menu")
      return
    }
    setCartItems(items)
    setTotal(getCartTotal())
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create order
    const orderId = `ORD-${Date.now()}`
    const order = {
      id: orderId,
      customerName: formData.name,
      customerPhone: formData.phone,
      customerAddress: formData.address,
      items: cartItems,
      total: total + 500, // Including delivery fee
      paymentMethod: formData.paymentMethod,
      status: "pending" as const,
      createdAt: new Date(),
    }

    addOrder(order)
    clearCart()
    window.dispatchEvent(new Event("cartUpdated"))

    // Redirect to confirmation page
    router.push(`/order-confirmation?orderId=${orderId}`)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (cartItems.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-foreground">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Checkout Form */}
            <div className="space-y-6 lg:col-span-2">
              {/* Delivery Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="080XXXXXXXX"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Delivery Address</Label>
                    <Input
                      id="address"
                      name="address"
                      placeholder="Enter your full address in Warri"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, paymentMethod: value as "cash" | "card" }))
                    }
                  >
                    <div className="flex items-center space-x-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex flex-1 cursor-pointer items-center gap-3">
                        <Wallet className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-semibold text-foreground">Cash on Delivery</div>
                          <div className="text-sm text-muted-foreground">Pay when your order arrives</div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex flex-1 cursor-pointer items-center gap-3">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <div>
                          <div className="font-semibold text-foreground">Card Payment</div>
                          <div className="text-sm text-muted-foreground">Pay now with your card (Demo)</div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.name} x{item.quantity}
                        </span>
                        <span className="font-medium text-foreground">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 border-t border-border pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium text-foreground">₦{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span className="font-medium text-foreground">₦500</span>
                    </div>
                  </div>

                  <div className="flex justify-between border-t border-border pt-4">
                    <span className="text-lg font-bold text-foreground">Total</span>
                    <span className="text-lg font-bold text-primary">₦{(total + 500).toLocaleString()}</span>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Place Order"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>

      <footer className="mt-16 border-t border-border bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">&copy; 2025 Warri Eats. Serving Warri, Delta State with love.</p>
        </div>
      </footer>
    </div>
  )
}
