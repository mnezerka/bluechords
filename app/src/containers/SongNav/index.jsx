import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreatorsSongs from 'actions/Song';
import {Navbar, FormGroup,  Button} from 'react-bootstrap';
import BasicNav from 'containers/BasicNav';

const mapStateToProps = (state) => ({
    song: state.song.song,
    isAuthenticated: state.auth.isAuthenticated
});

const mapActionsToProps = (dispatch) => ({
    actionsSong: bindActionCreators(actionCreatorsSongs, dispatch)
});

@connect(mapStateToProps, mapActionsToProps)
export default class SongNav extends React.Component{

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    static propTypes = {
        actionsSong: React.PropTypes.object,
        song: React.PropTypes.object,
        isAuthenticated: React.PropTypes.bool 
    }

    static defaultProps = {
        isAuthenticated: false
    }

    render() {
        let songName = this.props.song !== null ? this.props.song.name : '';

        return (
            <BasicNav
                title="Song"
                subTitle={songName}>

                <Navbar.Form pullRight>
                    <FormGroup>
                        {this.props.isAuthenticated && <Button onClick={this.onEdit.bind(this)}>Edit</Button>}
                    </FormGroup>
                </Navbar.Form>

            </BasicNav>
        )
    }

    onEdit() {
        this.context.router.push(`${config.path}songs/${this.props.song.id}/edit`);
    }
}
