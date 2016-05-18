import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreatorsSongs from 'actions/Song';
import {Navbar, FormGroup, DropdownButton, Button, MenuItem} from 'react-bootstrap';

const mapStateToProps = (state) => ({
    song: state.song.song,
    isModified: state.song.isModified,
});

const mapActionsToProps = (dispatch) => ({
    actionsSong: bindActionCreators(actionCreatorsSongs, dispatch)
});

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

    render() {
        console.log('rendering nav', this.props);
        return (
            <Navbar fluid>
                <Navbar.Header>
                    <Navbar.Brand>Song</Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Form pullRight>
                        <FormGroup>
                            <Button
                                disabled={!this.props.isModified}
                                onClick={this.onSave.bind(this)}>
                                Save
                            </Button>
                        </FormGroup>
                    </Navbar.Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }

    onSave() {
        this.props.actionsSong.push();
    }
}
