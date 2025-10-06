import { getOrders, addOrder, type Order } from "@/lib/data"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const orders = getOrders()
    return NextResponse.json({ orders })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const order: Order = {
      id: body.id || `ORD-${Date.now()}`,
      customerName: body.customerName,
      customerPhone: body.customerPhone,
      customerAddress: body.customerAddress,
      items: body.items,
      total: body.total,
      paymentMethod: body.paymentMethod,
      status: "pending",
      createdAt: new Date(),
    }

    addOrder(order)

    return NextResponse.json({ success: true, order })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
