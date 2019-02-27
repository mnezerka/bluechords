import React, {Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {parse, tokenize} from 'js-chordpro';


class SongForm extends Component
{
    constructor(...args)
    {
        super(...args);

        let props = args[0]

        let content = props.song.content || '{title: Song Title}\n{artist: Song Artist}\n\nSong lyrics';

        let {song, valid, errorMsg} = this.processContent(content)

        this.state = {
            song,
            content,
            valid,
            errorMsg
        }
    }

    processContent(content)
    {
        let result = {content}

        try {
            result.song = parse(tokenize(content));
            result.valid = true;
            result.errorMsg = null;
        }
        catch(err) {
            // ignore errors caused by invalid
            result.song = {};
            result.valid = false;
            result.errorMsg = err.message;
        }

        return result;
    }

    render()
    {
        const song = this.state.song;

        return(
            <Form
                noValidate
                validated={this.contentValid}
                onSubmit={this.onSubmit.bind(this)}
            >
                <Form.Group as={Row} controlId="songName">
                    <Form.Label column sm="2">Name:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            plaintext
                            readOnly
                            value={song.title || ''} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="songArtist">
                    <Form.Label column sm="2">Artist:</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            plaintext
                            readOnly
                            value={song.artist || ''} />
                    </Col>
                </Form.Group>

                <Form.Group controlId="songContent">
                    <Form.Label>Song Content:</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="content"
                        rows="20"
                        value={this.state.content}
                        onChange={this.onContentChange.bind(this)}
                        isInvalid={!this.state.valid}
                    />
                </Form.Group>

                {!this.state.contentValid &&
                    <div><i>{this.state.errorMsg}</i></div>
                }

                <ButtonToolbar>
                    <Button variant="outline-secondary" onClick={this.props.onCancel}>Cancel</Button>
                    <Button variant="outline-primary" type="submit">Save</Button>
                </ButtonToolbar>


            </Form>
        )
    }

    onContentChange(e)
    {
        const newState = this.processContent(e.target.value)

        this.setState(newState);
    }

    onSubmit(e)
    {
        e.preventDefault();
        if (this.state.valid && this.props.onSubmit) {
            const result = {
                content: this.state.content,
                name: this.state.song.title,
                artist: this.state.song.artist
            }
            this.props.onSubmit(result);
        }
    }
}

export default SongForm
