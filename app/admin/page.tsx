"use client"

import { AdminHeader } from "@/components/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getOrders, updateOrderStatus } from "@/lib/data"
import type { Order } from "@/lib/data"
import { CheckCircle2, Clock, Package, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    accepted: 0,
    delivered: 0,
    revenue: 0,
  })

  useEffect(() => {
    loadOrders()
    // Refresh orders every 5 seconds
    const interval = setInterval(loadOrders, 5000)
    return () => clearInterval(interval)
  }, [])

  const loadOrders = () => {
    const allOrders = getOrders()
    setOrders(allOrders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()))

    // Calculate stats
    const pending = allOrders.filter((o) => o.status === "pending").length
    const accepted = allOrders.filter((o) => o.status === "accepted").length
    const delivered = allOrders.filter((o) => o.status === "delivered").length
    const revenue = allOrders.reduce((sum, o) => sum + o.total, 0)

    setStats({
      total: allOrders.length,
      pending,
      accepted,
      delivered,
      revenue,
    })
  }

  const handleStatusUpdate = (orderId: string, newStatus: Order["status"]) => {
    updateOrderStatus(orderId, newStatus)
    loadOrders()
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

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("en-NG", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Manage your orders and track performance</p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">{stats.total}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Package className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">{stats.pending}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10">
                  <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Delivered</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">{stats.delivered}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                  <p className="mt-2 text-3xl font-bold text-foreground">₦{stats.revenue.toLocaleString()}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                  <TrendingUp className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="py-12 text-center">
                <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-lg font-medium text-foreground">No orders yet</p>
                <p className="text-sm text-muted-foreground">Orders will appear here when customers place them</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-lg border border-border p-4 transition-colors hover:bg-muted/30"
                  >
                    <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="font-mono text-sm font-semibold text-foreground">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{formatDate(order.createdAt)}</p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="mb-3 grid gap-2 sm:grid-cols-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Customer</p>
                        <p className="font-medium text-foreground">{order.customerName}</p>
                        <p className="text-sm text-muted-foreground">{order.customerPhone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Delivery Address</p>
                        <p className="text-sm text-foreground">{order.customerAddress}</p>
                      </div>
                    </div>

                    <div className="mb-3 border-t border-border pt-3">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Order Items
                      </p>
                      <div className="space-y-1">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-foreground">
                              {item.name} x{item.quantity}
                            </span>
                            <span className="font-medium text-foreground">
                              ₦{(item.price * item.quantity).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 flex justify-between border-t border-border pt-2">
                        <span className="font-semibold text-foreground">Total</span>
                        <span className="font-bold text-primary">₦{order.total.toLocaleString()}</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Payment: {order.paymentMethod === "cash" ? "Cash on Delivery" : "Card (Paid)"}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {order.status === "pending" && (
                        <Button size="sm" onClick={() => handleStatusUpdate(order.id, "accepted")} className="gap-1">
                          <CheckCircle2 className="h-4 w-4" />
                          Accept Order
                        </Button>
                      )}
                      {order.status === "accepted" && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleStatusUpdate(order.id, "delivered")}
                          className="gap-1"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          Mark as Delivered
                        </Button>
                      )}
                      {order.status === "delivered" && (
                        <Badge variant="outline" className="gap-1 bg-green-500/10">
                          <CheckCircle2 className="h-3 w-3" />
                          Completed
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
