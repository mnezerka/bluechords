<?php

abstract class Db {

    public abstract function escapeString($str);
    public abstract function query($statement);
    public abstract function transactionBegin();
    public abstract function transactionRollback();
    public abstract function transactionCommit();
}

class DbMysql extends Db {
    function __construct($config) {


        $this->conn = new mysqli(
            $config['host'],
            $config['username'],
            $config['password'],
            $config['database']);

        //var_dump($config);

        // Check connection
        if ($this->conn->connect_error) {
            throw new Exception("Connection failed: " . $this->conn->connect_error);
        } 

        if (!$this->conn->set_charset('utf8')) {
            throw new Exception("Error setting connection charset: " . $this->conn->error);
        }

        $this->inTransaction = FALSE;
    }

    function __destruct() {
        $this->conn->close();
    }

    function query($statement) {
        $result = $this->conn->query($statement);
        if ($result === FALSE) {
            $dbError = $this->conn->error;
            // auto close transaction
            $this->transactionRollback();
            throw new Exception('Database error: ' . $dbError . ' when executing statement: ' . $statement);
        }
        return $result;
    }

    function transactionBegin() {
        if ($this->conn->autocommit(FALSE) === FALSE) {
            throw new Exception('Database error: ' . $this->conn->error);
        };
        $this->inTransaction = TRUE;
    }

    function transactionRollback() {
        // no error handling here
        $this->conn->query('ROLLBACK');
        $this->inTransaction = FALSE;
    }

    function transactionCommit() {
        if ($this->conn->query('COMMIT') === FALSE) {
            throw new Exception('Database error: ' . $this->dbConn->error);
        }
        $this->inTransaction = FALSE;
    }

    function escapeString($str) {
        return mysqli_real_escape_string($this->conn, $str);
    }
}

?>
