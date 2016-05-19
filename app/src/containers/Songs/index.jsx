import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreatorsSong from 'actions/Song';
import * as actionCreatorsSongs from 'actions/Songs';
//import brace from 'brace';
import SongsList from 'components/SongsList';
//import './App.styl';

const mapStateToProps = (state) => ({
    songs: state.songs.data,
    filter: state.songs.filter,
    sortField: state.songs.sortField,
    sortAsc: state.songs.sortAsc
});

const mapActionsToProps = (dispatch) => ({
    actionsSong: bindActionCreators(actionCreatorsSong, dispatch),
    actionsSongs: bindActionCreators(actionCreatorsSongs, dispatch)
});

@connect(mapStateToProps, mapActionsToProps)
export default class App extends React.Component{

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    static propTypes = {
        actionsSong: React.PropTypes.object,
        actionsSongs: React.PropTypes.object,
        songs: React.PropTypes.array,
        filter: React.PropTypes.string,
        sortField: React.PropTypes.string,
        sortAsc: React.PropTypes.bool
    }

    constructor(props) {
        super(props);
        this.state = {
            action: null,
            actionData: null
        }
    }

    componentWillMount() {
        this.fetchSongs(this.props.sortField, this.props.sortAsc, this.props.filter);
    }

    fetchSongs(sortField, sortAsc, filter) {
        this.props.actionsSongs.fetchSongs({sortField, sortAsc, filter});
    }

    render() {
        return (
            <div className="bc-page bc-songs">
                <SongsList
                    songs={this.props.songs}
                    onRefresh={this.onSongListRefresh.bind(this)}
                    onSort={this.onSongListSort.bind(this)}
                    onView={this.onSongListView.bind(this)}
                    onEdit={this.onSongListEdit.bind(this)}
                    sortField={this.props.sortField}
                    sortAsc={this.props.sortAsc}
                    />
            </div>
        )
    }

    onSongListRefresh() {
        this.fetchSongs(this.props.sortField, this.props.sortAsc, this.props.filter);
    }

    onSongListView(song) {
        this.context.router.push(`/songs/${song.id}`);
    }

    onSongListEdit(song) {
        this.context.router.push(`/songs/${song.id}/edit`);
    }

    onSongListSort(sortField, sortAsc) {
        this.fetchSongs(sortField, sortAsc, this.props.filter);
    }

    onAction(action) {
        console.log('action:', action);
    }
}


