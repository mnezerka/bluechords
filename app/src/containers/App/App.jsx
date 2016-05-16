import React from 'react';
import {Navbar, Nav, NavItem, Glyphicon} from 'react-bootstrap';
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

export default class App extends React.Component{

    static propTypes = {
        children: React.PropTypes.object,
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

                    <div className="bc-menu">
                        <Nav bsStyle="pills" stacked activeKey={1} onSelect={this.onAction.bind(this)}>
                            <NavItem eventKey="add" disabled={false}>
                                <Glyphicon glyph="plus"/>{' '}Add Song 
                            </NavItem>
                        </Nav>
                    </div>
   
                    {this.props.children}
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
    }
}


