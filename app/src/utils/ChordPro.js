/*
Splits bytes from infile into tokens for the parser.

Returns an iterator which delivers tokens in the tuple form:
    (line number, token type, token value)

There are currently 8 token types:
'directive': chordpro directives, found in {curly braces}; the token
    value will be the full text of the directive including the
    arguments, if any - also note that unparsed {tab} contents are 
    returned as the argument to a {tab} directive
'chord': inline chord notation, found in [square brackets]
'comment': sh-style source-code comment, found between an octothorpe
    and the end of line - not to be confused with a sharp symbol, 
    which is found in a chord token using the same character - also
    do not confuse this kind of comment with a chordpro-style
    {comment} directive, which is actually a text block
'lyric': just about any other kind of text
'sof', 'eof': start of file, end of file
'sol', 'eol': start of line, end of line
*/
const CHP_TOKEN_DIRECTIVE = 'directive';
const CHP_TOKEN_COMMENT = 'comment';
const CHP_TOKEN_CHORD = 'chord';
const CHP_TOKEN_LYRIC = 'lyric';
const CHP_TOKEN_SOL = 'sol';
const CHP_TOKEN_EOL = 'eol';

export function tokenize(text) {

        
    let tokentypes = ['directive', 'chord', 'comment', 'lyric'];

    /*
    pattern = re.compile(
        \s* \{ ( [^}]+ ) \} # directive (meta or block)
    |
        \[ ( [^\]]+ ) \]    # chord
    |
        \s* \#  ( .+ )      # comment - only if # is not in chord or directive
    |
        ( [^[]+ )           # lyric
    ''', re.VERBOSE)
    */
    var result = [];
    var lines = text.split('\n');
    console.log(lines);
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        result.push([CHP_TOKEN_SOL]);

        // check directive
        let pattern = /\s*{([^}]+)}|\[([^\]]+)\]|\s*#(.+)|([^[]+)/g;

        let m = null;
        while ((m = pattern.exec(line)) !== null) {
            
            if (m[1] !== undefined) {
                result.push([CHP_TOKEN_DIRECTIVE, m[1]]);
            }
            if (m[2] !== undefined) {
                result.push([CHP_TOKEN_CHORD, m[2]]);
            }
            if (m[3] !== undefined) {
                result.push([CHP_TOKEN_COMMENT, m[3]]);
            }
            if (m[4] !== undefined) {
                result.push([CHP_TOKEN_LYRIC, m[4]]);
            }
        }

        result.push([CHP_TOKEN_EOL]);
    }
    

    return result;

/*
    yield (1, 'sof', '') 
    # wrap readlines() in iterator so can be passed to preformatted_tokenizer()
    lines = iter(enumerate(infile.readlines()))
        
    for lineno, line in lines:
        yield (lineno+1, 'sol', '') 
            
        line = line.rstrip()
        for tokens in pattern.findall(line):
            (ttype, tvalue) = [t for t in zip(tokentypes, tokens) if t[1] != ''][0]
            if ttype == 'directive' and tvalue in ('sot', 'start_of_tab'):
                tvalue = preformatted_tokenize(lines, r'^\s*\{(eot|end_of_tab)\}\s*$')
                tvalue = 'tab:' + ''.join([v[1] for v in tvalue])
            yield (lineno + 1, ttype, tvalue)
            
        yield (lineno + 1, 'eol'
*/
}


