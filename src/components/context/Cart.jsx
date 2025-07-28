import { createContext, useEffect, useState } from "react";
import { apiUrl } from "../common/http";

export const CartContext = createContext();

export const CartProvider = ({children}) => {

    const [cartData, setCartData] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [shippingCost, setShippingCost]   =   useState();

    const addToCart = (product, size = null) => {
        let updatedCart = [ ...cartData ];

        // if cart is empty
        if(cartData.length == 0) {
            updatedCart.push({
                id: `${product.id}-${Math.floor(Math.random() * 10000000)}`,
                product_id: product.id,
                size: size,
                qty: 1,
                title: product.title,
                price: product.price,
                image_url: product.image_url
            });
        } else {
            // if size not null
            if( size != null ) {
                const isProductExist = updatedCart.find(item => 
                    item.product_id == product.id && item.size == size
                );

                // if product is exist
                if( isProductExist ) {
                    // existed product qty updating
                    updatedCart = updatedCart.map(item => 
                        (item.product_id == product.id && item.size == size)
                        ? {...item, qty: item.qty + 1}
                        : item
                    )
                } else {
                    updatedCart.push({
                        id: `${product.id}-${Math.floor(Math.random() * 10000000)}`,
                        product_id: product.id,
                        size: size,
                        qty: 1,
                        title: product.title,
                        price: product.price,
                        image_url: product.image_url
                    });
                }
            } else {
                // When product size is null
                const isProductExist = updatedCart.find(item => 
                    item.product_id == product.id
                );

                // if product is exist
                if( isProductExist ) {
                    // existed product qty increasing
                    updatedCart = updatedCart.map(item => 
                        (item.product_id == product.id)
                        ? {...item, qty: item.qty + 1}
                        : item
                    )
                } else {
                    updatedCart.push({
                        id: `${product.id}-${Math.floor(Math.random() * 10000000)}`,
                        product_id: product.id,
                        size: size,
                        qty: 1,
                        title: product.title,
                        price: product.price,
                        image_url: product.image_url
                    });
                }
            }
        }

        setCartData(updatedCart);
        localStorage.setItem('cart',JSON.stringify(updatedCart));
    }

    // Price calculations
        const shipping = () => {
            let shippingCharge = 0;
            cartData.map(item => {
                shippingCharge += item.qty * shippingCost
            });
            return shippingCharge;
        }
        const subTotal = () => {
            let subtotal = 0;

            cartData.map(item => {
                subtotal += item.qty * item.price
            });

            return subtotal;
        }
        const grandTotal = () => {

            return shipping() + subTotal();

        }
        
        // update cart item
        const updateCartItem = (itemId, newQty) => {
            let updatedCart = [ ...cartData ];
            updatedCart = updatedCart.map(item => 
                (item.id == itemId) ? {...item, qty: newQty} 
                                    : item
            )

            setCartData(updatedCart);
            localStorage.setItem('cart',JSON.stringify(updatedCart));
        }
        // delete cart item
        const deleteCartItem = (itemId) => {
            const newCartData = cartData.filter(item => item.id != itemId);
            setCartData(newCartData);
            localStorage.setItem('cart',JSON.stringify(newCartData));
        }
        // get cart total item quantity
        const getCartQty = () => {
            let qty = 0;
            cartData.map(item => {
                qty += parseInt(item.qty)
            });
            return qty;
        }

    useEffect(() => {
        fetch(`${apiUrl}/get-shipping-front`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        }).then(res => res.json())
            .then(result => {
                if (result.status == 200) {
                    setShippingCost(result.data.shipping_charge);
                } else {
                    setShippingCost(0);
                }
            });
    });

    return (
        <CartContext.Provider value={{ addToCart, cartData, shipping, subTotal, grandTotal, updateCartItem, deleteCartItem, getCartQty}}> 
            {children}
        </CartContext.Provider>
    )
}