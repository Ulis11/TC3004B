import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Table, Button, Container, FormGroup,
    Modal, ModalHeader, ModalBody, ModalFooter,
} from "reactstrap";
const data = [
    { id: 1, nombre: "Ovidio Garza", empresa: "Accenture", edad: '36', rol: 'Desarrollador', password: '1234', email: 'ovidio.garza@accenture.com' , telefono: '8112345678' },
    { id: 2, nombre: "Ramon Velez", empresa: "Banorte", edad: '40', rol: 'Analista', password: '5678', email: 'ramon.velez@banorte.com' , telefono: '8187654321' },
    { id: 3, nombre: "Hugo Sanchez ", empresa: "Real Madrid", edad: '30', rol: 'Portero', password: '9012', email: 'hugo.sanchez@realmadrid.com' , telefono: '8111111111' },
    { id: 4, nombre: "Rafael Marquez", empresa: "Barcelona", edad: '35', rol: 'Defensa', password: '3456', email: 'rafael.marquez@barcelona.com' , telefono: '8122222222' },
    { id: 5, nombre: "Carlos Alcaraz", empresa: "Mallorca", edad: '28', rol: 'Medio', password: '7890', email: 'carlos.alcaraz@mallorca.com' , telefono: '8133333333' },
    { id: 6, nombre: "N.Djokovic", empresa: "Serbia", edad: '34', rol: 'Tenista', password: '1111', email: 'n.djokovic@serbia.com' , telefono: '8144444444' },
    { id: 7, nombre: "Sergio Perez", empresa: "Cadillac", edad: '42', rol: 'Gerente', password: '2222', email: 'sergio.perez@cadillac.com' , telefono: '8155555555' },
    { id: 8, nombre: "Max Verstapen", empresa: "Oracle Red Bull Racing", edad: '26', rol: 'Piloto', password: '3333', email: 'max.verstapen@oracleredbullracing.com' , telefono: '8166666666' },
    { id: 9, nombre: "Carlos Sainz", empresa: "Williams Racing", edad: '29', rol: 'Piloto', password: '4444', email: 'carlos.sainz@williamsracing.com' , telefono: '8177777777' },
];

class Empleados extends React.Component {
    state = {
        data: data,
        modalActualizar: false,
        modalInsertar: false,
        form: {
            id: "",
            nombre: "",
            empresa: "",
            edad: "",
            rol: "",
            password: "",
            email: "",
            telefono: "",
        },
    };
    mostrarModalActualizar = (dato) => {
        this.setState({
            form: dato,
            modalActualizar: true,
        });
    };
    cerrarModalActualizar = () => {
        this.setState({ modalActualizar: false });
    };
    mostrarModalInsertar = () => {
        this.setState({
            modalInsertar: true,
        });
    };
    cerrarModalInsertar = () => {
        this.setState({ modalInsertar: false });
    };

    editar = (dato) => {
        var contador = 0;
        var arreglo = this.state.data;
        arreglo.map((registro) => {
            if (dato.id === registro.id) {
                arreglo[contador].nombre = dato.nombre;
                arreglo[contador].empresa = dato.empresa;
            }
            contador++;
        });
        this.setState({ data: arreglo, modalActualizar: false });
    };
    eliminar = (dato) => {
        var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento " + dato.id);
        if (opcion === true) {
            var contador = 0;
            var arreglo = this.state.data;
            arreglo.map((registro) => {
                if (dato.id === registro.id) {
                    arreglo.splice(contador, 1);
                }
                contador++;
            });
            this.setState({ data: arreglo, modalActualizar: false });
        }
    };
    insertar = () => {
        var valorNuevo = { ...this.state.form };
        valorNuevo.id = this.state.data.length + 1;
        var lista = this.state.data;
        lista.push(valorNuevo);
        this.setState({ modalInsertar: false, data: lista });
    }
    handleChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };
    render() {
        return (
        <>
            <Container>
                
                <br />
                <Button color="success" onClick={() => this.mostrarModalInsertar()}>Crear</Button>
                <br />
                <br />
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Empresa</th>
                            <th>Edad</th>
                            <th>Rol</th>
                            <th>Password</th>
                            <th>Email</th>
                            <th>Telefono</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((dato) => (
                            <tr key={dato.id}>
                                <td>{dato.id}</td>
                                <td>{dato.nombre}</td>
                                <td>{dato.empresa}</td>
                                <td>{dato.edad}</td>
                                <td>{dato.rol}</td>
                                <td>{dato.password}</td>
                                <td>{dato.email}</td>
                                <td>{dato.telefono}</td>
                                <td>
                                    <Button color="primary" onClick={() => this.mostrarModalActualizar(dato)} >Editar
                                    </Button>{" "}
                                    <Button color="danger" onClick={() => this.eliminar(dato)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
            <Modal isOpen={this.state.modalActualizar}>
                <ModalHeader>
                    <div><h3>Editar Registro</h3></div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label> Id:</label>
                        <input className="form-control" readOnly type="text" value={this.state.form.id} />
                    </FormGroup>
                    <FormGroup>
                        <label>Nombre:</label>
                        <input className="form-control" name="nombre" type="text"
                            onChange={this.handleChange} value={this.state.form.nombre} />
                    </FormGroup>
                    <FormGroup>
                        <label>Empresa:</label>
                        <input className="form-control" name="empresa" type="text"
                            onChange={this.handleChange} value={this.state.form.empresa} />
                    </FormGroup>
                    <FormGroup>
                        <label>Edad:</label>
                        <input className="form-control" name="edad" type="text"
                            onChange={this.handleChange} value={this.state.form.edad} />
                    </FormGroup>
                    <FormGroup>
                        <label>Rol:</label>
                        <input className="form-control" name="rol" type="text"
                            onChange={this.handleChange} value={this.state.form.rol} />
                    </FormGroup>
                    <FormGroup>
                        <label>Password:</label>
                        <input className="form-control" name="password" type="text"
                            onChange={this.handleChange} value={this.state.form.password} />
                    </FormGroup>
                    <FormGroup>
                        <label>Email:</label>
                        <input className="form-control" name="email" type="text"
                            onChange={this.handleChange} value={this.state.form.email} />
                    </FormGroup>
                    <FormGroup>
                        <label>Telefono:</label>
                        <input className="form-control" name="telefono" type="text"
                            onChange={this.handleChange} value={this.state.form.telefono} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.editar(this.state.form)} >
                        Editar</Button>
                    <Button color="danger" onClick={() => this.cerrarModalActualizar()} >
                        Cancelar</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader>
                    <div><h3>Insertar nombre</h3></div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <label>Id: </label>
                        <input className="form-control" readOnly type="text" value={this.state.data.length + 1} />
                    </FormGroup>
                    <FormGroup>
                        <label>Nombre: </label>
                        <input className="form-control" name="nombre" type="text" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <label>Empresa: </label>
                        <input className="form-control" name="empresa" type="text" onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Edad: </label>
                        <input className="form-control" name="edad" type="text" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <label>Rol: </label>
                        <input className="form-control" name="rol" type="text" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <label>Password: </label>
                        <input className="form-control" name="password" type="text" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <label>Email: </label>
                        <input className="form-control" name="email" type="text" onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <label>Telefono: </label>
                        <input className="form-control" name="telefono" type="text" onChange={this.handleChange} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.insertar()} >Insertar </Button>
                    <Button className="btn btn-danger" onClick={() => this.cerrarModalInsertar()}
                    >Cancelar</Button>
                </ModalFooter>
            </Modal>
        </>
        );
    }
}
export default Empleados;
