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
    }
}
componentDidMount() {
    
    db.ref('people').on('value', snapshot => {
        /* Update React state when message is added at Firebase Database */
        let preorder = [];
        let maxisnap = {};
        snapshot.forEach((snap) => {
            maxisnap = snap.val();
            maxisnap.random =  Math.random();
            preorder.push(maxisnap);
        });
        preorder.sort((a,b) => a.random - b.random);
        this.setState({ allPeople: preorder });
    })
}

render() {
    return (
        <div className="TabsGeneral">
            <Tabs id="tabs">
                <Tab eventKey="Beneficiarios" title="Beneficiarios">
                    <Beneficiarios allPeople={this.state.allPeople} />
                </Tab>
                <Tab eventKey="Aporte" title="Aporte">
                    <Donations allPeople={this.state.allPeople} />
                </Tab>
            </Tabs> 
        </div>
    )
}

}

export default TabC;
