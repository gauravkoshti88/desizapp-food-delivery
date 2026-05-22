# 🍕 DesiZapp - Food Delivery Application

> A modern, full-stack food delivery platform built with React, Node.js, and MongoDB. Order from your favorite restaurants and get fast delivery to your doorstep.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-brightgreen)](https://desizapp-food-delivery.vercel.app)
[![GitHub Stars](https://img.shields.io/github/stars/gauravkoshti88/desizapp-food-delivery?style=social)](https://github.com/gauravkoshti88/desizapp-food-delivery)

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Key Pages & Functionality](#key-pages--functionality)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 About

**DesiZapp** is a comprehensive food delivery application designed to connect customers with restaurants seamlessly. Built with a modern MERN stack, it features:

- **Responsive UI** across all devices
- **Real-time order tracking** with Socket.io
- **Multi-role support** (Customer, Food Partner, Delivery Boy)
- **Payment integration** and order management
- **Admin dashboard** for analytics and business insights

Perfect for food delivery startups and restaurant management solutions.

---

## ✨ Features

### 🔐 **Authentication & Authorization**
- User registration and login with Firebase
- Password recovery and reset functionality
- Role-based access (Customer, Food Partner, Delivery Boy)
- JWT token management

### 🛒 **Customer Features**
- Browse restaurants and food items by location
- Add items to cart with customization
- Secure checkout with Razorpay payment integration
- Real-time order tracking with live delivery boy location
- Order history and reorder functionality
- Profile management and address management

### 🍔 **Food Partner Features**
- Create and manage restaurant profile
- Add, edit, and delete food items with images
- View incoming orders and manage status
- Track earnings and revenue analytics
- Real-time order notifications

### 🚚 **Delivery Boy Features**
- Accept available orders
- Real-time GPS tracking
- Update order status (Accepted, In Transit, Delivered)
- View delivery history and earnings

### 📊 **Admin & Analytics**
- Dashboard with real-time charts and analytics
- Order statistics and trends
- Shop and revenue tracking
- User management

### 🎁 **Additional Features**
- AI-powered food recommendations
- ZappShorts (video content feed)
- Grocery section (modular implementation)
- Location-based filtering
- Socket.io for real-time updates
- Responsive design with Tailwind CSS
- Smooth animations with Framer Motion

---

## 🛠️ Tech Stack

### **Frontend**
- **React 19.2** - UI library
- **Vite 8.0** - Build tool and dev server
- **Redux Toolkit & React-Redux** - State management
- **React Router DOM 7.13** - Client-side routing
- **Tailwind CSS 4.2** - Utility-first CSS framework
- **Axios 1.13** - HTTP client
- **Socket.io Client 4.8** - Real-time communication
- **Framer Motion 12.38** - Animation library
- **Leaflet & React-Leaflet 5.0** - Map visualization
- **Recharts 3.8** - Charts and analytics
- **React Toastify 11.1** - Toast notifications
- **React Icons 5.6** - Icon library

### **Backend** *(Separate Repository)*
- Node.js & Express - Server framework
- MongoDB - NoSQL database
- Firebase - Authentication & Cloud Storage
- Razorpay - Payment gateway
- Cloudinary - Image hosting
- Socket.io - Real-time communication

### **Deployment**
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: MongoDB Atlas

---

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm
- Git

### Clone Repository

```bash
git clone https://github.com/gauravkoshti88/desizapp-food-delivery.git
cd desizapp-food-delivery
```

### Frontend Setup

```bash
# Install dependencies
npm install

# Create .env file
cat > .env.local << EOF
VITE_API_URL=http://localhost:5000
EOF

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🚀 Usage

### For Customers
1. **Register/Login** using email or Firebase authentication
2. **Allow location access** to see nearby restaurants
3. **Browse restaurants** and add items to cart
4. **Proceed to checkout** and pay via Razorpay
5. **Track order** in real-time with delivery boy location
6. **View order history** and reorder favorites

### For Food Partners
1. **Create restaurant profile** with details
2. **Add food items** with images, descriptions, and prices
3. **Manage incoming orders** through dashboard
4. **Track earnings** and view analytics
5. **Update order status** for real-time customer notification

### For Delivery Boys
1. **View available orders** near your location
2. **Accept orders** you can deliver
3. **Navigate to pickup** location (Leaflet maps)
4. **Update status** as you progress
5. **Deliver order** and mark as completed

---

## 📁 Project Structure

```
desizapp-food-delivery/
├── src/
│   ├── components/
│   │   ├── DeliveryBoy/          # Delivery boy UI components
│   │   ├── Navigation/           # Header, navbar, sidebar
│   │   └── ...                   # Other shared components
│   ├── pages/
│   │   ├── Customer/             # Customer pages (Cart, Checkout, Orders, etc.)
│   │   ├── Food_Partner/         # Restaurant partner pages (Shop, Items, Earnings)
│   │   ├── Delivery_Boy/         # Delivery tracking pages
│   │   ├── Auth/                 # Login, Register, Password reset
│   │   └── ...                   # Other pages
│   ├── hooks/
│   │   ├── useGetCity.js         # Fetch city data
│   │   ├── useGetMyShop.js       # Fetch user's shop
│   │   ├── useGetMyOrders.js     # Fetch user's orders
│   │   ├── useUpdateLocation.js  # Update user location
│   │   └── ...                   # Other custom hooks
│   ├── redux/
│   │   ├── slices/               # Redux slices (user, shop, order, cart, etc.)
│   │   └── store.js              # Redux store configuration
│   ├── utils/
│   │   ├── socketService.js      # Socket.io initialization and management
│   │   └── ...                   # Other utilities
│   ├── listeners/
│   │   └── socketListeners.js    # Socket event listeners
│   ├── App.jsx                   # Main app component with routes
│   └── main.jsx                  # React entry point
├── public/                        # Static assets
├── package.json                   # Dependencies and scripts
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── README.md                      # Project documentation
```

---

## 📸 Screenshots

### Welcome & Register & Login Page

<p align="center">
    <img src="./screenshots/w1.png" width="45%" />
    <img src="./screenshots/w2.png" width="45%" />
    <img src="./screenshots/register.png" width="45%" />
    <img src="./screenshots/login.png" width="45%" />
</p>

### Customer Pages

- For Desktop View 

<p align="center">
    <img src="./screenshots/customer-desktop/home1.png" width="45%" />
    <img src="./screenshots/customer-desktop/item-card.png" width="45%" />
    <img src="./screenshots/customer-desktop/grosery.png" width="45%" />
    <img src="./screenshots/customer-desktop/cart.png" width="45%" />
    <img src="./screenshots/customer-desktop/checkout.png" width="45%" />
    <img src="./screenshots/customer-desktop/placed.png" width="45%" />
    <img src="./screenshots/customer-desktop/my-orders.png" width="45%" />
    <img src="./screenshots/customer-desktop/track-order.png" width="45%" />
    <img src="./screenshots/customer-desktop/assign-boy.png" width="45%" />
    <img src="./screenshots/customer-desktop/Deliverd.png" width="45%" />
    <img src="./screenshots/customer-desktop/track-deliverd.png" width="45%" />
    <img src="./screenshots/customer-desktop/profile.png" width="45%" />
</p>

- For Mobile View

<p align="center">
    <img src="./screenshots/customer-mobile/4.jpeg" width="45%" />
    <img src="./screenshots/customer-mobile/6.jpeg" width="45%" />
    <img src="./screenshots/customer-mobile/7.jpeg" width="45%" />
    <img src="./screenshots/customer-mobile/8.jpeg" width="45%" />
    <img src="./screenshots/customer-mobile/9.jpeg" width="45%" />
</p>

### Shop Pages

- For Desktop View 

<p align="center">
    <img src="./screenshots/shop-desktop/shop-home.png" width="45%" />
    <img src="./screenshots/shop-desktop/add-item.png" width="45%" />
    <img src="./screenshots/shop-desktop/shop-item.png" width="45%" />
    <img src="./screenshots/shop-desktop/orders.png" width="45%" />
    <img src="./screenshots/shop-desktop/earning.png" width="45%" />
</p>

- For Mobile View 

<p align="center">
    <img src="./screenshots/shop-mobile/sm1.jpeg" width="45%" />
    <img src="./screenshots/shop-mobile/sm2.jpeg" width="45%" />
    <img src="./screenshots/shop-mobile/sm3.jpeg" width="45%" />
    <img src="./screenshots/shop-mobile/sm4.jpeg" width="45%" />
</p>

### Delivery-Boy Pages

<p align="center">
    <img src="./screenshots/delivery-boy/13.jpeg" width="45%" />
    <img src="./screenshots/delivery-boy/14.jpeg" width="45%" />
    <img src="./screenshots/delivery-boy/15.jpeg" width="45%" />
    <img src="./screenshots/delivery-boy/16.jpeg" width="45%" />
    <img src="./screenshots/delivery-boy/17.jpeg" width="45%" />
</p>

---

## 🎯 Key Pages & Functionality

| Route | Role | Description |
|-------|------|-------------|
| `/` | All | Welcome/Landing page |
| `/login` | All | User login |
| `/register` | All | User registration |
| `/home` | All | Main dashboard/feed |
| `/shop/:shopId` | Customer | View restaurant menu |
| `/cart` | Customer | Shopping cart |
| `/checkout` | Customer | Payment & order confirmation |
| `/my-orders` | Customer | Order history and tracking |
| `/track-order/:orderId` | Customer | Real-time order tracking with map |
| `/create-edit-shop` | Food Partner | Create/edit restaurant |
| `/add-food-item` | Food Partner | Add new food item |
| `/edit-food-item/:itemId` | Food Partner | Edit food item |
| `/shop-earning` | Food Partner | Revenue analytics dashboard |
| `/delivered-orders` | Delivery Boy | Completed deliveries |
| `/zapp-shorts` | Customer | Video content feed |
| `/grocery` | Customer | Grocery shopping section |
| `/edit-profile` | All | User profile management |

---

## 🔌 Socket.io Events

### Real-time Communication
- **`identity`** - Register user socket connection
- **`orderUpdate`** - Notify order status changes
- **`deliveryUpdate`** - Track delivery boy location
- **`chatMessage`** - Customer-partner communication (if implemented)

---

## 📊 Environment Variables

Create a `.env.local` file in the root directory:

---

## 🤝 Contributing

Contributions are welcome! Here's how to help:

1. **Fork** the repository
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Code Standards
- Follow React best practices
- Use functional components with hooks
- Write meaningful commit messages
- Test your changes before submitting PR
- Update documentation as needed

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👤 Contact

**Gaurav Koshti**
- 🔗 **GitHub**: [@gauravkoshti88](https://github.com/gauravkoshti88)
- 💼 **LinkedIn**: [Gaurav Koshti](www.linkedin.com/in/gaurav-koshti-565b73249)
- 📧 **Email**: gauravkoshti1@gmail.com

---

## 🙏 Acknowledgments

- React and Vite communities for excellent tools
- Tailwind CSS for utility-first CSS framework
- Socket.io for real-time capabilities
- All contributors and users for feedback and support

---

## 📈 Future Enhancements

- [ ] Push notifications for orders
- [ ] Advanced filtering and search
- [ ] Loyalty and rewards program
- [ ] Multi-language support (i18n)
- [ ] Progressive Web App (PWA)
- [ ] Advanced AI recommendations
- [ ] Voice ordering feature
- [ ] Integration with more payment gateways

---

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature idea? [Create an issue](https://github.com/gauravkoshti88/desizapp-food-delivery/issues) on GitHub!

---

<div align="center">

**Made with ❤️ by Gaurav Koshti**

[⬆ back to top](#-desizapp---food-delivery-application)

</div>
