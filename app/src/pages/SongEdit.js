import React, {Component} from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Mutation} from 'react-apollo'
import {Link} from 'react-router-dom'


const SONG_QUERY = gql`
    query Song($id: ID!) {
        song(id: $id) {
            id
            name
            content
        }
    }
`

const SONG_UPDATE = gql`
    mutation UpdateSong($id: ID!, $name: String!, $content: String!) {
        updateSong(id: $id, name: $name, content: $content) {
            id
            name
            content
        }
    }
`

const schema = Yup.object().shape({
      name: Yup.string().min(3, 'Song name too short').required('Song name is required'),
      content: Yup.string().required('Song content is required'),
});

class SongEdit extends Component
{
    render()
    {
        const id = this.props.match.params.id

        return (

            <Query query={SONG_QUERY} variables={{id}}>
                {({loading, error, data}) => {
                    if (loading || !data) return <div>Fetching</div>
                    if (error) return <div>Error</div>

                    return (
                        <div>
                            <Link to={'/song/' + data.song.id}>View</Link>
                            <Mutation
                                mutation={SONG_UPDATE}
                                onCompleted={() => { console.log('completed')}}
                            >
                                {(updateSong) => (

                                   <SongForm
                                        song={data.song}
                                        onSubmit={(formData) => {
                                            const {name, content} = formData;
                                            updateSong({variables: {id: data.song.id, name, content}})
                                        }}
                                   />
                                )}
                            </Mutation>
                        </div>
                    )
                }}
            </Query>
        )
    }
}

class SongForm extends Component
{

    render()
    {
        let song = this.props.song;
        song.content = song.content || '';

        return(
            <Formik
                initialValues={song}
                validationSchema={schema}
                onSubmit={this.props.onSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    isValid,
                }) => (
                    <Form
                        noValidate
                        onSubmit={handleSubmit}
                    >
                        <Form.Group controlId="songName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                isInvalid={touched.name && errors.name}
                            />
                        </Form.Group>

                        <Form.Group controlId="songContent">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="content"
                                rows="20"
                                value={values.content}
                                onChange={handleChange}
                                isInvalid={touched.content && errors.content}
                            />
                        </Form.Group>

                        <Button type="submit" disabled={isSubmitting}>Save</Button>
                    </Form>
                )}
            </Formik>
        )
    }
}

export default SongEdit
