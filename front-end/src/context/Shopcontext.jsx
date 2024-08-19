import React, { createContext, useEffect, useState } from "react";

export const Shopcontext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 301; index++) { // 300+1 corrected
        cart[index] = 0;
    }
    return cart;
};

const ShopcontextProvider = (props) => {
    const [all_product, setAll_product] = useState([]); // Moved inside the component
    const [cartitem, setCartitem] = useState(getDefaultCart());
    const [wishitem, setWishitem] = useState({});

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then((response) => response.json())
            .then((data) => setAll_product(data));
    
            if (localStorage.getItem('auth-token')) {
                fetch('http://localhost:4000/getcart', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({}),
                })
                .then((response) => response.json())
                .then((data) => setCartitem(data));
    
                // Fetch wishlist items if authenticated
                fetch('http://localhost:4000/getwish', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({}),
                })
                .then((response) => response.json())
                .then((data) => setWishitem(data));
            }
        },[])
    
    const getDefaultWish = (length) => {
        let wish = {};
        for (let index = 0; index < length + 1; index++) { // Initialize based on products
            wish[index] = 0;
        }
        return wish;
    };
    const addtocart = (itemid) => {
        setCartitem((prev) => ({ ...prev, [itemid]: prev[itemid] + 1 }));
        
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "itemid": itemid })
            })
            .then((response) => response.json())
            .then((data) => console.log(data));
        }
    };
    

      
    
        
    
    const addtowish = (itemid) => {
        setWishitem((prev) => {
            let updatedWishItems;
            if (prev[itemid]) {
                updatedWishItems = { ...prev, [itemid]: prev[itemid] + 1 };
            } else {
                updatedWishItems = { ...prev, [itemid]: 1 };
            }
    
            // After updating the wish item state, send a request to the backend if the user is authenticated
            if (localStorage.getItem('auth-token')) {
                fetch('http://localhost:4000/addtowish', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'auth-token': `${localStorage.getItem('auth-token')}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ itemid: itemid }),
                })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error('Error:', error));
            }
    
            return updatedWishItems;
        });
    };
    
    

    const removefromwish = (itemid) => {
        setWishitem((prev) => {
            if (prev[itemid] > 1) {
                return { ...prev, [itemid]: prev[itemid] - 1 };
            } else {
                const updatedWishItems = { ...prev };
                delete updatedWishItems[itemid];
                return updatedWishItems;
            }
        });
    
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromwish', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "itemid": itemid })
            })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error('Error:', error));
        }
    };
    



    const removefromcart = (itemid) => {
        setCartitem((prev) => ({ ...prev, [itemid]: prev[itemid] - 1 }));
        
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "itemid": itemid })
            })
            .then((response) => response.json())
            .then((data) => console.log(data));
        }
    };
    

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartitem) {
            if (cartitem[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartitem[item];
                }
            }
        }
        return totalAmount;
    };

    const getTotalItem = () => {
        let totalItem = 0;
        for (const item in cartitem) {
            if (cartitem[item] > 0) {
                totalItem += cartitem[item];
            }
        }
        return totalItem;
    };

    const contextvalue = {
        addtowish,
        removefromwish,
        getTotalItem,
        getTotalCartAmount,
        wishitem,
        all_product,
        cartitem,
        addtocart,
        removefromcart,
        setCartitem,
    };

    return (
        <Shopcontext.Provider value={contextvalue}>
            {props.children}
        </Shopcontext.Provider>
    );
};

export default ShopcontextProvider;