import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Beneficiary.css';
import { db } from '../../services/fire';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

class Beneficiary extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            peopleTop10: [],
            allPeople: []

        }
        
    }
    
    formatNumber = (num) => {
        return '$ ' + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    componentDidMount() {
        db.ref('people').orderByChild("MONEY").limitToLast(10).on('value', snapshot => {
            /* Update React state when message is added at Firebase Database */
            let peopleTop10 = [];
            snapshot.forEach((snap) => {
            peopleTop10.push({nombre: snap.val().NOMBRE + ' ' + snap.val().APELLIDO, total: this.formatNumber(snap.val().MONEY), relacion: 'Ruta ' + snap.val().RUTA, producto: snap.val().PRODUCTO, numero_producto: snap.val().NUMERO_PRODUCTO});
            });
            this.setState({ peopleTop10 });

        })

        db.ref('people').on('value', snapshot => {
            /* Update React state when message is added at Firebase Database */
            let allPeople = [];
            snapshot.forEach((snap) => {
                allPeople.push({nombre: snap.val().NOMBRE + ' ' + snap.val().APELLIDO, total: this.formatNumber(snap.val().MONEY), relacion: 'Ruta ' + snap.val().RUTA, producto: snap.val().PRODUCTO, numero_producto: snap.val().NUMERO_PRODUCTO});
            });
            this.setState({ allPeople });

        })
    }

    render() {
        return (
            <div>
                <div className='topten'>
                    <BootstrapTable keyField='id' data={ this.state.peopleTop10 } columns={ columns } striped bordered hover/>
                </div>
                <div className='allpeople'>
                    <BootstrapTable keyField='id' data={ this.state.allPeople } columns={ columns } pagination={ paginationFactory() } striped bordered hover/>
                </div>
            </div>
        )
    }
}

const columns = [{
dataField: 'nombre',
text: 'Nombre'
}, {
dataField: 'total',
text: 'Total este mes'
}, {
dataField: 'relacion',
text: 'Relación'
}];



export default Beneficiary;
