DROP DATABASE chat;

CREATE DATABASE chat;

USE chat;


CREATE TABLE `messages` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `message` VARCHAR(500) NOT NULL DEFAULT '',
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `userid` INTEGER NULL DEFAULT NULL,
  `roomname` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `username` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`username`)
);

-- Remove link to allow TRUNCATE
-- ALTER TABLE `messages` ADD FOREIGN KEY (userid) REFERENCES `users` (`id`);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
