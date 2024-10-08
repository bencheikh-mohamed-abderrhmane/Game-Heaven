import React, { useState } from 'react';
import './addproduct.css';
import upload_area from '../../assets/upload-zone.png';

function Addproduct(props) {
    const [image, setImage] = useState(null);

    const imagehandler = (e) => {
        setImage(e.target.files[0]);
    };

    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "default",
        new_price: "",
        old_price: ""
    });

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const Add_product = async () => {
        if (productDetails.category === "default") {
            alert("Please select a valid product category.");
            return;
        }

        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image);

        await fetch('https://game-heaven-back-end.onrender.com/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        })
        .then((resp) => resp.json())
        .then((data) => { responseData = data; });

        if (responseData.success) {
            product.image = responseData.image_url;
            console.log(product);

            // Save product to the database
            await fetch('https://game-heaven-back-end.onrender.com/addproduct', {
                method: 'POST',
                headers: {
                    Accept:'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Product Added"):alert("Failed to add product")
            })
        }
    };

    return (
        <div className='addproduct'>
            <div className="addproduct-itemfield">
                <p>Product Title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Type here' />
                    <p>Offer Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Type here' />
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                    <option value="default">Please select a category</option>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Image</p>
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} alt="" className='addprodcut-thmnail-img' />
                </label>
                <input onChange={imagehandler} type="file" name='image' id='file-input' hidden />
            </div>
            <button onClick={Add_product} className='addproduct-btn'>Add</button>
        </div>
    );
}

export default Addproduct;
