"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getOrders } from "@/lib/data"
import { CheckCircle2, Clock, MapPin, Phone, User } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import type { Order } from "@/lib/data"

function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [order, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    if (orderId) {
      const orders = getOrders()
      const foundOrder = orders.find((o) => o.id === orderId)
      setOrder(foundOrder || null)
    }
  }, [orderId])

  if (!order) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-md text-center">
            <h1 className="mb-3 text-2xl font-bold text-foreground">Order not found</h1>
            <p className="mb-6 text-muted-foreground">We couldn't find the order you're looking for</p>
            <Link href="/menu">
              <Button size="lg">Browse Menu</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
      case "accepted":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400"
      case "delivered":
        return "bg-green-500/10 text-green-700 dark:text-green-400"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "Order Pending"
      case "accepted":
        return "Order Accepted"
      case "delivered":
        return "Order Delivered"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          {/* Success Message */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
                <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="mb-2 text-3xl font-bold text-foreground">Order Confirmed!</h1>
            <p className="text-lg text-muted-foreground">Thank you for your order. We'll deliver it soon.</p>
          </div>

          {/* Order Details */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Order ID</p>
                  <p className="font-mono text-lg font-semibold text-foreground">{order.id}</p>
                </div>
                <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
              </div>

              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex items-start gap-3">
                  <User className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Customer Name</p>
                    <p className="font-medium text-foreground">{order.customerName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone Number</p>
                    <p className="font-medium text-foreground">{order.customerPhone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Delivery Address</p>
                    <p className="font-medium text-foreground">{order.customerAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                    <p className="font-medium text-foreground">30-45 minutes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Order Items</h2>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-foreground">₦{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 border-t border-border pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">₦{(order.total - 500).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="font-medium text-foreground">₦500</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2">
                  <span className="text-lg font-bold text-foreground">Total</span>
                  <span className="text-lg font-bold text-primary">₦{order.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-muted/50 p-4">
                <p className="text-sm font-medium text-foreground">Payment Method</p>
                <p className="text-sm text-muted-foreground">
                  {order.paymentMethod === "cash" ? "Cash on Delivery" : "Card Payment (Paid)"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Order Status Timeline */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Order Status</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-1 h-3 w-3 rounded-full ${order.status === "pending" || order.status === "accepted" || order.status === "delivered" ? "bg-primary" : "bg-muted"}`}
                  />
                  <div>
                    <p className="font-medium text-foreground">Order Placed</p>
                    <p className="text-sm text-muted-foreground">Your order has been received</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className={`mt-1 h-3 w-3 rounded-full ${order.status === "accepted" || order.status === "delivered" ? "bg-primary" : "bg-muted"}`}
                  />
                  <div>
                    <p className="font-medium text-foreground">Order Accepted</p>
                    <p className="text-sm text-muted-foreground">Restaurant is preparing your food</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div
                    className={`mt-1 h-3 w-3 rounded-full ${order.status === "delivered" ? "bg-primary" : "bg-muted"}`}
                  />
                  <div>
                    <p className="font-medium text-foreground">Order Delivered</p>
                    <p className="text-sm text-muted-foreground">Enjoy your meal!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/menu" className="flex-1">
              <Button variant="outline" size="lg" className="w-full bg-transparent">
                Order Again
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button size="lg" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <footer className="mt-16 border-t border-border bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">&copy; 2025 Warri Eats. Serving Warri, Delta State with love.</p>
        </div>
      </footer>
    </div>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  )
}
