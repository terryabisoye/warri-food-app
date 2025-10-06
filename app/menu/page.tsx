"use client"

import { Header } from "@/components/header"
import { MenuItemCard } from "@/components/menu-item-card"
import { Button } from "@/components/ui/button"
import { menuItems, restaurants } from "@/lib/data"
import { useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"

function MenuContent() {
  const searchParams = useSearchParams()
  const restaurantId = searchParams.get("restaurant")

  const [selectedRestaurant, setSelectedRestaurant] = useState<string>(restaurantId || "all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredItems = menuItems.filter((item) => {
    const matchesRestaurant = selectedRestaurant === "all" || item.restaurantId === selectedRestaurant
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesRestaurant && matchesCategory
  })

  const categories = ["all", ...Array.from(new Set(menuItems.map((item) => item.category)))]

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-foreground">Our Menu</h1>
          <p className="text-lg text-muted-foreground">Browse delicious meals from local restaurants</p>
        </div>

        {/* Restaurant Filter */}
        <div className="mb-6">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Restaurants</h2>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedRestaurant === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedRestaurant("all")}
            >
              All Restaurants
            </Button>
            {restaurants.map((restaurant) => (
              <Button
                key={restaurant.id}
                variant={selectedRestaurant === restaurant.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRestaurant(restaurant.id)}
              >
                {restaurant.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category === "all" ? "All Items" : category}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">No items found. Try adjusting your filters.</p>
          </div>
        )}
      </div>

      <footer className="border-t border-border bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">&copy; 2025 Warri Eats. Serving Warri, Delta State with love.</p>
        </div>
      </footer>
    </div>
  )
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MenuContent />
    </Suspense>
  )
}
