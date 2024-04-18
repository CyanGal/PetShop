import React, {useState, useContext} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'; 
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { UserContext } from '../../UserContext';
import dividerImg from '../Images/divImg.png';
import "./Register.css"; 
 
 

const Register = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [surname, setSurname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // SIGN UP FUNCTION FOR CLIENTS
  const handleSubmitSignUp = async (e) => {
    e.preventDefault()
    const newUser = {
      name:name,
      surname:surname,
      email: email,
      password: password
    };
 
      await axios.post('http://localhost:5000/signup', newUser)
        .then((res) => {
          console.log(res.data)
          window.alert("Please log in to continue to our site")
          navigate('/register')
        })
        .catch(err => { console.log("User not added" + err) })
        .catch(err => {
          console.log("Error: ", err.response);
        });
        window.alert("Password too short! Password needs to be at least 8 characters long!")
  }  

  // LOG IN FUNCTION FOR CLIENTS
  const { setUserInfo } = useContext(UserContext);
  const [email1, setEmail1] = useState("")
  const [password1, setPassword1] = useState("")
  const handleSubmitLogIn = async (e) => {
    e.preventDefault(); 
    const User = {
      email: email1,
      password: password1
    };
console.log (User)
    await axios.post('http://localhost:5000/login', User, {
      withCredentials: true

    })
      .then((res) => {
        const userInfo = res.data;
        console.log(userInfo); 
        setUserInfo(userInfo);
        navigate('/')
      })
      .catch(err => {
        console.log("User not login", err);
      });
  };

  

  return (

    <div className='register'>

    {/*SIGN UP FORM */}
    <div className='signup'>
         <Form onSubmit={handleSubmitSignUp}><h3>Sign Up</h3><Row>
        <Col>
          <Form.Label>First Name</Form.Label>
          <Form.Control placeholder="First name" required onChange={(e) => setName(e.target.value)} value={name}/>
        </Col>

        <Col>
          <Form.Label>Last Name</Form.Label>
          <Form.Control placeholder="Last name" required onChange={(e) => setSurname(e.target.value)} value={surname}/>
        </Col>
      </Row>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email address" required onChange={(e) => setEmail(e.target.value)} value={email}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)} value={password}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="I confirm that I have read, understand and accept the Terms and Conditions" />
      </Form.Group>

      <Button variant="outline-dark" type="submit">Register </Button>
    </Form>
    </div>

    <div className='divider'><img src={dividerImg} alt='Divider'/></div>

    {/*LOG IN FORM */}

    <div className='login'>
         <Form onSubmit={handleSubmitLogIn}>
      <h3>Log In</h3>
          <Form.Label>Email</Form.Label>
          <Form.Control placeholder="Enter email" required onChange={(e) => setEmail1(e.target.value)} value={email1}/>
        <Form.Group className="mb-3" controlId="Password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" required onChange={(e) => setPassword1(e.target.value)} value={password1}/>
      </Form.Group>
      <p>Your personal data will be used to process your order, to support your experience throughout this website, and for other purposes described in our privacy policy.</p>
      <Button variant="outline-dark" type="submit">Log In</Button>
          </Form>
    </div>

    </div>
  )

}

export default Register;