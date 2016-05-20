import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreatorsSongs from 'actions/Songs';
import {Navbar, InputGroup, FormGroup, Glyphicon, FormControl} from 'react-bootstrap';
import BasicNav from 'containers/BasicNav';

const mapStateToProps = (state) => ({
    filter: state.songs.filter,
    sortField: state.songs.sortField,
    sortAsc: state.songs.sortAsc,
});

const mapActionsToProps = (dispatch) => ({
    actionsSongs: bindActionCreators(actionCreatorsSongs, dispatch)
});

@connect(mapStateToProps, mapActionsToProps)
export default class SongNav extends React.Component{

    static propTypes = {
        actionsSongs: React.PropTypes.object,
        filter: React.PropTypes.string,
        sortField: React.PropTypes.string,
        sortAsc: React.PropTypes.bool
    }

    constructor(props) {
        super(props);
        this.state = {
            filter: props.filter
        }
    }

    componentWilReceiveProps(nextProps) {
        this.setState({filter: nextProps.filter});
    }

    render() {
        return (
            <BasicNav
                title="Songs">

                <Navbar.Form pullRight>
                    <FormGroup>
                        <InputGroup>
                            <FormControl
                                value={this.state.filter}
                                type="text"
                                placeholder="Filter"
                                onChange={this.onFilterChange.bind(this)} />
                            <InputGroup.Addon
                                onClick={this.onFilter.bind(this)}>
                                <Glyphicon glyph="search" />
                            </InputGroup.Addon>
                        </InputGroup>
                    </FormGroup>
                </Navbar.Form>
            </BasicNav>
        )
    }

    onFilterChange(event) {
        this.setState({filter: event.target.value});
    }

    onFilter() {
        this.props.actionsSongs.fetchSongs({
            sortField: this.props.sortField,
            sortAsc: this.props.sortAsc,
            filter: this.state.filter});
    }
}


