CREATE DATABASE IF NOT EXISTS bc;
USE bc;

CREATE USER 'bc'@'%' IDENTIFIED BY 'bc';
GRANT ALL PRIVILEGES ON *.* TO 'bc'@'%' WITH GRANT OPTION;

CREATE TABLE `songs` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `name` varchar(250) NOT NULL,
      `artist` varchar(250) NOT NULL DEFAULT '',
      `data` text NOT NULL DEFAULT '',
      PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

