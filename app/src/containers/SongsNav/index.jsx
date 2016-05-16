import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreatorsSongs from 'actions/Songs';
import {Navbar, FormGroup, Button, FormControl} from 'react-bootstrap';

const mapStateToProps = (state) => ({
    filter: state.songs.filter,
});

const mapActionsToProps = (dispatch) => ({
    actionsSongs: bindActionCreators(actionCreatorsSongs, dispatch)
});

@connect(mapStateToProps, mapActionsToProps)
export default class SongsNav extends React.Component{

    static propTypes = {
        actionsSongs: React.PropTypes.object,
        filter: React.PropTypes.string
    }

    render() {
        return (
            <Navbar fluid>
                <Navbar.Header>
                    <Navbar.Brand>Songs</Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Form pullLeft>
                        <FormGroup>
                            <FormControl
                                value={this.props.filter}
                                type="text"
                                placeholder="Search"
                                onChange={this.onSearchChange.bind(this)} />
                        </FormGroup>
                        {' '}
                        <Button type="submit">Search</Button>
                    </Navbar.Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }

    onSearchChange(event) {
        console.log(event.target.value);
        this.props.actionsSongs.fetchSongs({filter: event.target.value});
    }

}


