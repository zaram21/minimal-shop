import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"

function Product() {
  const {id} = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`)
    .then(res => setProduct(res.data))
  },[id])

  if(!product) return <div className="animate-pulse bg-gray-100 w-full h-64 rounded"></div>

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]")
    const exists = cart.find(item => item.id === product.id)
    if (exists) return toast.error("Already in cart!")
    cart.push({...product, quantity: 1})
    localStorage.setItem("cart", JSON.stringify(cart))
    window.dispatchEvent(new Event("cartUpdated"))
    toast.success("Added to cart 🛒")
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:grid-cols-2 gap-8">
      <img src={product.image} alt={product.title} className="h-72 object-contain" />
      <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-xl font-medium mb-4">{product.price}</p>
      <button onClick={addToCart} className="px-6 py-2 bg-pastelBlue rounded shadow-sm hover:shadow-lg transition-all duration-300 ease-out">Add to Cart</button>
    </div>
  )
}

export default Product