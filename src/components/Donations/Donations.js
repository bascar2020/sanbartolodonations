import React, { Component } from 'react'
import './Donations.css';
import { Form, Button, Container, Row, Col, Media} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import logo from '../../assets/images/logo.svg';
export default class Donations extends Component {
      state = {
        startDate: new Date()
      };

     options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
    
    handleChange = date => {
        this.setState({
          startDate: date
        });
      };

    adapterSelect2 = (data) => {
            let adapterData = [];
            if (data.length > 0) {
                data.forEach((snap) => {
                    snap.full_name = snap.NOMBRE +' '+ snap.APELLIDO
                    adapterData.push({ value: snap.ID, label: snap.full_name , data: snap});
                });
            }
            return adapterData;
        }

    render() {
        return (
            <div className="donation-form">
                <Container>
                    <Row>
                        <Col md={6}>
                        <Media>
                            <img
                                width={64}
                                height={64}
                                className="mr-3"
                                src={logo}
                                alt="logo"
                            />
                            <Media.Body>
                                <h5>Formulario de Donacion</h5>
                                <p>
                                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                                ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
                                tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla.
                                Donec lacinia congue felis in faucibus.
                                </p>
                            </Media.Body>
                            </Media>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                
                                <Select options={this.adapterSelect2(this.props.allPeople)} />
                                <Form.Text className="text-muted">
                                    Busca el nombre de la persona que deseas hacer un aporte
                                </Form.Text>
                            </Form.Group>
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handleChange}
                                inline
                            />
                            <Form.Group controlId="formValue">
                                <Form.Control type="number" placeholder="Valor" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Guardar
                            </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
