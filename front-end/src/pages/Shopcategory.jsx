import React, { useContext, useState } from 'react';
import './css/Shopcategory.css';
import { Shopcontext } from '../context/Shopcontext';
import Item from '../componates/items/Item';
import dropdown_icon from '../componates/assets/dropdown.png';

function Shopcategory(props) {
    const { all_product } = useContext(Shopcontext);
    const [visibleItems, setVisibleItems] = useState(12); // État pour gérer le nombre d'éléments visibles
    const [sortOrder, setSortOrder] = useState('asc'); // État pour gérer l'ordre de tri (ascendant par défaut)

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
        event.preventDefault(); // Empêche le comportement par défaut, si nécessaire
        setVisibleItems(prevVisibleItems => {
            const newVisibleItems = prevVisibleItems + 12; // Augmente de 12 éléments supplémentaires
            // Faire défiler la page vers le bas de la hauteur de la fenêtre
            window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
            return newVisibleItems;
        });
    };
    
    // Fonction pour changer l'ordre de tri
    const toggleSortOrder = () => {
        setSortOrder(prevSortOrder => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    };

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
