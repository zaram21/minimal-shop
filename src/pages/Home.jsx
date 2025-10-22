import axios from "axios"
import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import SkeletonCard from "../components/SkeletonCard"

function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
    .then(res => {setProducts(res.data); setLoading(false)})
    .catch(() => setLoading(false))
  },[])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-6">
        {loading ? Array(6).fill().map((_,i) => <SkeletonCard key={i} />) : products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}

export default Home