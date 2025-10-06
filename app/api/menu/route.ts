import { menuItems, restaurants } from "@/lib/data"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const restaurantId = searchParams.get("restaurantId")
    const category = searchParams.get("category")

    let filteredItems = menuItems

    if (restaurantId && restaurantId !== "all") {
      filteredItems = filteredItems.filter((item) => item.restaurantId === restaurantId)
    }

    if (category && category !== "all") {
      filteredItems = filteredItems.filter((item) => item.category === category)
    }

    return NextResponse.json({
      items: filteredItems,
      restaurants,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch menu" }, { status: 500 })
  }
}
