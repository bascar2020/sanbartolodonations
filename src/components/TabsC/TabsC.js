import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TabsC.css';
import { db } from '../../services/fire';
import Donations from '../Donations/Donations'
class TabC extends React.Component {
constructor(props) {
    super(props)

    this.state = {
         peopleTop10: []
    }
}
componentDidMount() {
    db.ref('people').on('value', snapshot => {
        /* Update React state when message is added at Firebase Database */
        let peopleTop10 = [];
        snapshot.forEach((snap) => {
          peopleTop10.push({id: snap.key, val:snap.val()});
        });
        this.setState({ peopleTop10 });

      })
}

render() {
    return (
        <div>
            <Tabs id="tabs">
                <Tab eventKey="Beneficiarios" title="Beneficiarios">
                    <Beneficiarios />
                    <ul>
                    { /* Render the list of messages */
                        this.state.peopleTop10.map( obj => <li key={obj.id}>{obj.val.APELLIDO} {obj.val.NOMBRE}</li> )
                    }
                    </ul>
                </Tab>
                <Tab eventKey="Donaciones" title="Donaciones">
                    <Donations />
                </Tab>
            </Tabs> 
        </div>
    )
}

}


const Beneficiarios = ()=> "lilsta de benefiaisod";
export default TabC;
