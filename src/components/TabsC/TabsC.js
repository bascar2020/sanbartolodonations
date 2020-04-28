import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TabsC.css';
import { db } from '../../services/fire';
import Beneficiarios from '../Beneficiary/Beneficiary'

class TabC extends React.Component {
constructor(props) {
    super(props)

    this.state = {
        allPeople: []
    }
}
// componentDidMount() {
//     db.ref('people').on('value', snapshot => {
//         /* Update React state when message is added at Firebase Database */
//         let allPeople = [];
//         snapshot.forEach((snap) => {
//             allPeople.push({nombre: snap.val().NOMBRE + ' ' + snap.val().APELLIDO, total: this.formatNumber(snap.val().MONEY), relacion: 'Ruta ' + snap.val().RUTA, producto: snap.val().PRODUCTO, numero_producto: snap.val().NUMERO_PRODUCTO});
//         });
//         this.setState({ allPeople });

//     })
// }

render() {
    return (
        <div>
            <Tabs id="tabs">
                <Tab eventKey="Beneficiarios" title="Beneficiarios">
                    <Beneficiarios />
                </Tab>
                <Tab eventKey="Donaciones" title="Donaciones">
                    <Donations />
                </Tab>
            </Tabs> 
        </div>
    )
}

}

const Donations = ()=> "Donations";
export default TabC;
