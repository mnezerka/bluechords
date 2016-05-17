import React from 'react';
import ChordProView from 'components/ChordProView';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreatorsSong from 'actions/Song';
import {DropdownButton, MenuItem} from 'react-bootstrap';

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

    constructor(props) {
        super(props);
        this.state = {
            transposeStep: 0
        }
    }

    componentWillMount() {
        let songId = this.props.params.songId;
        this.props.actionsSong.fetchSong(songId);
    }

    render() {
        if (this.props.song === null) { return null; }

        return(
            <div>
                <TrasposeCtrl
                    transposeStep={this.state.transposeStep}
                    onSelect={this.onTranspose.bind(this)}/>
                <ChordProView>{this.props.song.data}</ChordProView>
            </div>
        );
    }

    onTranspose(transposeStep) {
        this.setState({transposeStep});
    }
}

var transposeSteps = [
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


class TrasposeCtrl extends React.Component {

    static propTypes = {
        onSelect: React.PropTypes.func,
        transposeStep: React.PropTypes.number
    };

    static defaultProps = {
        onSelect: () => {},
        transposeStep: 0 
    }

    render() {

        console.log(this.props);

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
