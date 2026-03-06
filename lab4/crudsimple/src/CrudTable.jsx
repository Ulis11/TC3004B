import { useState } from "react";
import { Table, Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export const CrudTable = () => {

  const initialData = [
    { id: 1, name: "Laptop", price: 1200 },
    { id: 2, name: "Mouse", price: 25 },
    { id: 3, name: "Keyboard", price: 80 }
  ];

  const [data, setData] = useState(initialData);
  const [form, setForm] = useState({ id: null, name: "", price: "" });
  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleAdd = () => {
    if (!form.name || !form.price) return;

    const newItem = {
      id: data.length + 1,
      name: form.name,
      price: form.price
    };

    setData([...data, newItem]);
    setForm({ id: null, name: "", price: "" });
  };

  const handleEdit = (item) => {
    setForm(item);
    setEditing(true);
  };

  const handleUpdate = () => {
    const updatedData = data.map((item) =>
      item.id === form.id ? form : item
    );

    setData(updatedData);
    setEditing(false);
    setForm({ id: null, name: "", price: "" });
  };

  const handleDelete = (id) => {
    const filteredData = data.filter((item) => item.id !== id);
    setData(filteredData);
  };

  return (
    <Container className="mt-5">

      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Body>

              <Card.Title className="mb-4">
                Product CRUD
              </Card.Title>

              <Form>
                <Row className="mb-3">

                  <Col>
                    <Form.Control
                      name="name"
                      placeholder="Product name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col>
                    <Form.Control
                      name="price"
                      type="number"
                      placeholder="Price"
                      value={form.price}
                      onChange={handleChange}
                    />
                  </Col>

                  <Col md="auto">
                    {editing ? (
                      <Button variant="warning" onClick={handleUpdate}>
                        Update
                      </Button>
                    ) : (
                      <Button variant="primary" onClick={handleAdd}>
                        Add
                      </Button>
                    )}
                  </Col>

                </Row>
              </Form>

              <Table striped bordered hover responsive>

                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th style={{width:"150px"}}>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>${item.price}</td>
                      <td>
                        <Button
                          size="sm"
                          variant="info"
                          className="me-2"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </Button>

                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </Table>

            </Card.Body>
          </Card>
        </Col>
      </Row>

    </Container>
  );
};