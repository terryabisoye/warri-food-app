import { getOrders, updateOrderStatus } from "@/lib/data"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { orderId: string } }) {
  try {
    const orders = getOrders()
    const order = orders.find((o) => o.id === params.orderId)

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({ order })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { orderId: string } }) {
  try {
    const body = await request.json()
    const { status } = body

    if (!status || !["pending", "accepted", "delivered"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }

    updateOrderStatus(params.orderId, status)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}
