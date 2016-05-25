import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreatorsSong from 'actions/Song';
import * as actionCreatorsSongs from 'actions/Songs';
import SongsList from 'components/SongsList';
import ConfirmationModal from 'components/ConfirmationModal';

const mapStateToProps = (state) => ({
    songs: state.songs.data,
    filter: state.songs.filter,
    sortField: state.songs.sortField,
    sortAsc: state.songs.sortAsc,
    isAuthenticated: state.auth.isAuthenticated
});

const mapActionsToProps = (dispatch) => ({
    actionsSong: bindActionCreators(actionCreatorsSong, dispatch),
    actionsSongs: bindActionCreators(actionCreatorsSongs, dispatch)
});

const ACT_DELETE = 'ACT_DELETE';

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
        sortAsc: React.PropTypes.bool,
        isAuthenticated: React.PropTypes.bool 
    }

    static defaultProps = {
        isAuthenticated: false
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
                    allowEdit={this.props.isAuthenticated}
                    onRefresh={this.onSongListRefresh.bind(this)}
                    onSort={this.onSongListSort.bind(this)}
                    onView={this.onSongListView.bind(this)}
                    onEdit={this.onSongListEdit.bind(this)}
                    onDelete={this.onSongListDelete.bind(this)}
                    sortField={this.props.sortField}
                    sortAsc={this.props.sortAsc}
                    />

                    {this.state.action === ACT_DELETE &&
                    <ConfirmationModal
                        show
                        message={'Are you sure you want to delete ' + this.state.actionData.name + '?'}
                        onCancel={this.onCancelAction.bind(this)}
                        onOk={this.onSongDeleteConfirmed.bind(this)}
                    />}
            </div>
        )
    }

    onCancelAction() {
        this.setState({action: null, actionData: null});
    }

    onSongListRefresh() {
        this.fetchSongs(this.props.sortField, this.props.sortAsc, this.props.filter);
    }

    onSongListView(song) {
        this.context.router.push(`${config.path}songs/${song.id}`);
    }

    onSongListEdit(song) {
        this.context.router.push(`${config.path}songs/${song.id}/edit`);
    }

    onSongListDelete(song) {
        this.setState({action: ACT_DELETE, actionData: song});
    }

    onSongDeleteConfirmed(song) {
        this.props.actionsSongs.deleteSong(this.state.actionData);
        this.setState({action: null, actionData: null});
    }

    onSongListSort(sortField, sortAsc) {
        this.fetchSongs(sortField, sortAsc, this.props.filter);
    }
}


