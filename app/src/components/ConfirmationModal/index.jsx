import React from 'react';
import {Button, Modal} from 'react-bootstrap';

export default class ConfirmationModal extends React.Component{

    static propTypes = {
        message: React.PropTypes.string,
        show: React.PropTypes.bool,
        onOk: React.PropTypes.func,
        onCancel: React.PropTypes.func
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onCancel}>
                <Modal.Header>
                    <Modal.Title>BluePass Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.message}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onCancel}>Cancel</Button>
                    <Button onClick={this.props.onOk}>Ok</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
