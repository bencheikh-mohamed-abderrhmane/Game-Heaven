import React, { useState } from 'react';
import './css/loginsignup.css';

function Loginsignup(props) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    });

    const [isChecked, setIsChecked] = useState(false); // Nouvel état pour la case à cocher
    const [error, setError] = useState(""); // Nouvel état pour l'affichage des erreurs

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const checkboxHandler = (e) => {
        setIsChecked(e.target.checked);
    };

    const login = async () => {
        console.log("login function executed", formData);
        let responseData;
        await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((data) => responseData = data);

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        } else {
            alert(responseData.errors);
        }
    };

    const signup = async () => {
        console.log("sign up function executed", formData);
        let responseData;
        await fetch('http://localhost:4000/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then((response) => response.json())
        .then((data) => responseData = data);

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        } else {
            alert(responseData.errors);
        }
    };

    const handleSubmit = () => {
        if (!isChecked) {
            setError("You must agree to the terms and conditions to continue.");
        } else {
            setError("");
            if (state === "Login") {
                login();
            } else {
                signup();
            }
        }
    };

    const [state, setState] = useState("Login");

    return (
        <div className='loginsignup'>
            <div className='loginsignup-container'>
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                   {state === "Sign Up" ? (
                       <input
                           className='name'
                           name='username'
                           value={formData.username}
                           onChange={changeHandler}
                           type="text"
                           placeholder='Your Name'
                       />
                   ) : null}
                    <input
                        className='email'
                        name='email'
                        value={formData.email}
                        onChange={changeHandler}
                        type="email"
                        placeholder='Email Address'
                    />
                    <input
                        className='password'
                        type="password"
                        name='password'
                        value={formData.password}
                        onChange={changeHandler}
                        placeholder='Password'
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button
                    onClick={handleSubmit}
                    className="continue-button"
                >
                    Continue
                </button>
                {state === "Sign Up" ? (
                    <p className='loginsignup-login'>
                        Already have an account?
                        <span onClick={() => setState("Login")}>Login</span>
                    </p>
                ) : (
                    <p className='loginsignup-login'>
                        Create an account?
                        <span onClick={() => setState("Sign Up")}>Click here</span>
                    </p>
                )}
                <div className="loginsignup-agree">
                    <input
                        type="checkbox"
                        name="agree"
                        id="agree"
                        checked={isChecked}
                        onChange={checkboxHandler}
                    />
                    <p>By continuing, I agree to the terms of use & privacy policy</p>
                </div>
            </div>
        </div>
    );
}

export default Loginsignup;
