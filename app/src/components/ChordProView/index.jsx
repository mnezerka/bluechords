import React from 'react';
import {tokenize, parse, NodeChord, NodeChorus, NodeRow, NodeVerse} from 'utils/ChordPro';
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
                <tr>{this.renderChordRow()}</tr>
                <tr>{this.renderTextRow()}</tr>
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


    render() {
        let song = null;
        try {
            let tokens = tokenize(this.props.children);
            song = parse(tokens);
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
            </div>
        )
    }
}
