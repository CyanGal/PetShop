import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Table, Image, Form } from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from '../../UserContext';
import './CartStyles.css';

const CartList = () => { 
  const [cart, setCart] = useState([]);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [totalPriceP, setTotalPriceP] = useState(0);
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
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
  }, [userInfo, setUserInfo]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cart', {
          params: {
            userId: userInfo.id
          }
        });
        console.log(response.data);
        let totalPrice = 0;
        response.data.forEach(cartItem => {
          cartItem.cartItems.forEach(item => {
            totalPrice += item.totalPrice;
          });
        });
        setCart(response.data);
        setTotalPriceP(totalPrice);
      } catch (error) {
        console.log("Error fetching cart items:", error);
      }
    };
    getData();
  }, [userInfo.id]);

  const handleIncrement = async (productId) => {
    try {
      await axios.post('http://localhost:5000/addCart', {
        userId: userInfo.id,
        productId: productId,
        quantity: 1
      });
      const response = await axios.get('http://localhost:5000/cart', {
        params: {
          userId: userInfo.id
        }
      });
      let totalPrice = 0;
      response.data.forEach(cartItem => {
        cartItem.cartItems.forEach(item => {
          totalPrice += item.totalPrice;
        });
      });
      setCart(response.data);
      setTotalPriceP(totalPrice);
    } catch (error) {
      console.log('Error incrementing quantity:', error);
    }
  };

  const handleDecrement = async (productId) => {
    try {
      await axios.post('http://localhost:5000/addCart', {
        userId: userInfo.id,
        productId: productId,
        quantity: -1
      });

      const response = await axios.get('http://localhost:5000/cart', {
        params: {
          userId: userInfo.id
        }
      });

      let totalPrice = 0;
      response.data.forEach(cartItem => {
        cartItem.cartItems.forEach(item => {
          totalPrice += item.totalPrice;
        });
      });

      setCart(response.data);
      setTotalPriceP(totalPrice);
    } catch (error) {
      console.log('Error decrementing quantity:', error);
    }
  };

  // Order
  const handleCheckout = async (e) => {
    e.preventDefault();
    try {
      const cartItems = cart.flatMap(cartItem => cartItem.cartItems);
      await axios.post('http://localhost:5000/createOrder', {
        userId: userInfo.id,
        cartItems: cartItems,
        total: totalPriceP,
        shippingAddress: address
      });
      setAddress("");
      setMessage("Order created successfully");
      console.log("Ok");
    } catch (error) {
      console.log('Error creating order:', error);
    }
  };
  return (
    <Container>
      <h1>Cart List</h1>
      <Row>
        <Col>
          <Table striped bordered hover className='product-table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((cartItem, index) => (
                cartItem.cartItems.map((element) => (
                  <tr key={element._id}>
                    <td>{element.product?.card_name}</td>
                    <td className='w-50'>
                      <Image
                        src={`http://localhost:5000/images/${element.product?.card_image}`}
                        alt='Uploaded'
                        rounded
                        className='img-fluid w-25 h-25'
                      />
                    </td>
                    <td>{element.product?.price}$</td>
                    <td>
                      <Button variant="outline-dark" onClick={() => handleDecrement(element.product._id)}>-</Button>
                      &nbsp; {element.quantity} &nbsp;
                      <Button variant="outline-dark" onClick={() => handleIncrement(element.product._id)}>+</Button>
                    </td>
                    <td>{element.totalPrice}$</td>
                  </tr>
                ))
              ))}
              <tr>
                <td colSpan={2}>Total price</td>
                <td colSpan={3} className='text-end'>{totalPriceP} $</td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col>
          <div className="text-rightTable">
            {/* <Form > */}
            <Form.Group className="mb-3" controlId="addAdress">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" name="shippingAddress" onChange={(e) => setAddress(e.target.value)} />
            </Form.Group>
            <Button variant="primary" onClick={handleCheckout} className='checkout-button'>
              Checkout
            </Button>
            {/* </Form> */}

          </div>
          {message}
        </Col>
      </Row>
      
      {/* <h2>Menyra e dyte</h2>
      <div className='cart-list'>

        {cart.map((item, index) => (
          item.cartItems.map((element) => (
            <div key={index} className='item-box'>
              <div className='item-details'>
                <Container>
                  <Row className='mb-2 align-items-center'>
                    <Col xs='10' className='pr-0'>
                      <div className='d-flex align-items-center'>
                        <img
                          className='item-image mr-2 w-50 h-50'
                          src={`http://localhost:5000/images/${element.product?.card_image}`} />

                        <Link
                          to={`/product/$${element.product?._id}`}
                          className='item-link one-line-ellipsis'
                        // onClick={handleProductClick}
                        >
                          <h2 className='item-name one-line-ellipsis'>
                            {element.product?.card_name}
                          </h2>
                        </Link>
                      </div>
                    </Col>
                    <Col xs='2' className='text-right'>
                      <Button
                        borderless
                        variant='empty'
                        ariaLabel={`remove ${element.product?.card_name} from cart`}
                        icon={<i className='icon-trash' aria-hidden='true' />}
                      // onClick={() => handleRemoveFromCart(item)}
                      />
                    </Col>
                  </Row>
                  <Row className='mb-2 align-items-center'>
                    <Col xs='9'>
                      <p className='item-label'>price</p>
                    </Col>
                    <Col xs='3' className='text-right'>
                      <p className='value price'>{` $${element.totalPrice}`}</p>
                    </Col>
                  </Row>
                  <Row className='mb-2 align-items-center'>
                    <Col xs='9'>
                      <p className='item-label'>quantity</p>
                    </Col>
                    <Col xs='3' className='text-right'>
                      <p className='value quantity'>{` ${element.quantity}`}</p>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          ))
        ))}
      </div> */}
    </Container>
  );
};

export default CartList;
