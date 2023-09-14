import { Button } from 'react-bootstrap'
import { useCartContext } from '../context/CartContext'
import { getProductData } from '../data/productStore';

const CartProduct = ({ id, quantity }) => {
    const { deleteFromCart } = useCartContext();
    return (
    <>
       <h3>{getProductData(id).title}</h3> 
       <p>{quantity} total</p>
       <p>${(quantity * getProductData(id).price).toFixed(2)}</p>
       <Button size="sm" onClick={() => deleteFromCart(id)}>Remove from Cart</Button>
       <hr />
    </>
  )
}

export default CartProduct