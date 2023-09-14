import { useEffect, useState } from 'react'
import { Button, Navbar, Modal } from 'react-bootstrap'
import { useCartContext } from '../context/CartContext';
import CartProduct from './CartProduct';

const Header = () => {
  const { items, getTotalCost } = useCartContext();
  const [productsCount, setProductsCount] = useState(0);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleHide = () => setShow(false);

  useEffect(()=>{
    const totalItem = items.reduce((acc, item)=>acc + item.quantity, 0);
    setProductsCount(totalItem);
  }, [items])

  const checkout = async () => {
    await fetch('http://localhost:4000/checkout', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({items: items})
    }).then((response) => {
      return response.json();
    }).then((response) => {
      if(response.url) {
        window.location.assign(response.url); //Forwarding users to stripe
      }
    })
  }

  return (
    <>
        <Navbar expand="sm">
          <Navbar.Brand href='/'>Ecommerce Store</Navbar.Brand>
          <Navbar.Toggle/>
          <Navbar.Collapse className='justify-content-end'>
            <Button onClick={handleShow}>Cart {productsCount} Items</Button>
          </Navbar.Collapse>
        </Navbar>

        {/* Modal */}
        <Modal show={show} onHide={handleHide}>
            <Modal.Header closeButton>
              <Modal.Title>Shopping Cart</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {
                productsCount > 0 ?
                <>
                  <p>Items in your cart:</p>
                  {
                    items.map((item)=>(
                      <CartProduct key={item.id} id={item.id} quantity={item.quantity}/>
                    ))
                  }
                  <h1>Total: {getTotalCost().toFixed(2)}</h1>

                  <Button variant='success' onClick={checkout}>
                    Purchase Items!
                  </Button>
                </>

                :

                <h1>There is no items in your cart!</h1>
              }
            </Modal.Body>
        </Modal>
    </>
  )
}

export default Header