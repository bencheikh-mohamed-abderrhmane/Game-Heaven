import React from 'react';
import './footer.css';
import footer_logo from '../assets/logoshop.png';
import stackoverflow from '../assets/stackoverflow.png';
import linkedin_logo from '../assets/linkedinlogo1.png';
import github_logo from '../assets/github.png';

function Footer(props) {
    return (
        <div className='footer'>
            <div className="footer-logo">
                <img src={footer_logo} alt="Shopper Logo" />
                <p>SHOPPER</p>
            </div>
            <ul className="footer-links">
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
               <a className='lien' href="https://portfolio-p574.onrender.com/"> <li>Contact</li></a>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <a href="https://stackoverflow.com/users/25101201/bencheikh-mohamed?tab=profile" target="_blank" rel="noopener noreferrer">
                        <img src={stackoverflow} alt="Stack Overflow" />
                    </a>
                </div>
                <div className="footer-icons-container">
                    <a href="https://github.com/bencheikh-mohamed-abderrhmane" target="_blank" rel="noopener noreferrer">
                        <img src={github_logo} alt="GitHub" />
                    </a>
                </div>
                <div className="footer-icons-container">
                    <a href="https://www.linkedin.com/in/mohamed-abderrahmane-bencheikh-16093a316" target="_blank" rel="noopener noreferrer">
                        <img src={linkedin_logo} alt="LinkedIn" />
                    </a>
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright © 2024 - All Rights Reserved</p>
            </div>
        </div>
    );
}

export default Footer;
