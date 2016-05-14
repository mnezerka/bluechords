import React from 'react';
import {connect} from 'react-redux';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import * as actionCreatorsSong from 'actions/Song';
import * as actionCreatorsSongs from 'actions/Songs';
import brace from 'brace';
import AceEditor from 'react-ace';
import ChordProView from 'components/ChordProView';
import SongsList from 'components/SongsList';
import './App.styl';

import 'brace/mode/java';
import 'brace/theme/github';


const mapStateToProps = (state) => ({
    songStr: state.song.songStr,
    songs: state.songs.data,
});

const mapActionsToProps = (dispatch) => ({
    actionsSong: bindActionCreators(actionCreatorsSong, dispatch),
    actionsSongs: bindActionCreators(actionCreatorsSongs, dispatch)
});

@connect(mapStateToProps, mapActionsToProps)
export default class App extends React.Component{

    static propTypes = {
        actionsSong: React.PropTypes.object
    }

    componentWillMount() {
        this.fetchSongs();
    }

    fetchSongs(col, asc, pageSize, page) {
        this.props.actionsSongs.fetchSongs();
    }

    render() {

        return (
            <div className="bc-container">
                <Navbar fluid>
                    <Navbar.Header>
                        <Navbar.Brand>
                            BlueChords
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>
    
                <div className="bc-content">
                    {false && <AceEditor
                        ref="editor"
                        //width="100%"
                        //mode="java"
                        theme="github"
                        fontSize={14}
                        showPrintMargin={false}
                        showGutter={false}
                        value={this.props.songStr}
                        onChange={this.onChange.bind(this)}
                        name="bc-song-editor"
                        editorProps={{blockScrolling: true}}
                    />}

                    {false && <ChordProView>
                        {this.props.songStr}
                    </ChordProView>}

                    <SongsList
                       songs={this.props.songs} />
                </div>

            </div>
        )
    }

    onChange(songStr) {
        console.log(this.refs.editor.editor.session.getLength());
        this.props.actionsSong.save(songStr);
    }
}


