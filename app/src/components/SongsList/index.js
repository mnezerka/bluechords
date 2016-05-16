import React from 'react';
import {Glyphicon} from 'react-bootstrap';
import './SongsList.styl';

class TableHeadItem extends React.Component {
    static propTypes = {
        onSort: React.PropTypes.func,
        sort: React.PropTypes.object,
        sortField: React.PropTypes.string,
        children: React.PropTypes.node,
        className: React.PropTypes.string
    };

    static defaultProps = {
        className: null
    }

    _sort() {
        if (this.props.onSort) {
            if (this.props.sort.col === this.props.sortField) {
                this.props.onSort(this.props.sortField, !this.props.sort.asc); // flip state
            } else {
                this.props.onSort(this.props.sortField, true); // sort asc
            }
        }
    }

    render() {
        let ascStyle = {
            display: ((this.props.sort.col === this.props.sortField && this.props.sort.asc) ? 'inline' : 'none')
        };
        let descStyle = {
            display: ((this.props.sort.col === this.props.sortField && !this.props.sort.asc) ? 'inline' : 'none')
        };

        return(
            <th className={this.props.className} onClick={() => {this._sort();}}>
                <span>{this.props.children}</span>
                <span
                    className="asc glyphicon glyphicon-triangle-bottom"
                    aria-hidden="true"
                    style={ascStyle} />
                <span
                    className="desc glyphicon glyphicon-triangle-top"
                    aria-hidden="true"
                    style={descStyle} />
            </th>
        );
    }
}

export class TableHeader extends React.Component {

    static propTypes = {
        onRefresh: React.PropTypes.func,
        children: React.PropTypes.any
    }

    static defaultProps = {
        onRefresh: () => {}
    }  

    render() {
        return(
            <div className="bc-table-header">
                {this.props.children}
                <span
                    className="glyphicon glyphicon-refresh"
                    aria-hidden="true"
                    onClick={this.props.onRefresh}/>
            </div>
        );
    }
}


class SongRow extends React.Component{
    static propTypes = {
        children: React.PropTypes.shape({
            name: React.PropTypes.string,
        }),
        onView: React.PropTypes.func,
        onEdit: React.PropTypes.func,
        onDelete: React.PropTypes.func,
    };

    static defaultProps = {
        onView: () => {},
        onEdit: () => {},
        onDelete: () => {}
    }  

    render() {
        let song = this.props.children;

        return (
            <tr className="tr-basic">
                <td
                    className="td-basic"
                    onClick={this.onItemClick.bind(this, song, 'view')}>
                    {song.name}
                </td>
                <td className="td-basic bc-songs-list-actions">
                    <Glyphicon glyph="pencil" onClick={this.onItemClick.bind(this, song, 'edit')} />
                    {' '}
                    <Glyphicon glyph="trash" onClick={this.onItemClick.bind(this, song, 'delete')} />
                </td>
            </tr>
        );
    }

    onItemClick(item, action) {
        switch(action) {
        case 'view':
            this.props.onView(item);
            break;
        case 'edit':
            this.props.onEdit(item);
            break;
        case 'delete':
            this.props.onDelete(item);
            break;
        }   
    }   
} 

export default class SongsList extends React.Component{

    render() {
        return (
            <div className="bc-songs-list">
                this is list of songs
            </div>
        )
    }

    static propTypes = {
        songs: React.PropTypes.array,
        onSort: React.PropTypes.func,
        onPageChange: React.PropTypes.func,
        onRefresh: React.PropTypes.func,
        sort: React.PropTypes.shape({
            asc: React.PropTypes.bool,
            col: React.PropTypes.string
        }), 
        onView: React.PropTypes.func,
        isFetching: React.PropTypes.bool,
        page: React.PropTypes.number,
        pageSize: React.PropTypes.number,
        total: React.PropTypes.number
    }

    static defaultProps = {
        data: [],
        sort: { asc: true, col: 'name' },
        onRefresh: () => {},
        onView: () => {},
        onSort: () => {},
        onPageChange: () => {},
        isFetching: false,
        page: 1,
        pageSize: 30,
        total: 0
    }  
    
    render() {
        return (
            <div className="bc-songs-list">
                <TableHeader onRefresh={this.props.onRefresh}>
                    <div className="bc-expander"/>
                    {this.props.isFetching && <span>Fetching data...</span>}
                </TableHeader>
                <table className="table-basic songs-table">
                    <thead className="thead-basic">
                        <tr className="tr-basic">
                            <TableHeadItem
                                className="th-basic th-sortable"
                                sortField="id"
                                onSort={this.props.onSort}
                                sort={this.props.sort}>
                                Name 
                            </TableHeadItem>
                            <th />
                        </tr>
                    </thead>
                    <tbody className="tbody-basic">
                        {this.props.songs !== null &&
                            this.props.songs.map((song) => {
                                return (
                                    <SongRow
                                        key={song.id}
                                        onView={this.props.onView}>
                                        {song}
                                    </SongRow>)}          
                            )
                        }
                    </tbody>                
                </table>
            </div>
        )
    } 
}

