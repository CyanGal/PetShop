import React , {useState, useEffect} from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useParams , useNavigate} from "react-router-dom";

const UpdateCard = () => {
  const nav= useNavigate()
  // COMPARES AND TAKES ID useParams
  const {id} = useParams()
  // SAVES ALL INFO FOR ELEMENT WITH CALLED ID
  const [card, setCard]= useState({})
  // useState FOR INPUT
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // useState FOR IMAGES
  const [file, setFile] = useState(null);
  // SHOWS IMAGE AFTER UPLOAD
  const [imagePreview, setImagePreview] = useState('');
  // READS IMAGE
  const PathFile = "http://localhost:5000/images/";
  useEffect(()=>{
    const getDate = async()=>{
     await axios.get(`http://localhost:5000/readOne/${id}`)
     .then((res)=>{
       console.log(res.data)
       // SAVES INFOS TO state
       setCard(res.data)
       setName(res.data.card_name)
       setDescription(res.data.card_description)
       setFile(res.data.card_image)
     })
     .catch(err=>{
       console.log("date not showed "+err)
     })
    }
    getDate()
 },[])

 const updateDate= async(e)=>{
 e.preventDefault()
 // COPYS INFO FROM DATABASE
 const updatedCard= {...card}
 updatedCard.card_description = description
 updatedCard.card_name = name
 // IMAGE CONFIGURATION
 if (file) {
  const data = new FormData();
  const filename = file.name;
  data.append("name", filename);
  data.append("file", file);
  updatedCard.card_image = filename;
  try {
      await axios.post("http://localhost:5000/upload", data);
  } catch (err) { 
    console.log("Something is wrong " +err)
  }
}
else {
  updatedCard.card_image = card.card_image;
}
 await axios.patch(`http://localhost:5000/updateCard/${id}`,updatedCard)
     .then((res)=>{
       console.log(res.data)
      nav('/')
     })
     .catch(err=>{
       console.log("date not showed "+err)
     })
    }
 
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Form className="w-70" onSubmit={updateDate}>
            <Form.Group className="mb-3" controlId="Title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter Title"  value={name} onChange={(e)=>setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="Description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3}  value={description} onChange={(e)=>setDescription(e.target.value)}/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="Image">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" accept=".jpeg, .png, .jpg" onChange={(e) => {
                const selectedFile = e.target.files[0];
                setFile(selectedFile);
                    if (selectedFile) {
                    const reader = new FileReader();
                    reader.onload = () => {
                    setImagePreview(reader.result);
                    };
                     reader.readAsDataURL(selectedFile);
                     }
                     }} />
            </Form.Group>
            <Button variant="warning" type="submit">
              Update
            </Button>
          </Form>
        </Col>
        <Col>
        {file && (
                        <div className="w-100">
                            <img
                                className="img-fluid"
                                src={PathFile + file}
                                alt=""
                            />
                        </div>
                    )}
                    {imagePreview && (
                        <div className="w-100">
                            <img
                                className="img-fluid"
                                src={imagePreview}
                                alt=""
                            />
                        </div>
                    )}
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateCard;