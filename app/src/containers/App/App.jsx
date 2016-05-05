import React from 'react';
import {connect} from 'react-redux';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import * as actionCreatorsSong from 'actions/Song';
import './App.styl';

const mapStateToProps = (state) => ({
    text: state.song.text
});

const mapActionsToProps = (dispatch) => ({
    actionsSong : bindActionCreators(actionCreatorsSong, dispatch)
});

@connect(mapStateToProps, mapActionsToProps)
export default class App extends React.Component{

    static propTypes = {
        actionsSong: React.PropTypes.object
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
                    <svg width="500" height="800">
                        <circle cx={50} cy={50} r={10} fill="red" />
                        <text x="0" y="15" fill="black" font-size="60">I love SVG!</text>
                        {true && <rect x="0" y="0" width="500" height="800"
                          stroke="black" stroke-width="1" fill="none" />}
                    </svg>
                </div>

            </div>
        )
    }

}
