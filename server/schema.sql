-- CREATE DATABASE chat;

USE chat;


CREATE TABLE `messages` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `message` VARCHAR(500) NOT NULL DEFAULT '',
  `createdAt` DATETIME NULL DEFAULT NULL,
  `userid` INTEGER NULL DEFAULT NULL,
  `roomid` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `rooms` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `roomname` VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);




ALTER TABLE `messages` ADD FOREIGN KEY (userid) REFERENCES `users` (`id`);
ALTER TABLE `messages` ADD FOREIGN KEY (roomid) REFERENCES `rooms` (`id`);







/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
