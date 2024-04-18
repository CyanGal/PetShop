
import React, { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../UserContext";

const CreateCard = () => {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const { adminInfo, setAdminInfo } = useContext(UserContext);
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
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/readCat");
        setCategories(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedCategory = categories.find((cat) => cat._id === category);
    const newCard = {
      card_name: name,
      card_description: description,
      price: price,
      quantity: quantity,
      card_category: selectedCategory ? selectedCategory.category_name : '',
      adminId: adminInfo.id,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;

      data.append("name", filename);
      data.append("file", file);

      newCard.card_image = filename;

      try {
        await axios.post("http://localhost:5000/upload", data);
      } catch (err) {
        console.error("Image not uploaded ", err);
      }
    }

    try {
      await axios.post("http://localhost:5000/create", newCard);
      console.log("Added");
      setName("");
      setDescription("");
      setCategory("");
      nav("/");
    } catch (err) {
      console.error("Data not added", err);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Create a New Product</h2>
      <Form className="my-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="Category">
          <Form.Label>Category</Form.Label>
          <Form.Select
            aria-label="Default select example"
            value={category}
            onChange={(e) => { setCategory(e.target.value); console.log(e.target.value); }}
          >
            <option>Open this select menu</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.category_name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="FullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Full Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            as="textarea"
            rows={3}
            placeholder="Enter Description"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter Price"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            rows={3}
            placeholder="Enter Qunatity"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            accept=".jpeg, .png, .jpg"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Form.Group>
        <Button variant="outline-dark" type="submit" onClick={handleSubmit}>
          Create Product
        </Button>
      </Form>
    </div>
  );
};

export default CreateCard;