import React, { useState } from 'react';
import './newsletter.css';

function Newsletter(props) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const validateEmail = (email) => {
        // Validation simple de l'email sans regex
        return email.includes('@') && email.includes('.');
    };

    const handleSubmit = () => {
        if (email.trim() === '') {
            alert('Please enter your email.');
        } else if (!validateEmail(email)) {
            alert('Please enter a valid email.');
        } else {
            setMessage('You will be updated');
            setEmail("");
        }
    };

    return (
        <div className='newsletter'>
            <h1>Get Exclusive Offers On Your Email</h1>
            <p>Subscribe to our newsletter and stay updated</p>
            <div>
                <input 
                    type="email" 
                    placeholder='Your Email ID' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
                <button onClick={handleSubmit}>Subscribe</button>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Newsletter;
