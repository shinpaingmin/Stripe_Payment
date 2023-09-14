import { Row, Col } from 'react-bootstrap'
import { products } from '../data/productStore'
import ProductCard from '../components/ProductCard'
const Store = () => {
  return (
    <>
      <h1 className='text-center p-3'>Welcome to the store!</h1>
      <Row xs={1} md={3} className='g-4'>
        {
          products.map((product)=>(
            <Col key={product.id} align="center">
              <ProductCard id={product.id} title={product.title} price={product.price} img={product.img}/>
            </Col>
          ))
        }
      </Row>
    </>
  )
}

export default Store