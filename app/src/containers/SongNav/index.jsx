import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreatorsSongs from 'actions/Song';
import {Navbar, FormGroup, DropdownButton, Button, MenuItem} from 'react-bootstrap';

const mapStateToProps = (state) => ({
    song: state.song.song,
    transposeStep: state.song.transposeStep,
});

const mapActionsToProps = (dispatch) => ({
    actionsSong: bindActionCreators(actionCreatorsSongs, dispatch)
});

@connect(mapStateToProps, mapActionsToProps)
export default class SongNav extends React.Component{

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    static propTypes = {
        actionsSong: React.PropTypes.object,
        transposeStep: React.PropTypes.number,
        song: React.PropTypes.object,
    }

    render() {
        let songName = this.props.song !== null ? this.props.song.name : '';
        return (
            <Navbar fluid>
                <Navbar.Header>
                    <Navbar.Brand>Song {songName}</Navbar.Brand>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Navbar.Form pullRight>
                        <FormGroup>
                            <TransposeCtrl
                                transposeStep={this.props.transposeStep}
                                onSelect={this.onTranspose.bind(this)}/>
                            {' '}
                            <Button onClick={this.onEdit.bind(this)}>Edit</Button>
                        </FormGroup>
                    </Navbar.Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }

    onTranspose(transposeStep) {
        this.props.actionsSong.transpose(transposeStep);
    }

    onEdit() {
        this.context.router.push(`/songs/${this.props.song.id}/edit`);
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
