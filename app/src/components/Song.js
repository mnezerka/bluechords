import React, { Component } from 'react'

class Song extends Component
{
    render()
    {
        return (
            <div>
                <div>
                    {this.props.song.name}
                </div>
            </div>
        )
    }
}

export default Song
