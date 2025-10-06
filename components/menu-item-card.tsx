"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import type { MenuItem } from "@/lib/data"
import { addToCart } from "@/lib/cart-store"
import { useToast } from "@/hooks/use-toast"

interface MenuItemCardProps {
  item: MenuItem
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { toast } = useToast()

  const handleAddToCart = () => {
    addToCart({ ...item, quantity: 1 })
    // Dispatch custom event to update cart count
    window.dispatchEvent(new Event("cartUpdated"))

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    })
  }

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {!item.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <span className="text-sm font-semibold text-foreground">Unavailable</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{item.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">₦{item.price.toLocaleString()}</span>
          <Button size="sm" onClick={handleAddToCart} disabled={!item.available} className="gap-1">
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
