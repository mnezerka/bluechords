import {assert, expect} from 'chai';
import {tokenize, parse, NodeChord, NodeChorus, NodeRow, NodeVerse} from './ChordPro';

describe('ChordPro Tokenizer', function() {

    it('empty song shall be tokenized', function () {
        let tokens = tokenize('');
        let expected = [ ['sof'], ['sol'], ['eol'], ['eof']];
        assert.deepEqual(expected, tokens);
    });

    it('song title shall be tokenized', function () {
        let tokens = tokenize('{title: This is title}');
        let expected = [
            ['sof'],
            ['sol'],
            ['directive', 'title: This is title'],
            ['eol'],
            ['eof']
        ];   
        assert.deepEqual(expected, tokens);
    });

    it('chords and lyrics shall be tokenized', function () {
        let tokens = tokenize('Before chords [C] between chords [Am] after chords');
        let expected = [
            ['sof'],
            ['sol'],
            ['lyric', 'Before chords '],
            ['chord', 'C'],
            ['lyric', ' between chords '],
            ['chord', 'Am'],
            ['lyric', ' after chords'],
            ['eol'],
            ['eof']
        ];   
        assert.deepEqual(expected, tokens);
    });

    it('comment shall be tokenized', function () {
        let tokens = tokenize('# This is comment');
        let expected = [
            ['sof'],
            ['sol'],
            ['comment', ' This is comment'],
            ['eol'],
            ['eof']
        ];   
        assert.deepEqual(expected, tokens);
    });

    it('multiple lines with chords and lyrics shall be tokenized', function () {
        let tokens = tokenize('{title: something}\nsecond line [C]\nthird line.');
        let expected = [
            ['sof'],
            ['sol'], ['directive', 'title: something'], ['eol'],
            ['sol'], ['lyric', 'second line '], ['chord', 'C'], ['eol'],
            ['sol'], ['lyric', 'third line.'], ['eol'],
            ['eof']
        ];   
        assert.deepEqual(expected, tokens);
    });

    it('empty lines are not ignored', function () {
        let tokens = tokenize('first line\n\n\nlast line');
        let expected = [
            ['sof'],
            ['sol'], ['lyric', 'first line'], ['eol'],
            ['sol'], ['eol'],
            ['sol'], ['eol'],
            ['sol'], ['lyric', 'last line'], ['eol'],
            ['eof']
        ];   
        assert.deepEqual(expected, tokens);
    });
});

function dumpSong(doc) {
    console.log('Title: ', doc.title);
    console.log('Subtitle: ', doc.subTitle);

    for (let i = 0; i < doc.body.length; i++) {
        let o = doc.body[i];
        if (o instanceof NodeRow) {
            console.log('node row');
            for (let j = 0; j < o.children.length; j++) {
                console.log(o.children[j]);
            }
        } else {
            console.log(doc.body[i]);
        }
    } 
}

describe('ChordPro Parser', function() {

    it('empty song shall be parsed', function () {
        //let song = parse('');
        let tokens = tokenize('');
        let song = parse(tokens);
        expect(song.title).is.equal(null);
        expect(song.subTitle).is.equal(null);
        expect(song.body).to.have.lengthOf(0);
    });

    it('title', function () {
        //let song = parse('');
        let tokens = tokenize('{title: This is title}');
        let song = parse(tokens);
        expect(song.title).is.equal('This is title');
    });

    it('subtitle', function () {
        //let song = parse('');
        let tokens = tokenize('{subtitle: This is subtitle}');
        let song = parse(tokens);
        expect(song.subTitle).is.equal('This is subtitle');
    });

    it('single line verse without chords', function () {
        //let song = parse('');
        let tokens = tokenize('\nThis is verse line\n');
        let song = parse(tokens);
        expect(song.body).to.have.lengthOf(1);
        let verse = song.body[0];
        expect(verse).to.be.an.instanceof(NodeVerse);
        expect(verse.children).to.have.lengthOf(1);
        let row = verse.children[0];
        expect(row).to.be.an.instanceof(NodeRow);
        //let verse = song.body[0];
        expect(row.children).to.have.lengthOf(1);
        let chord = row.children[0];
        expect(chord).to.be.an.instanceof(NodeChord);
        expect(chord.chord).is.equal('');
        expect(chord.text).is.equal('This is verse line');
    });

    it('single line verse with chords', function () {
        //let song = parse('');
        let tokens = tokenize('\nBefore[C]after [Am]end\n');
        let song = parse(tokens);
        expect(song.body).to.have.lengthOf(1);
        let verse = song.body[0];
        expect(verse).to.be.an.instanceof(NodeVerse);
        expect(verse.children).to.have.lengthOf(1);
        let row = verse.children[0];
        expect(row).to.be.an.instanceof(NodeRow);
        expect(row.children).to.have.lengthOf(3);
        let chord = row.children[0];
        expect(chord).to.be.an.instanceof(NodeChord);
        expect(chord.chord).is.equal('');
        expect(chord.text).is.equal('Before');
        chord = row.children[1];
        expect(chord).to.be.an.instanceof(NodeChord);
        expect(chord.chord).is.equal('C');
        expect(chord.text).is.equal('after ');
        chord = row.children[2];
        expect(chord).to.be.an.instanceof(NodeChord);
        expect(chord.chord).is.equal('Am');
        expect(chord.text).is.equal('end');
    });

    it('multiple line verse without chords', function () {
        //let song = parse('');
        let tokens = tokenize('\nline1\nline2\nline3\n');
        let song = parse(tokens);
        expect(song.body).to.have.lengthOf(1);
        let verse = song.body[0];
        expect(verse).to.be.an.instanceof(NodeVerse);
        expect(verse.children).to.have.lengthOf(3);

        let row = verse.children[0];
        expect(row).to.be.an.instanceof(NodeRow);
        expect(row.children).to.have.lengthOf(1);
        let chord = row.children[0];
        expect(chord).to.be.an.instanceof(NodeChord);
        expect(chord.chord).is.equal('');
        expect(chord.text).is.equal('line1');

        row = verse.children[1];
        expect(row).to.be.an.instanceof(NodeRow);
        expect(row.children).to.have.lengthOf(1);
        chord = row.children[0];
        expect(chord).to.be.an.instanceof(NodeChord);
        expect(chord.chord).is.equal('');
        expect(chord.text).is.equal('line2');

        row = verse.children[2];
        expect(row).to.be.an.instanceof(NodeRow);
        expect(row.children).to.have.lengthOf(1);
        chord = row.children[0];
        expect(chord).to.be.an.instanceof(NodeChord);
        expect(chord.chord).is.equal('');
        expect(chord.text).is.equal('line3');
    });

    it('chorus without chords', function () {
        //let song = parse('');
        let tokens = tokenize('\n{soc}\nline1\nline2\n{eoc}\n');
        let song = parse(tokens);
        expect(song.body).to.have.lengthOf(1);
        let verse = song.body[0];
        expect(verse).to.be.an.instanceof(NodeChorus);
        expect(verse.children).to.have.lengthOf(2);

        let row = verse.children[0];
        expect(row).to.be.an.instanceof(NodeRow);
        expect(row.children).to.have.lengthOf(1);
        let chord = row.children[0];
        expect(chord).to.be.an.instanceof(NodeChord);
        expect(chord.chord).is.equal('');
        expect(chord.text).is.equal('line1');

        row = verse.children[1];
        expect(row).to.be.an.instanceof(NodeRow);
        expect(row.children).to.have.lengthOf(1);
        chord = row.children[0];
        expect(chord).to.be.an.instanceof(NodeChord);
        expect(chord.chord).is.equal('');
        expect(chord.text).is.equal('line2');
    });

    it('simple song', function () {
        //let song = parse('');
        let songStr = '{title: Song title}\n' +
            '{subtitle: Song subtitle}\n\n' +
            'verse1 line1\n' +
            'verse1 line2\n\n' +
            '{soc}\n' +
            'chorus line1\n' +
            'chorus line2\n' +
            'chorus line3\n\n' +
            '{eoc}\n\n' +
            'verse2 line1';

        let tokens = tokenize(songStr);
        let song = parse(tokens);

        expect(song.title).is.equal('Song title');
        expect(song.subTitle).is.equal('Song subtitle');
        expect(song.body).to.have.lengthOf(3);

        let section = song.body[0];
        expect(section).to.be.an.instanceof(NodeVerse);
        expect(section.children).to.have.lengthOf(2);

        section = song.body[1];
        expect(section).to.be.an.instanceof(NodeChorus);
        expect(section.children).to.have.lengthOf(3);

        section = song.body[2];
        expect(section).to.be.an.instanceof(NodeVerse);
        expect(section.children).to.have.lengthOf(1);
    });

    
});



