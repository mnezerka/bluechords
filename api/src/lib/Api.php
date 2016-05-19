<?php
require_once 'Db.php';

class Api {
    function __construct($db) {
        $this->_db = $db;
    }

    function getSongs($sortField, $sortAsc, $filter=null) {
        $result = [];

        if (!in_array($sortField, ['name', 'artist'])) {
            throw new Exception('Invalid ordering field');
        }

        $queryWhere = '';
        if (!is_null($filter)) {
            $queryWhere = sprintf("WHERE name LIKE '%%%s%%' OR artist LIKE '%%%s%%' ", 
                $this->_db->escapeString($filter),
                $this->_db->escapeString($filter));
        }

        $query = sprintf('SELECT id, name, artist FROM songs %s ORDER BY %s %s',
            $queryWhere,
            $this->_db->escapeString($sortField),
            $sortAsc ? 'ASC' : 'DESC'
        );

        $rows = $this->_db->query($query);
        while($row = $rows->fetch_assoc()) {
            $result[] = $row;
        }
        return $result;
    }

    function getSong($songId) {
        $result = [];
        $query = sprintf("SELECT id, name, artist, data FROM songs WHERE id=%d", (int)$songId);
        $rows = $this->_db->query($query);
        if (mysqli_num_rows($rows) == 0) {
            throw new Exception('Song not found');
        }
        $row = $rows->fetch_assoc();
        return $row;
    }

    function saveSong($songId, $song) {
        $result = [];
        $query = sprintf("UPDATE songs SET name='%s', artist='%s', data='%s' WHERE id=%d",
            $this->_db->escapeString($song->name),
            $this->_db->escapeString($song->artist),
            $this->_db->escapeString($song->data),
            (int)$songId);
        //var_dump($query);
        $this->_db->query($query);
        $song = $this->getSong($songId);
        return $song; 
    }


}
?>
