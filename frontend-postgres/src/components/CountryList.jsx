import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    Table,
    Button,
    Container,
    FormGroup,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";

import {
    getEmployees,
    deleteEmployee,
    createEmployee,
    updateEmployee
} from "../services/api";

const EmployeeList = () => {

    const [employees, setEmployees] = useState([]);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalInsert, setModalInsert] = useState(false);

    const [form, setForm] = useState({
        id: "",
        name: "",
        company: "",
        age: "",
        role: "",
        email: "",
        phone: ""
    });

    const fetchEmployees = async () => {
        try {
            const data = await getEmployees();
            setEmployees(data);
        } catch (err) {
            console.error("Error loading employees");
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const showEditModal = (employee) => {
        setForm(employee);
        setModalEdit(true);
    };

    const showInsertModal = () => {
        setForm({
            name: "",
            company: "",
            age: "",
            role: "",
            email: "",
            phone: ""
        });
        setModalInsert(true);
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const deleteItem = async (employee) => {

        const confirmDelete = window.confirm(
            "¿Eliminar empleado " + employee.name + "?"
        );

        if (!confirmDelete) return;

        try {

            await deleteEmployee(employee.id);

            fetchEmployees();

        } catch (err) {

            console.error("Error eliminando empleado", err);

        }

    };

    const editEmployee = async () => {

        try {

            await updateEmployee(form.id, form);

            setModalEdit(false);

            fetchEmployees();

        } catch (err) {
            console.error("Error actualizando empleado", err);
        }

    };

    const insertEmployee = async () => {
        try {

            await createEmployee(form);

            setModalInsert(false);

            fetchEmployees();

        } catch (err) {
            console.error("Error creando empleado", err);
        }
    };

    return (
        <>
            <Container>

                <br />

                <Button color="success" onClick={showInsertModal}>
                    Crear Empleado
                </Button>

                <br /><br />

                <Table bordered hover>

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Empresa</th>
                            <th>Edad</th>
                            <th>Rol</th>
                            <th>Email</th>
                            <th>Telefono</th>
                            <th>Acción</th>
                        </tr>
                    </thead>

                    <tbody>

                        {employees.map(emp => (
                            <tr key={emp.id}>
                                <td>{emp.id}</td>
                                <td>{emp.name}</td>
                                <td>{emp.company}</td>
                                <td>{emp.age}</td>
                                <td>{emp.role}</td>
                                <td>{emp.email}</td>
                                <td>{emp.phone}</td>

                                <td>
                                    <Button
                                        color="primary"
                                        onClick={() => showEditModal(emp)}
                                    >
                                        Editar
                                    </Button>{" "}

                                    <Button
                                        color="danger"
                                        onClick={() => deleteItem(emp)}
                                    >
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
            </Container>

            <Modal isOpen={modalEdit}>
                <ModalHeader>Editar Empleado</ModalHeader>

                <ModalBody>

                    <FormGroup>
                        <label>Nombre</label>
                        <input
                            className="form-control"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Empresa</label>
                        <input
                            className="form-control"
                            name="company"
                            value={form.company}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Edad</label>
                        <input
                            className="form-control"
                            name="age"
                            value={form.age}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Rol</label>
                        <input
                            className="form-control"
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Email</label>
                        <input
                            className="form-control"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Telefono</label>
                        <input
                            className="form-control"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                        />
                    </FormGroup>

                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={editEmployee}>
                        Guardar
                    </Button>

                    <Button color="danger" onClick={() => setModalEdit(false)}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalInsert}>
                <ModalHeader>Insertar Empleado</ModalHeader>

                <ModalBody>

                    <FormGroup>
                        <label>ID</label>
                        <input
                            className="form-control"
                            readOnly
                            value={employees.length + 1}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Nombre</label>
                        <input
                            className="form-control"
                            name="name"
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Empresa</label>
                        <input
                            className="form-control"
                            name="company"
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Edad</label>
                        <input
                            className="form-control"
                            name="age"
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Rol</label>
                        <input
                            className="form-control"
                            name="role"
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Email</label>
                        <input
                            className="form-control"
                            name="email"
                            onChange={handleChange}
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Telefono</label>
                        <input
                            className="form-control"
                            name="phone"
                            onChange={handleChange}
                        />
                    </FormGroup>

                </ModalBody>

                <ModalFooter>

                    <Button color="primary" onClick={insertEmployee}>
                        Insertar
                    </Button>

                    <Button
                        color="danger"
                        onClick={() => setModalInsert(false)}
                    >
                        Cancelar
                    </Button>

                </ModalFooter>
            </Modal>

        </>
    );
};

export default EmployeeList;