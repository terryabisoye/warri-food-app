import { Header } from "@/components/header"
import { RestaurantCard } from "@/components/restaurant-card"
import { Button } from "@/components/ui/button"
import { restaurants } from "@/lib/data"
import { ArrowRight, Clock, MapPin, Utensils } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background to-muted/20 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-5xl font-bold leading-tight text-foreground text-balance md:text-6xl">
              Delicious Food Delivered to Your Door in Warri
            </h1>
            <p className="mb-8 text-lg text-muted-foreground text-pretty md:text-xl">
              Order from the best local restaurants and enjoy authentic Nigerian cuisine delivered fresh and fast
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/menu">
                <Button size="lg" className="gap-2 text-base">
                  Browse Menu
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-border py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Utensils className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">Wide Selection</h3>
              <p className="text-muted-foreground">
                Choose from the best restaurants serving authentic Nigerian dishes
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">Fast Delivery</h3>
              <p className="text-muted-foreground">Get your food delivered hot and fresh in 20-40 minutes</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">Local Service</h3>
              <p className="text-muted-foreground">Serving Warri and its environs with reliable delivery</p>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurants Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">Popular Restaurants</h2>
            <p className="text-lg text-muted-foreground">Discover the best food spots in Warri</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/menu">
              <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                View All Menus
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">&copy; 2025 Warri Eats. Serving Warri, Delta State with love.</p>
        </div>
      </footer>
    </div>
  )
}
