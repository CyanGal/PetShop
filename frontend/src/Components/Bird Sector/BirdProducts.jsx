import React from 'react'
import Sidebar from '../SideBar/Sidebar'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Row, Col } from "react-bootstrap";
import '../About/About.css';
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


const BirdProducts = ({_id, card_name, card_description, card_image}) => {

  const PathFile = "http://localhost:5000/Images/";

  return (
    <>
    <Sidebar></Sidebar>

    <Row>
    <Col xs={12} md={6} lg={4}> 
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
    </Col>
    <Col xs={12} md={6} lg={4}>
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
    </Col>
   </Row>
    </>
  )
}

export default BirdProducts