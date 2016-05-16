<?php
require_once 'Db.php';

class Api {
    function __construct($db) {
        $this->_db = $db;
    }

    function getSongs() {
        $result = [];
        $rows = $this->_db->query('SELECT id, name FROM songs');
        while($row = $rows->fetch_assoc()) {
            $result[] = $row;
        }
        return $result;
    }

    function getSong($songId) {
        $result = [];
        $query = sprintf("SELECT id, name, data FROM songs WHERE id='%d'", (int)$songId);
        $rows = $this->_db->query($query);
        if (mysqli_num_rows($rows) == 0) {
            throw new Exception('Song not found');
        }
        $row = $rows->fetch_assoc();
        return $row;
    }

}
?>
