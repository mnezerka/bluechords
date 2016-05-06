import {assert, expect} from 'chai';
import {tokenize} from './ChordPro';

describe('ChordPro', function() {

    it('parse song', function () {
        let tokens = tokenize('{title: This is title}\n\nThis is verse line\n');
        console.log('this is output', tokens);
        //expect(x).to.deep.equal([{type:1, lines: ['']}]);
    });

    it('parse chord line', function () {
        let tokens = tokenize('Before chord [C]after chord');
        console.log('this is output', tokens);
        //expect(x).to.deep.equal([{type:1, lines: ['']}]);
    });

});
