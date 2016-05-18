import React from 'react';
import ChordProView from 'components/ChordProView';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreatorsSong from 'actions/Song';
import AceEditor from 'react-ace';
import './SongEdit.styl';

//import 'brace/mode/java';
import 'brace/theme/github';

const mapStateToProps = (state) => ({
    song: state.song.song,
});

const mapActionsToProps = (dispatch) => ({
    actionsSong: bindActionCreators(actionCreatorsSong, dispatch),
});

@connect(mapStateToProps, mapActionsToProps)
export default class SongEdit extends React.Component {

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
        if (this.props.song === null) { return null; }

        return(
            <div className="bc-page bc-song-edit">
                <AceEditor
                    ref="editor"
                    //width="100%"
                    //height="100%"
                    //mode="java"
                    theme="github"
                    fontSize={14}
                    showPrintMargin={false}
                    showGutter={false}
                    value={this.props.song.data}
                    onChange={this.onChange.bind(this)}
                    name="bc-song-editor"
                    editorProps={{blockScrolling: true}}
                />

                <ChordProView>
                    {this.props.song.data}</ChordProView>
            </div>
        );
    }

    onChange(songStr) {
        //console.log(this.refs.editor.editor.session.getLength());
        this.props.actionsSong.save(songStr);
    }

}


