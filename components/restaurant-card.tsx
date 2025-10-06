import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Star } from "lucide-react"
import type { Restaurant } from "@/lib/data"

interface RestaurantCardProps {
  restaurant: Restaurant
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/menu?restaurant=${restaurant.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={restaurant.image || "/placeholder.svg"}
            alt={restaurant.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="mb-1 text-lg font-semibold text-foreground">{restaurant.name}</h3>
          <p className="mb-3 text-sm text-muted-foreground">{restaurant.description}</p>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Star className="h-3 w-3 fill-current" />
              {restaurant.rating}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Clock className="h-3 w-3" />
              {restaurant.deliveryTime}
            </Badge>
          </div>

          <div className="mt-3 flex flex-wrap gap-1">
            {restaurant.cuisine.map((c) => (
              <span key={c} className="text-xs text-muted-foreground">
                {c}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
