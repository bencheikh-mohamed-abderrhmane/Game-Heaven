import React, { useState, useEffect } from 'react';
import './orderlist.css';

function Orderlist() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Récupérer les commandes via l'API getOrders
        fetch('http://localhost:4000/getOrders')
            .then(response => response.json())
            .then(data => setOrders(data))
            .catch(error => {
                console.error('Erreur lors de la récupération des commandes:', error);
                setError('Une erreur est survenue lors de la récupération des commandes.');
            });
    }, []);

    return (
        <div className="order-list-container">
            <h2>Liste des Commandes</h2>
            {error && <p className="error-message">{error}</p>}
            <table className="order-table">
                <thead>
                    <tr>
                        <th>ID Commande</th>
                        <th>Nom</th>
                        <th>Adresse</th>
                        <th>Méthode de Paiement</th>
                        <th>Produits</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={order.id || index}>
                            <td>{order.id}</td>
                            <td>{order.name}</td>
                            <td>{order.address}</td>
                            <td>{order.paymentMethod === 'delivery' ? 'À la livraison' : 'À distance'}</td>
                            <td>
                                <ul>
                                    {order.cart.map((item, idx) => (
                                        <li key={item.id || idx}>
                                            {item.name} (x{item.quantity}) - {item.price}€
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                {order.cart.reduce((total, item) => total + item.price * item.quantity, 0)}€
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Orderlist;
