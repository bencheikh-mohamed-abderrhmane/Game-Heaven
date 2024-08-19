import React from 'react';
import './breadcums.css';
import arrows_icon from '../assets/passedroitee-removebg-preview.png';

const Breadcrums = (props) => {
    const { product } = props;

    return (
        <div className='breadcums'>
            Home
            <img src={arrows_icon} alt="" />
            Shop
            <img src={arrows_icon} alt="" />
            {product?.category && (
                <>
                    {product.category}
                    <img src={arrows_icon} alt="" />
                </>
            )}
            {product?.name}
        </div>
    );
}

export default Breadcrums;
