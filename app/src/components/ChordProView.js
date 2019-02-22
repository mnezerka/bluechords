import React, {Component} from 'react';
import {tokenize, parse, NodeChord, NodeChorus, NodeRow, NodeVerse} from '../utils/ChordPro';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {transpose} from '../utils/ChordProUtils';
//import './ChordProView.styl';

class Text extends Component {

    render()
    {
        let text = this.props.children;
        if (text === null || text.length === 0) {
            text = '';
        }
        return (<td className="bc-chordpro-view-text">{text}</td>);
    }
}

class Chord extends Component {

    render() {
        let chord = this.props.children;
        return (<td className="bc-chordpro-view-chord">{chord}</td>);
    }
}

class Row extends Component {

    renderChordRow() {
        let row = this.props.children;
        let result = [];
        let counter = 0;
        for (const item of row.children) {
            if (item  instanceof NodeChord) {
                result.push(<Chord key={counter++}>{item.chord}</Chord>);
            }
        }
        return result;
    }

    renderTextRow() {
        let row = this.props.children;
        let result = [];
        let counter = 0;
        for (const item of row.children) {
            if (item  instanceof NodeChord) {
                result.push(<Text key={counter++}>{item.text}</Text>);
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

class Verse extends Component {

    render() {
        let verse = this.props.children;
        let items = [];
        for (let rowIx = 0; rowIx < verse.children.length; rowIx++) {
            if (verse.children[rowIx] instanceof NodeRow) {
                items.push(<Row key={rowIx}>{verse.children[rowIx]}</Row>); 
            }
        }
        return (<div className="bc-chordpro-view-verse">{items}</div>);
    }
}

class Chorus extends Component {

    render() {
        let verse = this.props.children;
        let items = [];
        for (let rowIx = 0; rowIx < verse.children.length; rowIx++) {
            if (verse.children[rowIx] instanceof NodeRow) {
                items.push(<Row key={rowIx}>{verse.children[rowIx]}</Row>); 
            }
        }
        return (<div className="bc-chordpro-view-chorus">{items}</div>);
    }
}

export default class ChordProView extends Component{

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
                items.push(<Verse key={i}>{item}</Verse>);
            }
            else if (item instanceof NodeChorus) {
                items.push(<Chorus key={i}>{item}</Chorus>);
            }
        }
        return (
            <div className="bc-chordpro-view">
                <TransposeCtrl
                    transposeStep={this.state.transposeStep}
                    onSelect={this.onTranspose.bind(this)}/>
                {song.title !== null && <h1>{song.title}</h1>}
                {song.subTitle !== null && <h2>{song.subTitle}</h2>}
                {items}
            </div>
        )
    }

    onTranspose(transposeStep) {
        this.setState({transposeStep: parseInt(transposeStep)});
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

class TransposeCtrl extends Component {

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
                variant="secondary-outline"
                alignRight
                onSelect={this.props.onSelect} title={stepLabel}>
                <Dropdown.Item eventKey={-6}>-6</Dropdown.Item>
                <Dropdown.Item eventKey={-5}>-5</Dropdown.Item>
                <Dropdown.Item eventKey={-4}>-4</Dropdown.Item>
                <Dropdown.Item eventKey={-3}>-3</Dropdown.Item>
                <Dropdown.Item eventKey={-2}>-2</Dropdown.Item>
                <Dropdown.Item eventKey={-1}>-1</Dropdown.Item>
                <Dropdown.Item eventKey={0}>Original tuning</Dropdown.Item>
                <Dropdown.Item eventKey={1}>+1</Dropdown.Item>
                <Dropdown.Item eventKey={2}>+2</Dropdown.Item>
                <Dropdown.Item eventKey={3}>+3</Dropdown.Item>
                <Dropdown.Item eventKey={4}>+4</Dropdown.Item>
                <Dropdown.Item eventKey={5}>+5</Dropdown.Item>
                <Dropdown.Item eventKey={6}>+6</Dropdown.Item>
            </DropdownButton>
        );
    }
}
