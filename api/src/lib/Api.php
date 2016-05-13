<?php
require_once 'Db.php';

class Api {
    function __construct($db) {
        $this->_db = $db;
    }

    function getSongs() {
        $result = [];
        $rows = $this->_db->query('SELECT * FROM songs');
        while($row = $rows->fetch_assoc()) {
            $result[] = $row;
        }
        return $result;
    }
}
?>
