import { Card, Button, Form, Row, Col } from 'react-bootstrap'
import { useCartContext } from '../context/CartContext'

const ProductCard = ({ id, title, price, img }) => {
  const { addOneToCart, removeOneFromCart, deleteFromCart, getProductQuantity } = useCartContext();
  // console.log(items);
  return (
    <>
        <Card >
            <Card.Body>
                <Card.Img src={img} className='pb-4'/>
                <Card.Title>{title}</Card.Title>
                <Card.Text>${price}</Card.Text>
                {
                  getProductQuantity(id) > 0 ? 
                  <>
                    <Form as={Row}>
                        <Form.Label column="true" sm="6">In Cart: {getProductQuantity(id)}</Form.Label>
                        <Col sm="6">
                            <Button sm="6" className='mx-2' onClick={() => addOneToCart(id)}>+</Button>
                            <Button sm="6" className='mx-2' onClick={() => removeOneFromCart(id)}>-</Button>
                        </Col>
                    </Form>
                    <Button variant='danger' onClick={() => deleteFromCart(id)} className='my-3'>Remove From Cart</Button>
                  </>

                   :
                  
                    <Button variant='primary' onClick={() => addOneToCart(id)}>Add to Cart</Button>
                  
                }
            </Card.Body>
        </Card>
    </>
  )
}

export default ProductCard