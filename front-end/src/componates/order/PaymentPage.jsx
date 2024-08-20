import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cart, setCart] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer le panier de l'utilisateur via l'API getCart
    fetch('https://game-heaven-back-end.onrender.com/getcart')
      .then(response => response.json())
      .then(data => setCart(data))
      .catch(error => console.error('Erreur lors de la récupération du panier:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Réinitialiser l'erreur avant l'envoi
    
    const orderDetails = {
      name,
      address,
      paymentMethod,
      cart, // Inclure les détails du panier
    };

    // Envoyer les informations au backend pour les traiter
    fetch('https://game-heaven-back-end.onrender.com/sendOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Commande envoyée avec succès:', data);
      // Redirection après soumission réussie
      navigate('/orderconfirme');
    })
    .catch(error => {
      console.error('Erreur lors de l\'envoi de la commande:', error);
      setError('Une erreur est survenue lors de la soumission de la commande.');
    });
  };

  return (
    <div className="payment-page">
      <h2>Informations de Paiement</h2>
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label htmlFor="name">Nom Complet</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Adresse de Livraison</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Méthode de Paiement</label>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                value="delivery"
                checked={paymentMethod === 'delivery'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              />
              Paiement à la livraison
            </label>
            <label>
              <input
                type="radio"
                value="remote"
                checked={paymentMethod === 'remote'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              />
              Paiement à distance
            </label>
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">Payer Maintenant</button>
      </form>
    </div>
  );
};

export default PaymentPage;
