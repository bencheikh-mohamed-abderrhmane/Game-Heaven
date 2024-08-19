import React, { useContext } from 'react';
import { Shopcontext } from '../context/Shopcontext'
import Breadcrums from '../componates/breadcrums/Breadcrums';
import { useParams } from 'react-router-dom'
import Productdisplay from '../componates/productdisplay/Productdisplay';
import Descriptionbox from '../componates/Descriptionbox/Descriptionbox';
import Reelatedproduct from '../componates/Relatedproduct/Reelatedproduct';
function Product(props) {
    const {all_product} = useContext(Shopcontext)
    const {productid}= useParams();
    const product = all_product.find((e)=> e.id === Number(productid))
    console.log(productid)
    return (
        <div>

            <Breadcrums product={product}/>
            <Productdisplay product={product}/>
            <Descriptionbox/>
            <Reelatedproduct/>
        </div>
    );
}

export default Product;















