import React from 'react';
import './admin.css'
import Slidebar from '../../componates/slidebar/Slidebar';
import{Routes,Route} from 'react-router-dom'
import Addproduct from '../../componates/addproducts/Addproduct';
import Listproduct from '../../componates/listproducts/Listproduct';
import Orderlist from '../../componates/orderlist/Orderlist';


function Admin(props) {
    return (
        <div className='admin'>
            <Slidebar/>
            <Routes>
            <Route path='/addproduct' element={<Addproduct/>}/>
            <Route path='/listproduct' element={<Listproduct/>}/>
            <Route path='/order' element={<Orderlist />}/>
           
            </Routes>
            
        </div>
    );
}

export default Admin;