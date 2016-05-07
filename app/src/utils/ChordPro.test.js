import {assert, expect} from 'chai';
import {tokenize, parse} from './ChordPro';

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

describe('ChordPro Parser', function() {

    it('empty song shall be parsed', function () {
        //let song = parse('');
        let tokens = tokenize('\nfirst line\nsecond line');
        let song = parse(tokens);

        console.log('-------------------');
        console.log(song);
        console.log('-------------------');
        //let expected = [ ['sol'], ['eol'] ];   
        //assert.deepEqual(expected, tokens);
    });

});



