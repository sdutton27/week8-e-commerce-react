import React, { useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Product from '../components/Product'

import Button from '@mui/material/Button';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const Cart = ({user}) => {
    const [productsInCart, setProductsInCart] = useState([]) // this will be updated on mount
    const [total, setTotal] = useState(0.00) // this will also be updated on mount
    // useEffect(()=>{
    //     getProductsInCart()
    //     //getTotal() this is in getProductsInCart so it has to wait
    // },[])
    const navigate = useNavigate()

    const showProductsInCart = () => {
        if (productsInCart) {
            return productsInCart.map(p => <div className='cart-item-container'><Link key={p.id} to={`/products/${p.id}`}>
                <Product productInfo={p}/></Link>
                {/* <button onClick={()=>{removeItemFromCart(p.id)}}>
                
                    Remove from cart</button></div> */}
                <Button variant="contained" style={{marginRight:'10px', fontSize:'8px', boxShadow:'1px 1px 1px black'}} endIcon={<RemoveShoppingCartIcon/>} 
                    color="error" 
                    onClick={()=>{removeItemFromCart(p.id)}}>Remove from cart 
                </Button>
                </div>
                )
        }
        
    }

    const getProductsInCart = async () => {
        const url = `http://127.0.0.1:5000/api/cart`
        const options = {
            method: "GET", // since we are just getting the data
            headers: {
                Authorization: `Bearer ${user.apitoken}`
            }
        }
        const res = await fetch(url, options);
        const data = await res.json();
        const itemsInCart = data.products_in_cart // this is snake case because it is from the JSON

        if (itemsInCart) {
            setProductsInCart(itemsInCart)
            getTotal(itemsInCart)
        }
    }

    useEffect(()=>{
        if (!user.apitoken) {
            navigate('/')
        }

        getProductsInCart()
        //getTotal() this is in getProductsInCart so it has to wait
        
        //eslint-disable-next-line
    },[])

    const emptyCart = async () => {
        const url = `http://127.0.0.1:5000/api/empty-cart`
        const options = {
            method: "DELETE", // since we are just getting the data
            headers: {
                Authorization: `Bearer ${user.apitoken}`
            }
        }
        const res = await fetch(url, options);
        const data = await res.json();
        if (data.status === 'ok') {
            setProductsInCart([]) // reset to nothing, this isn't entirely necessary?
        }
    }

    const removeItemFromCart = async (productId) => {
        const url = `http://127.0.0.1:5000/api/remove-from-cart/${productId}`
            const options = {
                method: "DELETE", // since we are adding a connection
                headers: {
                    Authorization: `Bearer ${user.apitoken}`
                }
            }
            const res = await fetch(url, options);
            const data = await res.json();
            if (data.status === 'ok'){
                console.log('item removed from cart')
                getProductsInCart() // reset the cart
                //getTotal() //reset the total
                //setInCart('Add to cart') // set value for button
            }
    }

    const getTotal = (itemsInCart) => {
        let temp = 0.00;
        console.log('getting total')
        // using itemsInCart instead of productsInCart because passing in as a 
        // parameter ensures this method gets the proper, updated value
        if (itemsInCart !== []) {
            console.log('there are items in the cart')
            for (let i=0; i < itemsInCart.length; i++) {
                console.log(Number(itemsInCart[i]['price']))
                temp += Number(itemsInCart[i]['price'])
            }
        } else {
            console.log('no items in cart')
        }
        setTotal(temp.toFixed(2))
        console.log(productsInCart)
    }




    return (
        <div className="outer-div-products" align="center">
            <div className="cart-page-body" align="center">
                <h1 id="cart-title">Cart</h1>
                { (productsInCart.length > 0) ?
                <>
                <div className='cart-items'>
                    {showProductsInCart()}
                </div>
                <Button variant="contained" style={{boxShadow:'1px 1px 1px black'}} endIcon={<RemoveShoppingCartIcon/>} 
                    color="error" 
                    onClick={emptyCart}>Remove all items from cart 
                </Button>
                <h4>Total Cost: ${total}</h4>
                </>
                : <><h6>Your cart is empty.</h6>
                    <Link className="product-link" to="/products">Go shopping</Link></> 
                }
           </div> 
        </div>
    )
}
export default Cart;