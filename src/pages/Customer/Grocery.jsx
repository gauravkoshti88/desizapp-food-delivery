import React, { useState } from 'react'
import Logo from '../../assets/ZappGrocery.png'
import Fruits from '../../assets/Grocery/Fruits.png'
import Vegetables from '../../assets/Grocery/Vegetables.png'
import Dairy from '../../assets/Grocery/dairy.png'
import Bakery from '../../assets/Grocery/Bakery.png'
import { useNavigate } from 'react-router-dom'

const categories = [
  {
    name: 'Fruits',
    image: Fruits,
    color: 'from-red-400 to-orange-400'
  },
  {
    name: 'Vegetables',
    image: Vegetables,
    color: 'from-green-400 to-emerald-400'
  },
  {
    name: 'Dairy',
    image: Dairy,
    color: 'from-yellow-400 to-amber-400'
  },
  {
    name: 'Bakery',
    image: Bakery,
    color: 'from-amber-400 to-orange-400'
  }
]

function Grocery() {
  const [search, setSearch] = useState("")
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <img
              src={Logo}
              alt="Logo"
              className="w-30 h-20 cursor-pointer"
              onClick={()=>navigate("/home")}
            />
            <div className="relative w-72">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              />
              <span className="absolute left-3 top-3 text-gray-400">🔍</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-5">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <img
            src={Logo}
            alt="Logo"
            className="w-35 h-35 mx-auto"
          />
          
          <div className="bg-orange-500 text-white px-8 py-4 rounded-2xl inline-block mb-8 shadow-lg">
            🚀 COMING SOON
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Fresh Groceries
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-xl mx-auto">
            Quality groceries delivered fresh to your doorstep
          </p>
          
          <div className="space-y-4 max-w-md mx-auto">
            <button className="w-full py-4 px-8 bg-gray-400 text-white font-semibold rounded-xl hover:bg-gray-500 transition-colors">
              Shop Now (Coming Soon)
            </button>
            <button className="w-full py-4 px-8 border-2 border-orange-500 text-orange-500 font-semibold rounded-xl hover:bg-orange-500 hover:text-white transition-colors">
              Get Notified
            </button>
          </div>
        </div>

        {/* Categories */}
        <section className="mb-20">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Coming Soon Categories
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="w-full h-32 bg-gray-100 rounded-xl overflow-hidden mb-4">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  {category.name}
                </h4>
                <p className="text-orange-500 font-semibold text-lg">Coming Soon</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-orange-600 to-amber-600 text-white mt-20 py-5">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <img 
            src={Logo} 
            alt="Logo"
            className="w-35 h-25 mx-auto"
          />
          <p className="text-xl mb-8">
            Exciting grocery shopping coming soon!
          </p>
          <div className="flex justify-center space-x-8 text-2xl mb-8">
            <a href="#" className="hover:text-orange-200 transition-colors">📘</a>
            <a href="#" className="hover:text-orange-200 transition-colors">🐦</a>
            <a href="#" className="hover:text-orange-200 transition-colors">📷</a>
          </div>
          <p className="text-sm opacity-90">&copy; 2024. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Grocery