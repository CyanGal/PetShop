import React, { useContext, useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { UserContext } from '../../UserContext';
import './About.css';


const Cardd = ({ _id, card_name, card_description, card_image, card_category, price }) => {
  const nav = useNavigate()
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [quantity, setQuantity] = useState(1);
  const PathFile = "http://localhost:5000/Images/";

  useEffect(() => {
    if (!userInfo.email) {
      axios.get('http://localhost:5000/user/', {
        withCredentials: true,
      })
        .then(res => {
          setUserInfo(res.data);
        })
        .catch(err => {
          console.error('Error fetching user data:', err);
        });
    }
  },
    [userInfo, setUserInfo]);

  const addToCart = async () => {
    try {
      const response = await axios.post('http://localhost:5000/addCart', {
        productId: _id,
        userId: userInfo.id,
        quantity: quantity,
      });

      console.log(response.data);
      nav('/cart')
    } catch (error) {
      console.log('Error adding item to cart:', error);
    }
  };
  return (

    <div>
      <Card className='aboutcard h-100'>
        <Card.Img variant="top" src={PathFile + card_image} className='productImage'/>
        <Card.Body>
          <Card.Title>{card_name}</Card.Title>
          <Card.Title>Category Name - {card_category?.category_name}</Card.Title>
          <Card.Text>{card_description}</Card.Text>
          <Button variant="outline-dark" onClick={addToCart}>
            {/* <a href="/cart" > </a>*/} <FontAwesomeIcon icon={faShoppingCart} style={{ color: "brown" }} /> {price} $</Button>
          &nbsp;
          <Button variant="outline-dark" className='viewmoreButton' >
            <Link className="text-dark text-decoration-none" to={`/product/${_id}`}>View More</Link>
          </Button>
        </Card.Body>
      </Card>
    </div>
  )
}
export default Cardd;