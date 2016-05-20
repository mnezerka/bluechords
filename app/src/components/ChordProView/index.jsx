import React from 'react';
import {tokenize, parse, NodeChord, NodeChorus, NodeRow, NodeVerse} from 'utils/ChordPro';
import {ButtonGroup, DropdownButton, MenuItem} from 'react-bootstrap';

import {transpose} from 'utils/ChordProUtils';
import './ChordProView.styl';

class Text extends React.Component {

    static propTypes = {
        children: React.PropTypes.string
    }

    render() {
        let text = this.props.children;
        if (text === null || text.length === 0) {
            text = '';
        }
        return (<td className="bc-chordpro-view-text">{text}</td>);
    }
}

class Chord extends React.Component {

    static propTypes = {
        children: React.PropTypes.string
    }

    render() {
        let chord = this.props.children;
        return (<td className="bc-chordpro-view-chord">{chord}</td>);
    }
}

class Row extends React.Component {

    static propTypes = {
        children: React.PropTypes.shape({
            children: React.PropTypes.array
        })
    }

    renderChordRow() {
        let row = this.props.children;
        let result = [];
        for (const item of row.children) {
            if (item  instanceof NodeChord) {
                result.push(<Chord>{item.chord}</Chord>);
            }
        }
        return result;
    }

    renderTextRow() {
        let row = this.props.children;
        let result = [];
        for (const item of row.children) {
            if (item  instanceof NodeChord) {
                result.push(<Text>{item.text}</Text>);
            }
        }
        return result;

    }

    render() {
        return (
            <table className="bc-chordpro-view-row">
                <tbody>
                    <tr>{this.renderChordRow()}</tr>
                    <tr>{this.renderTextRow()}</tr>
                </tbody>
            </table>
        );
    }

}

class Verse extends React.Component {

    static propTypes = {
        children: React.PropTypes.shape({
            children: React.PropTypes.array
        })
    }

    render() {
        let verse = this.props.children;
        let items = [];
        for (let rowIx = 0; rowIx < verse.children.length; rowIx++) {
            if (verse.children[rowIx] instanceof NodeRow) {
                items.push(<Row>{verse.children[rowIx]}</Row>); 
            }
        }
        return (<div className="bc-chordpro-view-verse">{items}</div>);
    }
}

class Chorus extends React.Component {

    static propTypes = {
        children: React.PropTypes.shape({
            children: React.PropTypes.array
        })
    }

    render() {
        let verse = this.props.children;
        let items = [];
        for (let rowIx = 0; rowIx < verse.children.length; rowIx++) {
            if (verse.children[rowIx] instanceof NodeRow) {
                items.push(<Row>{verse.children[rowIx]}</Row>); 
            }
        }
        return (<div className="bc-chordpro-view-chorus">{items}</div>);
    }
}

export default class ChordProView extends React.Component{

    static propTypes = {
        transposeStep: React.PropTypes.number,
        children: React.PropTypes.string,
    }

    static defaultProps = {
        transposeStep: 0
    }

    constructor(props) {
        super(props);
        this.state = {
            transposeStep: 0
        }
    }

    render() {
        let song = null;
        try {
            let tokens = tokenize(this.props.children);
            song = parse(tokens);
            if (this.state.transposeStep !== 0) {
                transpose(song, this.state.transposeStep);
            }
        } catch (e) {
            return(<div className="bc-chordpro-view"> {e}</div>);
        }

        let items = [];
        for (let i = 0; i < song.body.length; i++) {
            let item = song.body[i];
 
            if (item instanceof NodeVerse) {
                items.push(<Verse>{item}</Verse>);
            }
            else if (item instanceof NodeChorus) {
                items.push(<Chorus>{item}</Chorus>);
            }
        }
        return (
            <div className="bc-chordpro-view">
                {song.title !== null && <h1>{song.title}</h1>}
                {song.subTitle !== null && <h2>{song.subTitle}</h2>}
                {items}
                <ButtonGroup
                    className="bc-chordpro-view-ctrl-group">
                    <TransposeCtrl
                        transposeStep={this.state.transposeStep}
                        onSelect={this.onTranspose.bind(this)}/>
                </ButtonGroup>
            </div>
        )
    }

    onTranspose(transposeStep) {
        this.setState({transposeStep});
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
                pullRight
                bsSize="small"
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
