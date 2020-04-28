import React from 'react';
import './Beneficiary.css';
import { db } from '../../services/fire';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Button, Modal } from 'react-bootstrap';

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
        db.ref('people').orderByChild("MONEY").limitToLast(10).on('value', snapshot => {
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
            <div>
                <div className='topten'>
                    <BootstrapTable keyField='ID' data={ this.state.peopleTop10 } columns={ columns } rowEvents={this.rowEvents} striped bordered hover/>
                </div>
                <div className='allpeople'>
                    <BootstrapTable keyField='ID' data={ this.adapterTable(this.props.allPeople) } columns={ columns } pagination={ paginationFactory() } rowEvents={this.rowEvents} striped bordered hover/>
                </div>
                <div>
                    <Modal show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>{this.nombre}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{this.producto}</Modal.Body>
                        <Modal.Body>{this.numero_producto}</Modal.Body>
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
