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
});

const mapActionsToProps = (dispatch) => ({
    actionsSong: bindActionCreators(actionCreatorsSong, dispatch),
    actionsSongs: bindActionCreators(actionCreatorsSongs, dispatch)
});

@connect(mapStateToProps, mapActionsToProps)
export default class App extends React.Component{

    static contextTypes = {
        router: React.PropTypes.func.isRequired
    }

    static propTypes = {
        actionsSong: React.PropTypes.object,
        actionsSongs: React.PropTypes.object,
        songs: React.PropTypes.array
    }

    constructor(props) {
        super(props);
        this.state = {
            action: null,
            actionData: null
        }
    }

    componentWillMount() {
        this.fetchSongs();
    }

    fetchSongs(sortField, sortAsc) {
        this.props.actionsSongs.fetchSongs({sortField, sortAsc});
    }

    render() {
        return (
            <div className="bc-page bc-songs">
                <SongsList
                    songs={this.props.songs}
                    onRefresh={this.onSongListRefresh.bind(this)}
                    onView={this.onSongListView.bind(this)} />
            </div>
        )
    }

    onSongListRefresh() {
        this.fetchSongs();
    }

    onSongListView(song) {
        console.log('view song', song);
        this.context.router.push(`/song/${song.id}`);
/*
        this.setState({
            action: ACT_PREVIEW,
            actionData: song
        });
*/
    }

    onAction(action) {
        console.log('action:', action);
    }
}


