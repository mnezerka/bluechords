import React from 'react';
import {tokenize, parse, NodeChord, NodeChorus, NodeRow, NodeVerse} from 'utils/ChordPro';
import './ChordProView.styl';

class ChordText extends React.Component {
    render() {
        let chordText = this.props.children;

        return (
            <span className="bc-chordpro-view-chordtext">
                <span className="bc-chordpro-view-chord">{chordText.chord}</span>
                <span>{chordText.text}</span>
        </span>);
    }
}


class Row extends React.Component {
    render() {
        let row = this.props.children;
        let items = [];
        for (let i = 0; i < row.children.length; i++) {
            if (row.children[i] instanceof NodeChord) {
                items.push(<ChordText>{row.children[i]}</ChordText>);
            }
        }

        return (<div className="bc-chordpro-view-row">{items}</div>);
    }

}

class Verse extends React.Component {

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
        children: React.PropTypes.string,
    }

    render() {

        let song = null;
        let error = null;
        try {
            let tokens = tokenize(this.props.children);
            song = parse(tokens);
        } catch (e) {
            return(<div className="bc-chordpro-view"> {e}</div>);
        }

        console.log(song);

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
