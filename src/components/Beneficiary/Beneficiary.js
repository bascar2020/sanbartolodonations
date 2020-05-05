import React from 'react';
import './Beneficiary.css';
import { db } from '../../services/fire';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button, Modal , Container, Row, Col} from 'react-bootstrap';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
const { SearchBar } = Search;

class Beneficiary extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            peopleTop10: [],
            showModal: false,
        }

        this.handleClose = this.handleClose.bind(this);
        
    }
    
    formatNumber = (num) => {
        return '$ ' + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    componentDidMount() {
        db.ref('people').orderByChild("MONEY").limitToFirst(10).on('value', snapshot => {
            /* Update React state when message is added at Firebase Database */
            let peopleTop10 = [];
            snapshot.forEach((snap) => {
                let val = snap.val();
                peopleTop10.push({
                    ID: val.ID,
                    full_name: val.NOMBRE + ' ' + val.APELLIDO,
                    total: this.formatNumber(val.MONEY),
                    relacion: val.RUTA,
                    producto: val.PRODUCTO, 
                    numero_producto: val.NUMERO_PRODUCTO
                });
                
            });
            this.setState({ peopleTop10 });

        })
  
    }
    adapterTable(data) {
        let adapterData = [];
        if (data.length > 0) {
            data.forEach((snap) => {
                snap.full_name = snap.NOMBRE +' '+ snap.APELLIDO
                snap.relacion = snap.RUTA
                snap.total = this.formatNumber(snap.MONEY)
                snap.producto = snap.PRODUCTO
                snap.numero_producto = snap.NUMERO_PRODUCTO
                adapterData.push(snap);
            });
        }
        return adapterData;
    }

    rowEvents = {
        onClick: (e, row, rowIndex) => {
            this.nombre = row.full_name
            this.producto = row.producto
            this.numero_producto = row.numero_producto
            this.setState(state => ({
                showModal: !state.showModal
            }));

        }
      };
    
    handleClose() {
        this.nombre = ""
        this.producto = ""
        this.numero_producto = ""
        this.setState(state => ({
            showModal: !state.showModal
        }));
    }
    

    render() {
        return (
            <div className="beneficiary">
                <Container>
                    <Row>
                        <Col md={10}>
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <p className="lead">Gracias por responder al llamado dando de si. El objetivo de esta aplicación es promover una distribución equitativa de las ayudas a los beneficiarios.</p>
                    </div>
                    </div>
                <div className='padding'>
                    <div className="card bg-light mb-3">
                        <h5 className="card-header">Estos son los diez beneficiarios con menos aportes este mes</h5>
                        <div className="card-body">
                        <p className="font-weight-light text-secondary h6">Click en la fila para ver la información necesaria para hacer un aporte al beneficiario.</p>
                        </div>
                    </div>
                    <BootstrapTable keyField='ID' data={ this.state.peopleTop10 } columns={ columns } rowEvents={this.rowEvents} striped bordered hover/>
                </div>
                        </Col>
                    </Row>
                    <Row>
                    <Col md={10}>
                    <span className="d-block p-2 bg-dark text-white"></span>
                    </Col>
                    </Row>

                    <Row>
                        <Col md={10}>
                            <div className='padding'>
                                <div className="card bg-light mb-3" >
                                    <h5 className="card-header">Beneficiarios</h5>
                                    <div className="card-body">
                                    <p className="card-title lead">Estos es la lista total de beneficiarios, ordenada aleatoriamente</p>
                                    <p className="font-weight-light text-secondary h6">Click en la fila para ver la información necesaria para hacer un aporte al beneficiario.</p>
                                    </div>
                                </div>
                                

                                <ToolkitProvider
                                        keyField="ID"
                                        data={ this.adapterTable(this.props.allPeople) }
                                        columns={ columns }
                                        search
                                        >
                                        {
                                            props => (
                                            <div>
                                                <SearchBar { ...props.searchProps} placeholder="Buscar beneficiario" />
                                                <hr />
                                                <BootstrapTable
                                                { ...props.baseProps }
                                                pagination={ paginationFactory() } rowEvents={this.rowEvents} striped bordered hover />
                                            </div>
                                            )
                                        }
                                        </ToolkitProvider>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div>
                    <Modal show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title >{this.nombre}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ul className="list-group">
                                <li className="list-group-item">Tipo de Producto: <span className="badge badge-success">{this.producto}</span></li>
                                {this.producto === 'Daviplata'
                                    ? <a href="http://davivienda.custhelp.com/app/answers/detail/a_id/558/~/%C2%BFqu%C3%A9-es-daviplata%3F" class="btn btn-link" role="button" aria-pressed="true" target='blank'>¿Que es daviplata?</a>
                                    : <br></br>
                                }
                                <li className="list-group-item">Numero: <span className="badge badge-info">{this.numero_producto}</span></li>
                            </ul>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>
                            Cerrar
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        )
    }
}

const columns = [{
dataField: 'full_name',
text: 'Nombre'
}, {
dataField: 'total',
text: 'Total este mes'
}, {
dataField: 'relacion',
text: 'Relación'
}];



export default Beneficiary;
