import { createContext, useContext, useState } from "react";
import { getProductData } from '../data/productStore'

const CartContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {}
});

export const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([]);

    //check if the item exists
    // [ {id: 1, quantity: 3 } ]
    const getProductQuantity = (id) => {
        const quantity = cartProducts.find(product => product.id === id)?.quantity;     //find & check 

        if (quantity === undefined) {
            return 0;
        }

        return quantity;
    }

    //add one item to cart
    const addOneToCart = (id) => {
        const quantity = getProductQuantity(id);

        if (quantity === 0) {       //product is not in cart
            setCartProducts([...cartProducts, { id: id, quantity: 1 }])
        } else {                    //product is in cart
            // [ { id: 1, quantity: 3 }, { id: 2, quantity: 1+1 } ]
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id === id
                    ? { ...product, quantity: product.quantity + 1 }    //if statement is true
                    : product                                           //if statement is false
                )
            )
        }
    }

    //remove one item from cart
    const removeOneFromCart = (id) => {
        const quantity = getProductQuantity(id);

        if (quantity === 1) {
            deleteFromCart(id);
        } else {
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id === id
                    ? { ...product, quantity: product.quantity -1 }
                    : product
                )
            )
        }
    }

    //delete from cart
    const deleteFromCart = (id) => {
        setCartProducts(cartProducts.filter((product)=>{
            return product.id !== id;
        }))
    }

    //accumulation total cost
    // [ {product1}, {product2}, {product3}]
    const getTotalCost = () => {
        let totalCost = 0;

        cartProducts.map((cartItem)=>{
            const productData = getProductData(cartItem.id);
            totalCost = totalCost + (productData.price * cartItem.quantity);
        });

        return totalCost;
    }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost
    }

    return (
        <CartContext.Provider value={contextValue}>
            { children }
        </CartContext.Provider>
    )
}

export const useCartContext = () => useContext(CartContext);