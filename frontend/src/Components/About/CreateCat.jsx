
import React, { useState, useEffect } from "react";
import { Form, Button, Container, Table } from "react-bootstrap";
import axios from "axios";

const CreateCat = () => {

    const [category_name, setCategory_name] = useState("");
    const [categories, setCategories] = useState([])

    useEffect(() => {
        // FETCH CATEGORIES FROM THE SERVER WHEN THE COMPONENT MOUNTS
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://localhost:5000/readCat");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);
    const handleSubmitCat = async (e) => {
        e.preventDefault();

        const newCategory = {
            category_name: category_name,
        };

        try {
            await axios.post("http://localhost:5000/createCat", newCategory);
            console.log("Added");
        } catch (err) {
            console.error("Data not added", err);
        }
    };

    return (
        <Container>
            <h2 style={{ textAlign: "center" }}>Create a New Category</h2>
            <Form className="my-3" onSubmit={handleSubmitCat}>
                <Form.Group className="mb-3" controlId="category_name">
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control
                        value={category_name}
                        onChange={(e) => setCategory_name(e.target.value)}
                        type="text"
                        required="required"
                    />
                </Form.Group>
                <Button variant="outline-dark" type="submit">
                    Create Category
                </Button>
            </Form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Category Name</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => {
                        return (
                            <tr key={index}>
                                <td>{category.category_name}</td>
                            </tr>
                        )
                    })}



                </tbody>
            </Table>
        </Container>
    );
};

export default CreateCat;