import React from 'react';
import {Navbar, Nav, NavItem, FormGroup, Button, FormControl, Glyphicon} from 'react-bootstrap';
//import brace from 'brace';
import './App.styl';

/*
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


*/

const ACT_SONGS = 'songs';
const ACT_ADD = 'add';
const ACT_SONGBOOKS = 'songbooks';

export default class App extends React.Component{

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    static propTypes = {
        children: React.PropTypes.object,
    }

    render() {

        return (
            <div className="bc-container">
                {this.props.nav}

                <div className="bc-content">

                    <div className="bc-menu">
                        <Nav bsStyle="pills" stacked activeKey={1} onSelect={this.onAction.bind(this)}>
                            <NavItem eventKey={ACT_SONGS}>
                                <Glyphicon glyph="list"/>Songs
                            </NavItem>
                            <NavItem eventKey={ACT_ADD} disabled={true}>
                                <Glyphicon glyph="plus"/>Add Song 
                            </NavItem>
                            <NavItem eventKey={ACT_SONGBOOKS} disabled={true}>
                                <Glyphicon glyph="list-alt"/>Songbooks
                            </NavItem>

                        </Nav>
                    </div>
   
                    {this.props.main}
                </div>
            </div>
        )
    }

    /*onChange(songStr) {
        //console.log(this.refs.editor.editor.session.getLength());
        this.props.actionsSong.save(songStr);
    }*/

    onAction(action) {
        console.log('action:', action);
        switch (action) {
        case ACT_SONGS:
            this.context.router.push('/');
            break;
        }

    }
}


