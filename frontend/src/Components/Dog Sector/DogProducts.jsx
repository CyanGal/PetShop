import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../SideBar/Sidebar';
import { Row, Col } from "react-bootstrap";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../About/About.css';
import { useParams } from 'react-router-dom'
import Cardd from '../About/Cardd';

const DogProducts = () => {
  const { slug } = useParams()
  const [dogProducts, setDogProducts] = useState([]);

  useEffect(() => {
    // Fetch dog products from the server when the component mounts
    const fetchDogProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/readAll');
        setDogProducts(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching dog products:', error);
      }
    };

    fetchDogProducts();
  }, []);
  return (
    <>
      <Sidebar></Sidebar>
    <Row>
        {dogProducts.filter(product => product.card_category.category_name === slug).map((product) => (
       <Col xs={12} md={6} lg={4}>
          <Cardd {...product} className="aboutcard"/>
       </Col>
        ))}
    </Row>
    </>
  );
};

export default DogProducts;