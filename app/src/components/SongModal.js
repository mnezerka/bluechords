import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
//import {Modal, Button, ControlLabel, FormControl, FormGroup} from 'react-bootstrap';
import {Formik} from 'formik';
import * as Yup from 'yup';

const schema = Yup.object().shape({
      name: Yup.string().min(3, 'Too short').required('Name is required'),
});

class SongModal extends React.Component
{
    constructor(...args)
    {
        super(...args);
        this.state = {
            validated: false
        }
    }

    render() {
        return (
            <Formik
                initialValues={{name: ''}}
                validationSchema={schema}
                onSubmit={this.onSubmitValid.bind(this)}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    isValid,
                }) => (

                    <Modal show={true} onHide={this.props.onCancel}>
                        <Modal.Header closeButton>
                            <Modal.Title>Song</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form
                                noValidate
                                onSubmit={handleSubmit}
                            >
                                <Form.Group controlId="songName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        required
                                        value={values.name}
                                        onChange={handleChange}
                                        isInvalid={touched.name && errors.name}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>

                                <Button type="submit" disabled={isSubmitting}>Save</Button>

                            </Form>
                        </Modal.Body>
                    </Modal>
                )}
            </Formik>
        )
    }

    onSubmitValid(values)
    {
        console.log('formik submit', values)
        this.props.onSave(values.name);
    }

    /*
    onSave()
    {
        if (this.refs.grpName.props.validationState === 'success') {
            this.props.onSave(this.state.song);
        }
    }
    */

}

export default SongModal

