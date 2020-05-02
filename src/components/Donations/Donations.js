import React, { Component } from 'react'
import './Donations.css';
import { Form, Button, Container, Row, Col, Media} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons'
import { db } from '../../services/fire';
export default class Donations extends Component {
      state = {
        startDate: new Date(),
        selectedOption: null,
      };

     options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedOption });
    }
    handleChangeDate = (date) => {
        this.setState({
          startDate: date
        });
      };
    handleSubmit = (event) => {
        const form = event.currentTarget;
            if (form.checkValidity() === false || this.state.selectedOption ===  null) {
                event.preventDefault();
                event.stopPropagation();
            }
        this.saveData(event.target.elements.money.value);
      }
    adapterSelect2 = (data) => {
            let adapterData = [];
            if (data.length > 0) {
                data.forEach((snap) => {
                    snap.full_name = snap.NOMBRE +' '+ snap.APELLIDO
                    adapterData.push({ value: snap.ID, label:`${snap.full_name}-${snap.RUTA}` , data: snap});
                });
            }
            return adapterData;
        }
    
    saveData = (money)=> {
        let postData = {
            user_id:  this.state.selectedOption.value,
            value_donation:  parseInt(money),
            date_donation: this.state.startDate.getTime(),
            date_added: new Date().getTime()
        }
        console.log(postData)
        db.ref().child('donations').push(postData);
        
        let updates = {}
        updates['/people/'+this.state.selectedOption.value+'/MONEY'] = this.state.selectedOption.data.MONEY + parseInt(money);
         db.ref().update(updates);
    } 

    render() {
        return (
            <div className="donation-form">
                <Container>
                    <Row>
                        <Col md={6}>
                        <Media>
                            
                            <FontAwesomeIcon  size="6x" fixedWidth icon= {faHandHoldingHeart} />
                            <Media.Body>
                                <h5>Registrar Donación</h5>
                                <p>Por medio de este formulario podrás seleccionar el beneficiario a quién quieres ayudar, la fecha y el valor de la donación. Tú aporte favorecerá a muchas familias  vulnerables. Todos unidos contribuiremos con una causa social.</p>
                            </Media.Body>
                            </Media>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formBasicEmail" style={{ position: 'relative', zIndex: '2' }}>
                                <Select onChange={this.handleChangeSelect} options={this.adapterSelect2(this.props.allPeople)} />
                                <Form.Control.Feedback type="invalid">
                                    Seleccione un beneficiario
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group controlId="formDate">
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChangeDate}
                                inline
                            />
                            </Form.Group>
                            <Form.Group controlId="money">
                            <Form.Text className="text-muted">
                            Valor del aporte sin comas o puntos
                                </Form.Text>
                                <Form.Control  required min="1" type="number" placeholder="Valor" />
                                <Form.Control.Feedback type="invalid">
                                    Ingrese un valor mayor a 0
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Registrar
                            </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
