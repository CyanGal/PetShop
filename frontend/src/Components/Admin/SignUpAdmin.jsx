import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import "./SignUpAdmin.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from "../../UserContext";


// SIGN UP FUNCTION
const SignUpAdmin = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAdminInfo } = useContext(UserContext);

  const handleToggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      await handleSubmitSignUp();
    } else {
      await handleSubmitLogIn();
    }
  };

  const handleSubmitSignUp = async () => {
    const adminData = {
      userName: username, 
      email: email,
      password: password
    };
    try {
      const response = await axios.post("http://localhost:5000/adminRegister", adminData);
      console.log(response.data);
      window.alert("Please log in to continue to our site")
    } catch (error) {
      console.error("Operation failed", error);

    }
  };

  //LOG IN FUNCTION

  const handleSubmitLogIn = async () => { 
    const Admin = {
      email: email,
      password: password
    };
    console.log(Admin)
    await axios.post('http://localhost:5000/adminLogin', Admin, {
      withCredentials: true

    })
      .then((res) => {
        const AdminInfo = res.data;
        console.log(AdminInfo);
        setAdminInfo(AdminInfo);
        navigate('/create_product')
      })
      .catch(err => {
        console.log("Admin not login", err);
      });
  };



  return (
    <div className='adminbackground'>
      <div className='signupadmin'>
        <Form onSubmit={handleSubmit}>
          <h3>{isSignUp ? 'Sign Up' : 'Log In'}</h3>

          {isSignUp && (
            <Col>
              <Form.Label>Username</Form.Label>
              <Form.Control placeholder="Enter username" required onChange={(e) => setUsername(e.target.value)} value={username} />
            </Col>
          )}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email address" required onChange={(e) => setEmail(e.target.value)} value={email} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" required onChange={(e) => setPassword(e.target.value)} value={password} />
          </Form.Group>


          <Button variant="outline-dark" type="submit">{isSignUp ? 'Sign Up' : 'Log In'}</Button>


          <p onClick={handleToggleMode} className="toggle-mode-link">
            {isSignUp ? 'Already have an account? Switch to Log In' : 'Don\'t have an account? Switch to Sign Up'}
          </p>
        </Form>
      </div>
    </div>

  );
};

export default SignUpAdmin;
