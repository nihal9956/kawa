import React, { useEffect, useState } from "react";
import JUMBO_CARD from "./JUMBO_CARD";
import axios from "axios";
import "./Cards.css";
import { Card, Container, Row, Col } from "react-bootstrap";

function Cards() {
  const [user_details, setUser_details] = useState([]);
  const [userPhoto, setUserPhoto] = useState("");
  const [userName, setUserName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userGender, setUserGender] = useState("");
  const [activeCard, setActiveCard] = useState("");

  useEffect(() => {
    (async () => {
      const userDetails = await axios.get(
        "https://randomuser.me/api/?inc=gender,name,nat,location,picture,email&results=20"
      );
      setUser_details(userDetails.data.results);
    })();
  }, []);

  function getUser(id, user_Picture, user_name, user_gender, user_address) {
    setActiveCard(id);
    setUserPhoto(user_Picture);
    setUserName(user_name);
    setUserGender(user_gender);
    setUserAddress(user_address);
  }
  function addActive(index) {
    if (activeCard === index) {
      return "active card";
    } else {
      return "card";
    }
  }
  return (
    <div>
      <JUMBO_CARD
        photo={!userPhoto ? user_details[0]?.picture.large : userPhoto}
        name={
          !userName
            ? `${user_details[0]?.name.title} ${user_details[0]?.name.first} ${user_details[0]?.name.last}`
            : userName
        }
        address={
          !userAddress
            ? `${user_details[0]?.location.street.number},
        ${user_details[0]?.location.street.name},
        ${user_details[0]?.location.city},
        ${user_details[0]?.location.state},
        ${user_details[0]?.location.country},
        ${user_details[0]?.location.postcode},
        ${user_details[0]?.location.timezone.offset}
        -${user_details[0]?.location.timezone.description}`
            : userAddress
        }
        gender={!userGender ? user_details[0]?.gender : userGender}
      />
      <Container fluid>
        <Row style={{ marginBottom: "3rem" }}>
          {user_details?.map((details, index) => {
            return (
              <Col key={index} lg={3} md={6}>
                <Card
                  className={addActive(index)}
                  id={index}
                  onClick={() =>
                    getUser(
                      index,
                      details.picture.large,
                      `${details.name.title} 
                      ${details.name.first} 
                      ${details.name.last}`,
                      details.gender,
                      `${details.location.street.number},
                      ${details.location.street.name},
                      ${details.location.city},
                      ${details.location.state},
                      ${details.location.country},
                      ${details.location.postcode},
                      ${details.location.timezone.offset}
                      -${details.location.timezone.description}`
                    )
                  }
                >
                  <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">
                      {`${details.gender} .NL`}
                    </Card.Subtitle>
                    <Card.Title>{`${details.name.title} ${details.name.first} ${details.name.last}`}</Card.Title>
                    <Card.Text style={{ fontSize: "0.9rem" }}>
                      {details.email}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default Cards;
