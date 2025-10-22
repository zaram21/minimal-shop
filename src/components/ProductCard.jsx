import { Link } from 'react-router-dom'

function ProductCard({product}) {
  return (
    <Link to={`/product/${product.id}`} className='shadow-sm rounded-lg p-4 hover:translate-y-1 hover:shadow-lg transition-all duration-300 ease-out'>
      <img src={product.image} alt={product.title} className='h-40 mx-auto object-contain mb-4' />
      <h3 className='font-medium line-clamp-2'>{product.title}</h3>
      <p className='text-sm text-gray-500 mt-2'>{product.price}</p>
    </Link>
  )
}

export default ProductCard