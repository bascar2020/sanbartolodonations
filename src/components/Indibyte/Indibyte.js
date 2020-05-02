import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faCopyright } from '@fortawesome/free-solid-svg-icons'
import { faDev } from '@fortawesome/free-brands-svg-icons'
import './Indibyte.css'

class FloatingMenu extends React.Component {
	constructor() {
		super();
		
		this.state = {
			toggled: false
		}
	}
	
	toggleMenu() {
		 this.setState({toggled: !this.state.toggled});
	}
	
	render() {
		
		return <div className="adminActions">
                <input type="checkbox" name="adminToggle" className="adminToggle" />
                <a className="adminButton" href="#!"><FontAwesomeIcon icon={faCoffee} /></a>
                <div className="adminButtons">
                    <a href="https://www.linkedin.com/in/charlie-molina-108632b1/" target="blank" title="Dev"><FontAwesomeIcon icon= {faDev} /></a>
                    <a href="https://www.linkedin.com/in/diego-gil-b250b284/" target="blank" title="Dev"><FontAwesomeIcon icon={faDev} /></a>
                    <a href="https://www.linkedin.com/in/jhoncamacho/" target="blank" title="Dev"><FontAwesomeIcon icon={faDev} /></a>
                    <a href="http://www.indibyte.com.co/" target="blank" title="Indibyte"><FontAwesomeIcon icon={faCopyright} /></a>
                </div>
            </div>;
	}
}


export default FloatingMenu;