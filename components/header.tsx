"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import { getCartItemCount } from "@/lib/cart-store"

export function Header() {
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // Update cart count on mount and when storage changes
    const updateCount = () => setCartCount(getCartItemCount())
    updateCount()

    window.addEventListener("storage", updateCount)
    window.addEventListener("cartUpdated", updateCount)

    return () => {
      window.removeEventListener("storage", updateCount)
      window.removeEventListener("cartUpdated", updateCount)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="text-xl font-bold text-primary-foreground">W</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-none text-foreground">Warri Eats</span>
            <span className="text-xs text-muted-foreground">Food Delivery</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/menu" className="text-sm font-medium text-foreground transition-colors hover:text-primary">
            Menu
          </Link>
        </nav>

        <Link href="/cart">
          <Button variant="outline" size="sm" className="relative gap-2 bg-transparent">
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <Badge variant="destructive" className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs">
                {cartCount}
              </Badge>
            )}
          </Button>
        </Link>
      </div>
    </header>
  )
}
