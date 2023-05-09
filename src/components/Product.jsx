import React from 'react'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const Product = ({productInfo}) => {
    const p = productInfo
    return (
        // <div className="card" style={{width: '18rem'}}>
        //         <img src={p.image} className="card-img-top" alt="..." />
        //         <div className="card-body">
        //             <h5 className="card-title">{ p.title }</h5>
        //             <h6 className="card-subtitle">{ p.department }</h6>
        //             <p className="card-text">{ p.description }</p>
        //             <button href={ p.amazon_link } className="btn btn-primary">Amazon Link</button>
        //         </div>
        //     </div>
        <Card>
            <CardActionArea>
                <CardMedia component="img" image={p.image} alt='product image'/>
                <CardContent className='card-content'>
                    <Typography gutterBottom variant="h5" component="div">
                        {p.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        ${p.price}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )

}
export default Product;