import React , {useState, useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap";
import About from "./About";
import axios from "axios";

const AboutCards = () => {
  //SAVES ALL THE INFORMATION OF THE DATABASE
  const [cards, setCards]= useState([])
  useEffect(()=>{
     const getDate = async()=>{
      await axios.get("http://localhost:5000/readAll")
      .then((res)=>{
        console.log(res.data)
        setCards(res.data)
      })
      .catch(err=>{
        console.log("date not showed "+err)
      })
     }
     getDate()
  },[])
  return (
    <Container className="my-5">
      <h1>Products page</h1>
      <Row>
        {cards.map((card, index)=>{
          return(
            <Col xs={12} md={6} lg={4} className="mt-5" key={index}>
          <About {...card} />
        </Col>
          )
        })

        }
      </Row>
    </Container>
  );
};

export default AboutCards;