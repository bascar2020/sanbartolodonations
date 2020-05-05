import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TabsC.css';
import { db } from '../../services/fire';
import Donations from '../Donations/Donations'
import Beneficiarios from '../Beneficiary/Beneficiary'

class TabC extends React.Component {
constructor(props) {
    super(props)

    this.state = {
        allPeople: [],
        db_attr: ['MONEY','NOMBRE','APELLIDO','NUMERO_PRODUCTO']
    }
}
componentDidMount() {
    let randomValue = this.state.db_attr[Math.floor(Math.random() * this.state.db_attr.length)];
    db.ref('people').orderByChild(randomValue).on('value', snapshot => {
        /* Update React state when message is added at Firebase Database */
        let allPeople = [];
        snapshot.forEach((snap) => {
            allPeople.push(snap.val());
        });
        this.setState({ allPeople });
    })
}

render() {
    return (
        <div className="TabsGeneral">
            <Tabs id="tabs">
                <Tab eventKey="Beneficiarios" title="Beneficiarios">
                    <Beneficiarios allPeople={this.state.allPeople} />
                </Tab>
                <Tab eventKey="Donaciones" title="Donaciones">
                    <Donations allPeople={this.state.allPeople} />
                </Tab>
            </Tabs> 
        </div>
    )
}

}

export default TabC;
