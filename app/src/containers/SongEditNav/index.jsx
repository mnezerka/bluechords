import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreatorsSongs from 'actions/Song';
import {Navbar, FormGroup, Button} from 'react-bootstrap';
import SongInfoModal from 'components/SongInfoModal';

const mapStateToProps = (state) => ({
    song: state.song.song,
    isModified: state.song.isModified,
});

const mapActionsToProps = (dispatch) => ({
    actionsSong: bindActionCreators(actionCreatorsSongs, dispatch)
});

const ACT_INFO = 'act-info';

@connect(mapStateToProps, mapActionsToProps)
export default class SongEditNav extends React.Component{

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    static propTypes = {
        actionsSong: React.PropTypes.object,
        song: React.PropTypes.object,
        isModified: React.PropTypes.bool
    }

    constructor(props) {
        super(props);
        this.state = {
            action: null
        }
    }

    render() {
        let songName = this.props.song !== null ? this.props.song.name : '';
        return (
            <Navbar fluid>
                <Navbar.Header>
                    <Navbar.Brand>Song {songName}</Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Form pullRight>
                        <FormGroup>
                            <Button
                                onClick={this.onInfo.bind(this)}>
                                Song Information...
                            </Button>
                            {' '}
                            <Button
                                disabled={!this.props.isModified}
                                onClick={this.onSave.bind(this)}>
                                Save
                            </Button>
                        </FormGroup>
                    </Navbar.Form>
                </Navbar.Collapse>

                <SongInfoModal
                    show={this.state.action === ACT_INFO}
                    song={this.props.song}
                    onCancel={this.onCancelAction.bind(this)}
                    onSave={this.onSaveInfo.bind(this)}
                    />
            </Navbar>
        )
    }

    onCancelAction() {
        this.setState({action: null});
    }

    onSaveInfo(song) {
        this.setState({action: null});
        this.props.actionsSong.setInfo(song);
    }

    onSave() {
        this.props.actionsSong.push();
    }

    onInfo() {
        this.setState({action: ACT_INFO});
    }

}
