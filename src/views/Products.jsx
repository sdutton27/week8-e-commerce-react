import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Product from '../components/Product'

import css from '../e-commerce.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Products = ({user}) => {
    // first, our variables
    const [inputText, setInputText] = useState('') // for searching
    const [products, setProducts] = useState([]) // list of products

    useEffect(()=>{
        getProducts()
    }, [])

    const showProducts = () => {
        //return products.map((p, index)=><div> key is {index} productInfo is {p}</div>)
        
        //return products.map((p, index) => <Product key={index} productInfo={p}/>)
        //products.map(p => <Link key={p.id} to={`/products/${p.id}`}><Product productInfo={p}/></Link>)
        return products.map(p => 
            <div className = "products-pg-product">
                <Link className = 'product-link' key={p.id} to={`/products/${p.id}`}>
                    <Product productInfo={p}/>
                </Link>
            </div>)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        getProducts(inputText);
        setInputText('');
    }

    // if we eventually want the user to be able to search by multiple things
    // const handleChange = (e, func) => {
    //     func(e.target.value) 
    // }
    const handleChange = (e) => {
        setInputText(e.target.value)
    }

    const getProducts = async (product_name='') => {
        //const res = await fetch(`http://127.0.0.1:5000/api/products`)
        const res = await fetch(`http://127.0.0.1:5000/api/productsq=${product_name}`)
        const data = await res.json();
        const searchResults = data.products

        if (searchResults) {
            setProducts(searchResults) // set the list of products to be the list of products that were returned by the search
        }

    }


    return (
        <div className="outer-div-products" align="center">
            <div className="products-page-body" align="center">
                <h4 id="product-title">Our Products</h4>
                <h6 className="crossed-out-label"><span>Search for products</span></h6>
                <form className="product-search-form"onSubmit={handleSubmit}>
                    <TextField id="outlined-search" label="Product name" value={inputText} onChange={handleChange} type="search" />                    
                    <Button type="submit" variant="contained">Search</Button>
                </form>
                <h6 className="crossed-out-label"><span>Products</span></h6>
                <div className='products-table' align="center">
                    {showProducts()}
                </div>

            </div>
        </div>
    )
}
export default Products;
