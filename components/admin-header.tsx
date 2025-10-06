import Link from "next/link"
import { LayoutDashboard } from "lucide-react"

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-none text-foreground">Admin Dashboard</span>
            <span className="text-xs text-muted-foreground">Warri Eats</span>
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            View Site
          </Link>
        </nav>
      </div>
    </header>
  )
}
