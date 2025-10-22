import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

function Cart() {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartItems(data)
  },[])

  const updateQuantity = (id, qty) => {
    const updated = cartItems.map(item => item.id  === id ? {...item, quantity: Math.max(qty, 1)} : item)
    setCartItems(updated)
    localStorage.setItem("cart", JSON.stringify(updated))
    toast.success("Quantity updated")
  }

  const removeItem = (id) => {
    const filtered = cartItems.filter(i => i.id !== id)
    setCartItems(filtered)
    localStorage.setItem("cart", JSON.stringify(filtered))
    window.dispatchEvent(new Event("cartUpdated"))
    toast.success("Removed from cart")
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem("cart")
    window.dispatchEvent(new Event("cartUpdated"))
    toast("Cart cleared")
  }

  const totalPrice = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0).toFixed(2)

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-lg font-semibold mb-6">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <AnimatePresence>
            {cartItems.map(item => (
              <motion.div key={item.id} className="flex items-center justify-between bg-white shadow-sm rounded p-4 mb-3 hover:shadow-lg transition-all" exit={{opacity: 0, scale: 0.95}}>
                  <div className="flex items-center space-x-3">
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
                    <div>
                      <p className="line-clamp-1">{item.title}</p>
                      <p className="text-gray-500 text-sm">{item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    <button className="text-red-500 hover:text-red-600 transition" onClick={() => removeItem(item.id)}>✕</button>
                  </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="flex justify-between mt-6 items-center bg-white rounded shadow-sm p-4">
            <p className="font-medium">Total: ${totalPrice}</p>
            <button onClick={clearCart} className="px-4 py-2 bg-pastelPink text-white rounded shadow-sm hover:shadow-md transition-all">Clear Cart</button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart