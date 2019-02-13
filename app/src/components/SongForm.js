import React, {Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import {tokenize, parse} from '../utils/ChordPro';


class SongForm extends Component
{
    constructor(...args)
    {
        super(...args);

        let props = args[0]

        this.state = {
            name: null,
            artist: null,
            content: props.song.content || '{t: Song Title}\n{st: Sont Artist}\n\nSong lyrics',
            contentValid: true,
            errorMsg: null
        }
    }

    componentWillReceiveProps(nextProps)
    {
        console.log(nextProps)
    }

    render()
    {
        //let song = this.props.song;
        //song.content = song.content || '';

        let songHeader = '';
        songHeader += 'Name: ' + (this.state.name || '') + ' '
        songHeader += 'Artist: ' + (this.state.artist || '')

        //console.log(this.state)

        return(
            <Form
                noValidate
                validated={this.contentValid}
                onSubmit={console.log}
            >
                <div>{songHeader}</div>
                <Form.Group controlId="songContent">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="content"
                        rows="20"
                        value={this.state.content}
                        onChange={this.onContentChange.bind(this)}
                        isInvalid={!this.state.contentValid}
                    />
                </Form.Group>

                {!this.state.contentValid &&
                    <div><i>{this.state.errorMsg}</i></div>
                }

                <Button type="submit">Save</Button>
            </Form>
        )
    }

    onContentChange(e)
    {
        let newState = {content: e.target.value}

        try {
            let song = parse(tokenize(newState.content));

            if (song.title) {
                newState.name = song.title
            }

            if (song.subTitle) {
                newState.artist = song.subTitle
            }
            newState.contentValid = true;
        }
        catch(err) {
            // ignore errors caused by invalid
            newState.contentValid = false;
            newState.errorMsg = err.message;
        }

        this.setState(newState);
    }
}

export default SongForm
