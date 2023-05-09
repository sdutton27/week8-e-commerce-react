import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import Product from '../components/Product'

import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const SingleProduct = ({user}) => {
    const { productId } = useParams()
    const [product, setProduct] = useState({})
    const [inCart, setInCart] = useState('') // we will mount this
    //const [inCart, setInCart] = useState(!isItemInCart?'Add to cart':'Remove from cart')

    const getProductInfo = async () => {
        const url = `http://127.0.0.1:5000/api/products/${productId}`
        const res = await fetch(url);
        const data = await res.json();
        console.log(data) // for now
        if (data.status === 'ok'){
            setProduct(data.product)
        }     
    }

    const isItemInCart = async () => {
        // this was me trying to do a backend api check using React... did not work!
        // console.log(user.products)
        // if (user.products) {
        //     console.log('testing')
        //     for (let i=0; i < user.products.length; i++) {
        //         if (user.products[i]['id'].toString() === productId) {
        //             console.log('the item is in the cart!!!!!')
        //             setInCart('Remove from cart') // the item is in the cart so this is what the button should say
        //             return
        //             //return true
        //         }
        //     }
        // }
        // console.log('the item is not in the cart')
        // setInCart('Add to cart') // since the button has not yet been added
        // //return false
        const url = `http://127.0.0.1:5000/api/item-in-cart/${productId}`
        const options = {
            method: "GET", // since we are getting information
            headers: {
                Authorization: `Bearer ${user.apitoken}`
            }
        }
        const res = await fetch(url, options);
        const data = await res.json();
        console.log(data)
        if (data.status === 'ok') {
            if (data.in_cart === 'true') { // the item is in the cart
                setInCart('Remove from cart')
            } else { // the item is not in the cart
                setInCart('Add to cart')
            }
        }
    }

    const handleChangeInCart = async (e) => {
        e.preventDefault()
        console.log('hi')
        // Adding item to cart
        if (inCart === 'Add to cart') {
            addItemToCart()        
        } else { // removing item from cart
            removeItemFromCart()
        }
    }

    const addItemToCart = async () => {
        const url = `http://127.0.0.1:5000/api/add-to-cart/${productId}`
            const options = {
                method: "POST", // since we are adding a connection
                headers: {
                    Authorization: `Bearer ${user.apitoken}`
                }
            }
            console.log(user)
            console.log(options)
            const res = await fetch(url, options);
            const data = await res.json();
            console.log(`DATA IS ${data}`) // for now
            if (data.status === 'ok'){
                setInCart('Remove from cart') // set value for button
            }
    }

    const removeItemFromCart = async () => {
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
                setInCart('Add to cart') // set value for button
            }
    }

    useEffect(()=>{
        getProductInfo() // on Mount
        isItemInCart() // also on Mount

        //eslint-disable-next-line
    },[])

    return (
        <div className="outer-div-products" align="center">
            <div className="single-product-page-body" align="center">
                <Product productInfo={product}></Product>
                <div className="single-product-info">
                    <h6><b>Description:</b></h6>
                    {/* <h6>{product.description.split('","').slice(1, -1)}</h6> */}
                    <ul>
                    {product.description ? 
                    product.description.split('","').slice(1, -1).map((listItem, i)=><li key={i}>{listItem}</li>)
                    : <></>}
                    </ul>
                    <h6><b>Department:</b> {product.department}</h6>
                    <h6><b>Rating:</b>
                    <Rating name="read-only" value={Number(product.rating)} precision={0.1} readOnly />
                    ({product.rating})
                    </h6>
                    </div>
                    <div className="single-prod-price-container">
                        <h5><b>Price:</b> ${product.price}</h5>
                    { !user.id ? // checks if the user is logged in
                        <>
                        <br/>
                        <p><Link className="single-prod-link" to={'/login'}>Log in</Link> or <Link className="single-prod-link" to={'/signup'}>Sign up</Link> to add this item to your cart</p>
                        </>
                    // : <button onClick={handleChangeInCart}>{inCart}</button>
                    :    <Button variant="contained" endIcon={(inCart === 'Add to cart')?<AddShoppingCartIcon/>:<RemoveShoppingCartIcon/>} 
                            color={(inCart === 'Add to cart')? "primary":"error"} 
                            onClick={handleChangeInCart}>{inCart} 
                        </Button>
                    }
                    
                    <Link className="single-prod-link" to={'/products'}>Back to products page</Link>
                    
                    </div>
            </div>
        </div>
    )
}

export default SingleProduct;