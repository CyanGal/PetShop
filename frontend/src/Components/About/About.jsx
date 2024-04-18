import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Cardd from "./Cardd";
import CreateCard from "./CreateCard";
import axios from "axios";
import "./About.css";

const About = () => {
  //SAVES ALL THE INFORMATION OF THE DATABASE
  const [cardds, setCardds] = useState([])
  useEffect(() => {
    const getDate = async () => {
      await axios.get("http://localhost:5000/readAll")
        .then((res) => {
          console.log(res.data)
          setCardds(res.data)
        })
        .catch(err => {
          console.log("date not showed " + err)
        })
    }
    getDate()
  }, [])
  return (
    <Container className="my-5 About">
      <h1>Available Products</h1>
      <Row>
        {cardds.map((cardd, index) => {
          return (
            <Col xs={12} md={6} lg={4} className="mt-5" key={index}>
              <Cardd {...cardd} />
            </Col>
          )
        })

        }
      </Row>
    </Container>
  );
};

export default About;


  
