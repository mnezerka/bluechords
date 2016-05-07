// Returns an ElementTree-based DOM using output from tokenizer()'
class Node {
    static EL_TYPE_ROOT = 'root';
    static EL_TYPE_META = 'meta';

    constructor(type = null) {
        this.children = [];
    }
}

class NodeRoot extends Node { };
class NodeMeta extends Node { };
class NodeHead extends Node { };
class NodeBody extends Node { };
class NodeComment extends Node { };
class NodeChord extends Node { };
class NodeRow extends Node { };
class NodeVerse extends Node { };

/*const LineBegin = 'LINE_BEGIN';
const VerseBegin = 'VERSE_BEGIN';
const TabBegin = 'TAB_BEGIN';
const ChorusBegin = 'CHORUS_BEGIN';*/

var LineBegin = {type:'line-begin'};
var VerseBegin = {type:'verse-begin'};
var TabBegin = {type:'tab-begin'};
var ChorusBegin = {type:'chorus-begin'};

function ltrim(str) {
    return str.replace(/^\s+/,"");
}


function arrayExtend(arr, other_arr) {
    // you should include a test to check whether other_array really is an array
    other_arr.forEach(function(v) {arr.push(v)}, arr);
}

// Test wether "o" is an Node
function isNode(o) {
    return o instanceof Node;
}

// Test wether "o" is an Comment'
function isComment(n) {
    return n instanceof NodeComment;
}

/*
Scan stack "s" for "t", pop and return between "t" and end of stack.
If item "t" is not found, then restore stack and return empty list.
*/
function pop_to_object(s, t) {
    console.log('pop to object enter stack:', s, ' look for:',  t);
    let result = [];
    if (s.length === 0)
        return result;

    let foundPos = null;
    for (let i = s.length - 1; i >= 0; i--) {
        if (s[i] === t) {
            foundPos = i;
            break;
        }
    }

    if (foundPos !== null) {    
        result = s.splice(foundPos, s.length - foundPos);
        result.shift();
    } 

    console.log('pop to object leave stack:', s, ' result:', result);

    return result; 
}

export function parse(tokens) {
     
    let root = new NodeRoot();

    let head = new NodeHead();
    root.children.push(head);

    let body = []; //new NodeBody();
    root.children.push(body);

    let stack = [{}, body] // bottommost stack member is the meta dict

    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        let ttype = token[0];
        let tvalue = token[1];

        console.log('token', token);

        switch (ttype) {
        case CHP_TOKEN_DIRECTIVE:
            directive_handler(tokens, stack, ttype, tvalue)
            break;
        case CHP_TOKEN_COMMENT:
            stack.push(new Node(Node.EL_TYPE_COMMENT, tvalue));
            break;
        case CHP_TOKEN_CHORD:
            // always maintain a chord:lyric pairing on the stack
            stack.append(Element('cho', {'c':tvalue.strip()}))
            stack[stack.length - 1].text = ''
            break;
        case CHP_TOKEN_LYRIC:
            // if a lyric appears before a chord, assume a blank chord
            tvalue = ltrim(tvalue);
            console.log('stack here', stack);
            if (tvalue.length > 0) {
                if (!isNode(stack[stack.length - 1]) || !stack[stack.length - 1] instanceof NodeChord) {
                    stack.push(new NodeChord(''));
                    stack[stack.length - 1].text = '';
                }
                stack[stack.length - 1].text = stack[stack.length - 1].text + tvalue
            }
            console.log('stack here2', stack);
            break;
        case CHP_TOKEN_SOL:
            stack.push(LineBegin)
            break;
        case CHP_TOKEN_EOL:
            // offload large chunk of logic to eol_handler()
            // this is also where the parts of the DOM are moved from the 
            //   stack to the document
            eol_handler(tokens, stack, ttype, tvalue)
            break;
        case CHP_TOKEN_SOF:
            break;
        case CHP_TOKEN_EOF:
            eol_handler(tokens, stack, ttype, tvalue)
            break;
        default:
            throw `Unrecognized token ${ttype} (${tvalue}) at line xxx`;
        }
    }
    /*
    
    # update metadata
    meta = stack[0]
    if 'title' in meta:
        e = Element('title')
        e.text = meta['title']
        head.append(e)
    if 'subtitle' in meta:
        e = Element('subtitle')
        e.text = meta['subtitle']
        head.append(e)
    if 'define' in meta and len(meta['define']):
        for d in meta['define']:
            e = Element('define')
            e.text = d
            head.append(e)
    */

    return root; 
}




/*
Parser handler of end-of-line and end-of-file events

This is largely where elements are moved from the stack and put into
the document.
*/
function eol_handler(tokens, stack, ttype, tvalue) {
   
    // get list of object on current line
    let line = pop_to_object(stack, LineBegin)
    
    if (line.length > 0) {
        let allComments = true;
        for (let i = 0; i < line.lenght; i++) {
            if (!isComment(line[i])) {
                allComments = false;
                break;
            }
        }
        if (allComments) {
            // current line contains nothing but Comment objects
            stack = arrayExtend(stack, line);
        } else {
            r = new NodeRow();
            stack.push(r);
            r.children = arrayExtend(r.children, line);
        }
    } else {
        //  odds are we're currently parsing a blank line
        // - which is used to separate verse blocks
        let inChorus = false;

        // check if we are inside chorus
        for (const o of stack.reverse()) {
            if (o === ChorusBegin) {
                inChorus = True;
                break
            }
        }

        // if we're in a chrous, stay in chorus mode
        // else, stop verse and start new verse
        if (!inChorus) {
            let verse = pop_to_object(stack, VerseBegin)
            
            if (verse.length > 0) {
                let v = new NodeVerse();
                stack[1].push(v);
                v.children = arrayExtend(v.children, verse);

            } else {
                // we're not in a verse, so move everything from the 
                // stack to the document
                let l = []
                while (stack.length > 2 && stack[-1] instanceof Node) {
                    l.insert(0, stack.pop())
                }
                stack[1].children = arrayExtend(stack[1].children, l);

            } 
            stack.push(VerseBegin)
        }
    }
}
// Sets a key:value pair in the metadata at stack[0]'
function set_meta(stack, key, value) {
    stack[0][key] = value;
}

// Parser handler for all directives'
function directive_handler(tokens, stack, ttype, tvalue) {
    let tag = tvalue;
    let arg = '';
    if (tvalue.indexOf(':') > 0) {
        tag = tvalue.substring(0, tvalue.indexOf(':')).trim();
        arg = tvalue.substring(0, tvalue.indexOf(':') + 1).trim();
    }

    tag = tag.toLowerCase();
    
    if (['t', 'title'].indexOf(tag) >= 0) {
        if (arg.length === 0) { throw `{${tag}} directive needs an argument`; }
        set_meta(stack, 'title', arg)

    } else if (['st', 'subtitle'].indexOf(tag) >= 0) {
        if (arg.length === 0) { throw `{${tag}} directive needs an argument`; }
        set_meta(stack, 'subtitle', arg);

    } else if (['c', 'comment'].indexOf(tag) >= 0) {
        if (arg.length === 0) { throw `{${tag}} directive needs an argument`; }
        let c = new NodeComment();
        c.text = arg;
        stack[1].push(c);

    } else if (['soc', 'start_of_chorus'].indexOf(tag) >= 0) {
        // close the current verse, if any, then start a chorus
        if (arg.length > 0) { throw `{${tag}} directive needs no argument (${arg})`; }
        pop_to_object(stack, LineBegin)
        let verse = pop_to_object(stack, VerseBegin)
        if (verse.length > 0) {
            v = new NodeVerse();
            stack.push(v);
            v.children = arrayExtend(v.children, verse);
        }
        stack.push(ChorusBegin)

    } else if (['eoc', 'end_of_chorus'].indexOf(tag) >= 0) {
        // close the current chorus, but don't start a verse
        // - that's done after an sol token
        if (arg.length > 0) { throw `{${tag}} directive needs no argument (${arg})`; }
        pop_to_object(stack, LineBegin)
        let c = new NodeChorus();
        stack[1].push(c)
        let chorus = pop_to_object(stack, ChorusBegin)
        c.children = arrayExtend(c.children, chorus);

    } else if (tag === 'tab') {
        if (arg.length === 0) { throw `{${tag}} directive needs an argument`; }
        let t = new NodeTab();
        t.text = arg;
        stack[1].push(t);

    } else if (['np', 'new_page', 'npp', 'new_physical_page', 'ns', 'new_song', 'rowname'].indexOf(tag) >= 0) {
    
        // haven't implemented these yet, don't want them throwing errors either
        // ...they're basically just rendering hints anyway
    
    } else {
        /*
        TODO: do we need a catchall for {directive}?
        TODO: directives seen in other parsers:
        TODO: - textfont, textsize
        TODO: - chordfont, chordsize
        TODO: - ng, no_grid
        TODO: - g, grid
        */
        throw `Unimplemented directive ${tag}`
    }
}


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
const CHP_TOKEN_SOF = 'sof';
const CHP_TOKEN_EOF = 'eof';


export function tokenize(text) {
        
    var result = [];
    result.push([CHP_TOKEN_SOF]);

    var lines = text.split('\n');
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

            // TODO:
            /*if ttype == 'directive' and tvalue in ('sot', 'start_of_tab'):
                tvalue = preformatted_tokenize(lines, r'^\s*\{(eot|end_of_tab)\}\s*$')
                tvalue = 'tab:' + ''.join([v[1] for v in tvalue])
            yield (lineno + 1, ttype, tvalue)
            */
        }

        result.push([CHP_TOKEN_EOL]);
    }

    result.push([CHP_TOKEN_EOF]);

    return result;
}

