import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
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
            <div>
                <div className="donation-form">
                <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Beneficiario</Form.Label>
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
                    <Form.Label>Valor</Form.Label>
                    <Form.Control type="number" placeholder="Valor" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Form>
            </div>
            </div>
        )
    }
}
