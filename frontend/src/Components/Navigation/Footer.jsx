import React from 'react'
import { Container } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import "./Footer.css";
import shopLogo from '../Images/logo-provizore.jpg';

const Footer = () => {
  return (
    <div>
      {/*FOOTER LOGO */}
      <div className='footer-styles'> 
        <Container fluid className="text-light shop-footer" style={{backgroundColor:'#30210d'}}>
            <footer>
          <div className="parent">
    <div className="child1">
    <img src={shopLogo} alt="Purrfect Pets Logo" className='shop-logo' />
    <h3 id='brand-title'><span>Purrfect</span>Pets</h3>
         </div>

    {/*FOOTER CONTACT FORM */}

    <div className="child2">
        <h3 id='footer-headers'>Get in Touch</h3>
        <ul>
            <li> <i className="fa-brands fa-whatsapp" style={{color: "white"}}>  +44 567 4677</i></li>
            <li><i className="fa-solid fa-at" style={{color: "white"}}>purrfectpets32@gmail.com</i></li>
            <li><i className="fa-solid fa-globe" style={{color: "white"}}>www.purrfectpets.com</i></li>
        </ul>
    </div>

    {/*FOOTER SOCIAL MEDIA AND REGISTER BUTTON FOR CLIENTS */}
    <div className="child3">
        <h3 id='footer-headers'>Follow us</h3>
       
           <div className='icon-row'>
            <p> <a className="fa-brands fa-instagram" style={{color: "white", textDecoration:"none"}} href="https://www.instagram.com/" target='_blank' ></a></p>
            <p> <a className="fa-brands fa-facebook" style={{color: "white", textDecoration:"none"}} href="https://www.facebook.com/" target='_blank'></a></p>
            <p> <a className="fa-brands fa-tiktok" style={{ color: "white", textDecoration:"none"}} href='https://www.tiktok.com/' target='_blank'></a></p>
            </div>  
            <Link to="/register">
            <Button variant="outline-light" className="register-button" >Register Now</Button>
          </Link>    
    </div>

    {/*FOOTER TERMS & CONDITIONS */}
    <div className="terms">
        <p> <a href='/conditions' style={{color: 'beige', textDecoration:'none'}}>Terms & Conditions</a>| 
            <a href='/privacypolicy' style={{color: 'beige', textDecoration:'none'}}> Privacy Policy</a> | Copyright 2013 - 2023 Purrfect Pets</p>
    </div>
    </div>
            </footer>
        </Container>
    </div> 
    </div>
  ) 
}

export default Footer