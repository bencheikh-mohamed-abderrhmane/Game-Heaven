import React, { useContext, useState, useEffect } from 'react';
import './css/Shopcategory.css';
import { Shopcontext } from '../context/Shopcontext';
import Item from '../componates/items/Item';
import dropdown_icon from '../componates/assets/dropdown.png';

function Shopcategory(props) {
    const { all_product } = useContext(Shopcontext);
    const [visibleItems, setVisibleItems] = useState(15);
    const [sortOrder, setSortOrder] = useState('asc');

    // Filtrer les produits par catégorie
    const filteredProducts = all_product.filter(item => item.category === props.category);

    // Trier les produits en fonction de l'ordre de tri
    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.new_price - b.new_price;
        } else {
            return b.new_price - a.new_price;
        }
    });

    // Fonction pour charger plus d'éléments
    const loadMoreItems = (event) => {
        event.preventDefault();
        setVisibleItems(prevVisibleItems => {
            const newVisibleItems = prevVisibleItems + 12;
            window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
            return newVisibleItems;
        });
    };
    
    // Fonction pour changer l'ordre de tri
    const toggleSortOrder = () => {
        setSortOrder(prevSortOrder => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    };

    // Intégration de Tawk.to
    useEffect(() => {
        var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        (function() {
            var s1 = document.createElement("script"),
                s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/66c5b0ddea492f34bc087454/1i5q3loq8';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
        })();
    }, []);

    return (
        <div className='shop-category'>
            <img className="banner-img" src={props.banner} alt="" />
            <div className="shopcategory-indexsort">
                <p>
                    <span>showing 1-{Math.min(visibleItems, sortedProducts.length)}</span> out of {sortedProducts.length} products
                </p>
                <div className="shopcategory-sort" onClick={toggleSortOrder}>
                    Sort by: {sortOrder === 'asc' ? 'Price: Low to High' : 'Price: High to Low'} 
                    <img className='dropdown' src={dropdown_icon} alt="" />
                </div>
            </div>
            <div className="shopcategory-products">
                {sortedProducts.slice(0, visibleItems).map((item, i) => (
                    <Item
                        key={i}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price}
                    />
                ))}
            </div>
            {visibleItems < sortedProducts.length && (
                <div className="shopcategory-loadmore" onClick={loadMoreItems}>
                    Explore more
                </div>
            )}
        </div>
    );
}

export default Shopcategory;
