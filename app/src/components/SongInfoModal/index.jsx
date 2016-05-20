import React from 'react';
import {Modal, Button, ControlLabel, FormControl, FormGroup} from 'react-bootstrap';

const songDefault = {
    id: null,
    name: '',
    artist: ''
};

export default class SongInfoModal extends React.Component{

    static propTypes = {
        song: React.PropTypes.shape({
            id: React.PropTypes.string,
            name: React.PropTypes.string,
            artist: React.PropTypes.string,
        }),
        show: React.PropTypes.bool,
        onSave: React.PropTypes.func,
        onCancel: React.PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            song: Object.assign({}, songDefault)
        }
    }

    componentWillMount() {
        this.updateSong(this.props.song);
    }

    componentWillReceiveProps(nextProps) {
        this.updateSong(nextProps.song);
    }

    updateSong(song) {
        if (song !== undefined && song !== null) {
            this.setState({
                song: Object.assign({}, song)
            });
        } else {
            this.setState({
                song: Object.assign({}, songDefault)
            });
        }
    }

    getValidationState() {
        if (this.state.song.name.length === 0) {
            return 'error';
        }

        return 'success';
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onCancel}>
                <Modal.Header>
                    <Modal.Title>Song Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup
                        ref="grpName"
                        controlId="bc-song-info-modal-form"
                        validationState={this.getValidationState()} >

                        <ControlLabel>Name</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.song.name}
                            onChange={this.onChange.bind(this, 'name')}
                            placeholder="Enter song name" />
                        <FormControl.Feedback />
                    </FormGroup>

                    <ControlLabel>Artist</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.song.artist}
                        onChange={this.onChange.bind(this, 'artist')}
                        placeholder="Enter song artist" />


                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onCancel}>Cancel</Button>
                    <Button onClick={this.onSave.bind(this)}>Save</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    onChange(ctrl, event) {
        let song = Object.assign({}, this.state.song, {[ctrl]: event.target.value});
        this.setState({song});
    }

    onSave() {
        if (this.refs.grpName.props.validationState === 'success') {
            this.props.onSave(this.state.song);
        }
    }

}
