# Warri Food Delivery App - MVP

A complete food ordering application for Warri, Delta State, built with Next.js, TypeScript, and Tailwind CSS.

## Features

### Customer Features
- **Landing Page**: Hero section with featured restaurants
- **Menu Browsing**: Filter by restaurant and category
- **Shopping Cart**: Add/remove items, adjust quantities
- **Checkout**: Customer information and payment method selection
- **Order Confirmation**: Order tracking with status updates
- **Payment Options**: Cash on Delivery or Card Payment (demo)

### Admin Features
- **Dashboard**: Real-time order statistics
- **Order Management**: View all orders with details
- **Status Updates**: Accept orders and mark as delivered
- **Revenue Tracking**: Total revenue and order counts

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State Management**: React hooks + localStorage
- **Data Storage**: In-memory (JavaScript arrays)

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx                    # Landing page
│   ├── menu/page.tsx               # Menu browsing
│   ├── cart/page.tsx               # Shopping cart
│   ├── checkout/page.tsx           # Checkout form
│   ├── order-confirmation/page.tsx # Order confirmation
│   ├── admin/page.tsx              # Admin dashboard
│   └── api/
│       ├── orders/route.ts         # Orders API
│       └── menu/route.ts           # Menu API
├── components/
│   ├── header.tsx                  # Customer header
│   ├── admin-header.tsx            # Admin header
│   ├── restaurant-card.tsx         # Restaurant display
│   ├── menu-item-card.tsx          # Menu item display
│   └── toaster.tsx                 # Toast notifications
├── lib/
│   ├── data.ts                     # Data models & storage
│   └── cart-store.ts               # Cart management
└── public/                         # Food images
\`\`\`

## Data Models

### Restaurant
- id, name, description, image
- rating, deliveryTime, cuisine

### MenuItem
- id, restaurantId, name, description
- price, image, category, available

### Order
- id, customerName, customerPhone, customerAddress
- items, total, paymentMethod
- status (pending → accepted → delivered)
- createdAt

## Getting Started

1. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

2. **Run Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Open Application**
   - Customer Site: http://localhost:3000
   - Admin Dashboard: http://localhost:3000/admin

## Usage

### For Customers
1. Browse restaurants on the home page
2. Click "Browse Menu" or select a restaurant
3. Add items to cart
4. Proceed to checkout
5. Fill in delivery details
6. Choose payment method (Cash on Delivery or Card)
7. Place order and view confirmation

### For Admins
1. Navigate to /admin
2. View order statistics
3. See all orders in real-time
4. Accept pending orders
5. Mark accepted orders as delivered

## Sample Data

The app includes sample data for:
- 3 restaurants (Mama Put Kitchen, Warri Grill House, Buka Express)
- 10 menu items (Jollof Rice, Egusi Soup, Grilled Catfish, etc.)
- Nigerian cuisine popular in Warri

## Payment Methods

- **Cash on Delivery**: Pay when order arrives
- **Card Payment**: Demo payment (shows success immediately)

## Order Status Flow

1. **Pending**: Order placed, waiting for restaurant
2. **Accepted**: Restaurant preparing food
3. **Delivered**: Order completed

## Customization

### Add New Restaurants
Edit `lib/data.ts` and add to the `restaurants` array:

\`\`\`typescript
{
  id: "r4",
  name: "Your Restaurant",
  description: "Description",
  image: "/your-image.jpg",
  rating: 4.5,
  deliveryTime: "30-40 min",
  cuisine: ["Nigerian"]
}
\`\`\`

### Add New Menu Items
Edit `lib/data.ts` and add to the `menuItems` array:

\`\`\`typescript
{
  id: "m11",
  restaurantId: "r1",
  name: "Your Dish",
  description: "Description",
  price: 2000,
  image: "/your-dish.jpg",
  category: "Main Course",
  available: true
}
\`\`\`

### Change Colors
Edit `app/globals.css` to customize the color scheme:
- `--primary`: Main brand color (orange)
- `--secondary`: Accent color (green)
- `--background`: Page background
- `--foreground`: Text color

## Deployment

Deploy to Vercel:

\`\`\`bash
vercel deploy
\`\`\`

Or use the "Publish" button in the v0 interface.

## Future Enhancements

- Real database integration (Supabase/Neon)
- User authentication
- Real-time order updates (WebSockets)
- Payment gateway integration (Stripe/Paystack)
- SMS notifications
- Order history for customers
- Restaurant management portal
- Delivery tracking
- Reviews and ratings

## License

MIT License - Feel free to use for your food delivery business!

## Support

For issues or questions, contact support or check the documentation.

---

Built with ❤️ for Warri, Delta State
