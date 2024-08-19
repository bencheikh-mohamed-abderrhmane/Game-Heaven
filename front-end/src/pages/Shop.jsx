import React from 'react';
import Hero from '../componates/hero/Hero';
import Popular from '../componates/popular/Popular';
import Offers from '../componates/offers/Offers';
import Newcollections from '../componates/newcollections/Newcollections';
import Newsletter from '../componates/newaletter/Newsletter';

function Shop(props) {
    return (
        <div>
            <Hero/>
            <Popular/>
            <Offers/>
            <Newcollections/>
            <Newsletter/>
        </div>
    );
}

export default Shop;