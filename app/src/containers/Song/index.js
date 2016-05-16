import React from 'react';
import ChordProView from 'components/ChordProView';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreatorsSong from 'actions/Song';

const mapStateToProps = (state) => ({
    song: state.song.song,
});

const mapActionsToProps = (dispatch) => ({
    actionsSong: bindActionCreators(actionCreatorsSong, dispatch),
});

@connect(mapStateToProps, mapActionsToProps)
export default class Song extends React.Component {

    static propTypes = {
        actionsSong: React.PropTypes.object,
        song: React.PropTypes.object,
        params: React.PropTypes.object,
    };

    static defaultProps = {
        song: null
    }

    componentWillMount() {
        let songId = this.props.params.songId;
        this.props.actionsSong.fetchSong(songId);
    }

    render() {
        return(
            <div>
                <div>Song preview</div>

                {this.props.song !== null &&
                    <ChordProView>{this.props.song.data}</ChordProView>}
                
            </div>
        );
    }
}
