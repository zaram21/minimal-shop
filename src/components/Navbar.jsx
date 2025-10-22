import { ShoppingCart, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [cartCount, setCartCount] = useState(0)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || [])
    setCartCount(storedCart.length)

    const storedUser =  localStorage.getItem("user")
    setUser(storedUser ? JSON.parse(storedUser) : null)

    window.addEventListener("cartUpdated", () => {
      const updatedCart = JSON.parse(localStorage.getItem("cart") || [])
      setCartCount(updatedCart.length)
    })

    window.addEventListener("userUpdated", () => {
      const newUser = JSON.parse(localStorage.getItem("user") || null)
      setUser(newUser)
    })

  },[])

  return (
    <nav className='bg-white shadow-sm sticky top-0 z-50'>
      <div className='flex justify-between items-center max-w-6xl mx-auto px-4 py-3'>
        <Link to="/" className='text-lg font-semibold'>
          Minimal Shop
        </Link>
        <div className='flex relative space-x-4 items-center'>
          <Link to="/cart" className='relative'>
          <ShoppingCart size={20}/>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-pastelPink text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
          </Link>
          <Link to="/login">
          <User size={20}/>
          {user && <span className="ml-1 text-sm font-medium">
            {user.username}
          </span>}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar