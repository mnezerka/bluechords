import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreatorsSongs from 'actions/Song';
import {Navbar, FormGroup, DropdownButton, MenuItem} from 'react-bootstrap';

const mapStateToProps = (state) => ({
    transposeStep: state.song.transposeStep,
});

const mapActionsToProps = (dispatch) => ({
    actionsSong: bindActionCreators(actionCreatorsSongs, dispatch)
});

@connect(mapStateToProps, mapActionsToProps)
export default class SongNav extends React.Component{

    static propTypes = {
        actionsSong: React.PropTypes.object,
        transposeStep: React.PropTypes.number
    }

    render() {
        return (
            <Navbar fluid>
                <Navbar.Header>
                    <Navbar.Brand>Song</Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Form pullLeft>
                        <FormGroup>
                            <TransposeCtrl
                                transposeStep={this.props.transposeStep}
                                onSelect={this.onTranspose.bind(this)}/>
                        </FormGroup>
                    </Navbar.Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }

    onTranspose(transposeStep) {
        this.props.actionsSong.transpose(transposeStep);
    }
}

const transposeSteps = [
    [-6, '-6'],
    [-5, '-5'],
    [-4, '-4'],
    [-3, '-3'],
    [-2, '-2'],
    [-1, '-1'],
    [0, 'Original tuning'],
    [1, '+1'],
    [2, '+2'],
    [3, '+3'],
    [4, '+4'],
    [5, '+5'],
    [6, '+6']
];


class TransposeCtrl extends React.Component {

    static propTypes = {
        onSelect: React.PropTypes.func,
        transposeStep: React.PropTypes.number
    };

    static defaultProps = {
        onSelect: () => {},
        transposeStep: 0 
    }

    render() {

        // find step label
        let stepLabel = 'N/A';
        for (let step of transposeSteps) {
            if (step[0] === this.props.transposeStep) {
                stepLabel = step[1];
            }
        }
        
        return(
            <DropdownButton
                onSelect={this.props.onSelect} title={stepLabel} id="bc-transpose-ctrl">
                <MenuItem eventKey={-6}>-6</MenuItem> 
                <MenuItem eventKey={-5}>-5</MenuItem> 
                <MenuItem eventKey={-4}>-4</MenuItem> 
                <MenuItem eventKey={-3}>-3</MenuItem> 
                <MenuItem eventKey={-2}>-2</MenuItem> 
                <MenuItem eventKey={-1}>-1</MenuItem> 
                <MenuItem eventKey={0}>Original tuning</MenuItem> 
                <MenuItem eventKey={1}>+1</MenuItem> 
                <MenuItem eventKey={2}>+2</MenuItem> 
                <MenuItem eventKey={3}>+3</MenuItem> 
                <MenuItem eventKey={4}>+4</MenuItem> 
                <MenuItem eventKey={5}>+5</MenuItem> 
                <MenuItem eventKey={6}>+6</MenuItem> 
            </DropdownButton>
        );
    }
}
