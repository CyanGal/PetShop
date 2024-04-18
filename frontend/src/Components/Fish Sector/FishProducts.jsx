import React from 'react'
import Sidebar from '../SideBar/Sidebar'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../About/About.css';


const FishProducts = ({_id, card_name, card_description, card_image}) => {

  const PathFile = "http://localhost:5000/Images/";

  return (
    <>
    <Sidebar></Sidebar>
   
          <Card className="aboutcard">
            <Card.Img variant="top" src={PathFile + card_image}  className='imgProductCards'/>
            <Card.Body>
              <Card.Title>{card_name}</Card.Title>
              <Card.Text>{card_description}</Card.Text>
              <Button variant="outline-dark" disabled>
              <a href="/cart" ><FontAwesomeIcon icon={faShoppingCart} style={{color: "brown"}} /></a> 50 $</Button>
        &nbsp;
        <Button variant="outline-dark" className='viewmoreButton' >
        <Link className="text-dark text-decoration-none" to={`/product/${_id}`}>View More</Link>
        </Button>
            </Card.Body>
          </Card>

           <Card className="aboutcard">
            <Card.Img variant="top" src={PathFile + card_image}  className='imgProductCards'/>
            <Card.Body>
              <Card.Title>{card_name}</Card.Title>
              <Button variant="outline-dark" disabled>
              <a href="/cart" ><FontAwesomeIcon icon={faShoppingCart} style={{color: "brown"}} /></a>50 $</Button>
              &nbsp;
              <Button variant="outline-dark" className='viewmoreButton'>
                <Link className="text-dark text-decoration-none" to={`/product/${_id}`}>View More</Link>
              </Button>
            </Card.Body>
          </Card>

    </>
  )
}

export default FishProducts