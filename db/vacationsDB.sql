-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: vacationsDB
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `userId` int DEFAULT NULL,
  `vacationId` int DEFAULT NULL,
  KEY `followers_users_FK` (`userId`),
  KEY `followers_vacations_FK` (`vacationId`),
  CONSTRAINT `followers_users_FK` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `followers_vacations_FK` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (58,39),(58,29),(58,59),(58,62),(58,3),(58,60),(58,61),(58,65),(58,63),(62,39),(62,29),(62,60),(62,64),(62,58),(62,4),(63,62),(63,59),(63,61),(63,64),(63,60);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userTypes`
--

DROP TABLE IF EXISTS `userTypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userTypes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userTypes`
--

LOCK TABLES `userTypes` WRITE;
/*!40000 ALTER TABLE `userTypes` DISABLE KEYS */;
INSERT INTO `userTypes` VALUES (1,'user'),(2,'admin');
/*!40000 ALTER TABLE `userTypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `userType` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_userTypes_FK` (`userType`),
  CONSTRAINT `users_userTypes_FK` FOREIGN KEY (`userType`) REFERENCES `userTypes` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Test','User','test@example.com','password',1),(2,'alex','efimov','alexefimov145@gmail.com','c01fbd1d5b65948318afe0d959ad09c9',2),(58,'alexander','efimov','a@gmail.com','c01fbd1d5b65948318afe0d959ad09c9',1),(63,'john','wick','john@wick.com','c01fbd1d5b65948318afe0d959ad09c9',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(100) DEFAULT NULL,
  `description` varchar(370) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `finishDate` date DEFAULT NULL,
  `price` int DEFAULT NULL,
  `picName` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (3,'Paris','Paris, the \"City of Light,\" is known for its art, fashion, and romance. Key attractions include the Eiffel Tower, Louvre Museum, and Notre-Dame Cathedral. The city offers world-class cuisine, charming cafes, and beautiful Seine River views. With its historic architecture and vibrant culture, Paris promises an unforgettable experience.','2024-06-12','2024-06-20',300,'e27dda6b-6ff6-4cab-9027-6b0a0fdbeee3.jpeg'),(4,'Bora Bore','Bora Bora, a stunning island in French Polynesia, is famed for its turquoise waters, white sandy beaches, and luxurious overwater bungalows. Key attractions include Matira Beach, Mount Otemanu, and vibrant coral reefs for snorkeling and diving. With its breathtaking natural beauty and tranquil ambiance, Bora Bora offers a perfect escape for relaxation and adventure.','2024-07-07','2024-07-11',500,'9bbe5d3a-958f-47cc-ab47-9675535d2562.jpeg'),(29,'New Yorke','New York City is a bustling metropolis known for its iconic skyline, diverse culture, and vibrant energy. Key attractions include Times Square, Central Park, the Statue of Liberty, and Broadway theaters. As a global hub for finance, fashion, and the arts, the city offers world-class museums, live performances, and a dynamic food scene.','2024-06-08','2024-06-12',423,'61d441bf-e9c3-47a8-80c0-14b626d60ea3.jpeg'),(39,'Tel Aviv','Tel Aviv is a vibrant city on Israel\'s Mediterranean coast, known for its modern architecture, lively nightlife, and cultural diversity. It features beautiful beaches, historic neighborhoods like Jaffa, bustling markets, and a thriving culinary scene. The city\'s dynamic atmosphere is complemented by its rich history, making it a hub for innovation and tradition​.','2024-06-03','2024-06-13',250,'47e58df2-ebda-4e24-892a-d9a71743cadc.jpeg'),(58,'Maldives','The Maldives is an idyllic tropical paradise known for its crystal-clear waters, white sandy beaches, and luxurious overwater bungalows. It\'s perfect for diving, snorkeling, and unwinding in the serene beauty of its private islands.','2024-06-26','2024-06-30',800,'d4032c89-a32a-424b-a59f-f638dcb5d337.jpg'),(59,'Prague','Prague, the \"City of a Hundred Spires,\" is known for its Old Town Square, Gothic churches, the medieval Astronomical Clock, and the pedestrian Charles Bridge. The city offers a mix of rich history, vibrant culture, and stunning architecture.','2024-06-08','2024-06-30',10000,'3831c9da-963b-4dd0-9720-a1001bc10541.jpeg'),(60,'Phuket','Phuket is Thailand\'s largest island, known for its beautiful beaches, vibrant nightlife, and rich cultural heritage. Visitors can explore Patong Beach, the Big Buddha, and various night markets, as well as enjoy diving and island-hopping tours','2024-06-01','2024-06-30',600,'663d0b15-86b5-4294-a5f9-20748ef67ace.jpg'),(61,'Barcelona','Barcelona offers a blend of stunning architecture, vibrant culture, and beautiful beaches. Key attractions include Antoni Gaudí’s Sagrada Família, Park Güell, and the lively La Rambla street, as well as the city\'s many tapas bars','2024-06-19','2024-06-22',400,'4dc48aa9-c998-41f0-a590-d52085537775.jpg'),(62,'Reykjavik','Reykjavik, the capital of Iceland, is a gateway to natural wonders like the Blue Lagoon, geysers, and waterfalls. Visitors can explore the city\'s unique culture, vibrant nightlife, and stunning landscapes of volcanic craters and glaciers.','2024-06-10','2024-06-22',600,'3a99704c-5df7-47fb-aa93-97dd3790fdca.jpg'),(63,'Swiss Alps','The Swiss Alps offer breathtaking mountain scenery, picturesque villages, and world-class skiing and hiking. Key destinations include Zermatt, St. Moritz, and Interlaken. Visitors can enjoy outdoor activities year-round and experience charming alpine culture','2024-06-25','2024-06-29',700,'8c4bc70e-ecaa-41db-aace-7fa1d532f4a1.jpg'),(64,'Budapest','Budapest, the capital of Hungary, is known for its stunning architecture, historic thermal baths, and the scenic Danube River. Key attractions include Buda Castle, Fisherman\'s Bastion, and the Széchenyi Thermal Bath','2024-06-28','2024-06-30',300,'06f94e87-4bb4-49d0-8ee3-d1e60c19746f.jpg'),(65,'Santorini','Santorini is famous for its white-washed buildings with blue domes, stunning sunsets, and volcanic beaches. Key attractions include the towns of Oia and Fira, as well as the ancient ruins of Akrotiri.','2024-06-19','2024-06-22',450,'5286d160-465d-401f-b54d-4fe6128a8e7c.jpeg');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'vacationsDB'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-07 17:47:39
