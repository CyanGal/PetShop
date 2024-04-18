import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

const DetailCard = () => {

  const { isAdminLoggedIn } = useContext(UserContext);
  const { adminInfo, setAdminInfo } = useContext(UserContext);
  const nav = useNavigate()
  // COMPARES AND TAKES ID WITH useParams
  const { id } = useParams()
  // SAVES ALL INFO FORM THE ELEMENT WITH THE CALLED ID
  const [card, setCard] = useState({})
  useEffect(() => {
    const getDate = async () => {
      await axios.get(`http://localhost:5000/readOne/${id}`)
        .then((res) => {
          console.log(res.data)
          // SAVES INFO TO STATE
          setCard(res.data)
        })
        .catch(err => {
          console.log("date not showed " + err)
        })
    }
    getDate()
  }, [])

  // DELETE
  const deleteDate = async (id) => {
    await axios.delete(`http://localhost:5000/delete/${id}`)
      .then(() => {
        nav('/')
      })
      .catch(err => {
        console.log("data not deleted" + err)
      })
  }

  const PathFile = "http://localhost:5000/images/";
  useEffect(() => {
    if (!adminInfo.email) {
      axios
        .get("http://localhost:5000/admin/", {
          withCredentials: true,
        })
        .then((res) => {
          setAdminInfo(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    }
    // useEffect WILL BE CALLED EVERYTIME THERE'S CHANGES ON USER'S INFORMATION
  }, [adminInfo, setAdminInfo]);
  return (
    <Container className="my-5">
      <Row>
        <Col xs={12} md={6}>
          {/* imazhi */}
          {card.card_image && card.card_image !== "" && (
            <>
              <img
                src={PathFile + card.card_image}
                alt={card.card_name}
                className="img-fluid"
              />
            </>
          )}
        </Col>
        <Col xs={12} md={6}>
          {/* Infot */}
          <h1>{card.card_name}</h1>
          <p>{card.card_description}</p>
          <div class="d-grid gap-2 d-md-block">
            {adminInfo.email &&
              (card.adminCard === adminInfo.id ? (
                <>
                  <Button variant="danger" onClick={() => deleteDate(card._id)}>
                    Delete
                  </Button> &nbsp;
                  <Button variant="warning" href={`/product_update/${card._id}`}>
                    Update
                  </Button>
                </>
              ) : (
                <p></p>
              ))}
            {/* <Button variant="danger" onClick={()=>deleteDate(card._id)}>Delete</Button>
            <Button variant="warning" href={`/product_update/${card._id}`}>Update</Button> */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailCard;