-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ims2
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `candidate`
--

DROP TABLE IF EXISTS `candidate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `candidate` (
  `id` binary(16) NOT NULL,
  `created_by` varbinary(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_by` varbinary(255) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `current_position` enum('BACKEND_DEVELOPER','BUSINESS_ANALYST','FRONTEND_DEVELOPER','HR','NOT_AVAILABLE','PROJECT_MANAGER','TESTER') DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `status` enum('ACCEPTED_OFFER','APPROVED_OFFER','BANNED','CANCELED_INTERVIEW','CANCELLED_OFFER','DECLINED_OFFER','FAILED_INTERVIEW','OPEN','PASSED_INTERVIEW','REJECTED_OFFER','WAITING_FOR_APPROVAL','WAITING_FOR_INTERVIEW','WAITING_FOR_RESPONSE') DEFAULT NULL,
  `owner_hr_id` binary(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9xyv6pcm5eprx7e94y3bcmkwl` (`owner_hr_id`),
  CONSTRAINT `FK9xyv6pcm5eprx7e94y3bcmkwl` FOREIGN KEY (`owner_hr_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `candidate_chk_1` CHECK ((`status` between 0 and 12))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidate`
--

LOCK TABLES `candidate` WRITE;
/*!40000 ALTER TABLE `candidate` DISABLE KEYS */;
INSERT INTO `candidate` VALUES (_binary 'V��αA$�W�َ\�',_binary '�\�\0t\0\ranonymousUser','2025-05-14 05:17:33.138768',_binary '�\�\0t\0\ranonymousUser','2025-05-14 05:17:33.138768','HR','lananh@gmail.com','Nguyễn Thị Lan Anh','098127211','OPEN',NULL),(_binary '#EK3o\�F=�j[�|\�',_binary '�\�\0t\0\ranonymousUser','2025-05-14 05:21:53.331896',_binary '�\�\0t\0\ranonymousUser','2025-05-14 05:21:53.331896','HR','nhatanh@gmail.com','Nguyễn Nhật Ánh','098215123','OPEN',NULL),(_binary '8�Z��5Kƫb���\�R',_binary '�\�\0t\0\ranonymousUser','2025-05-14 05:17:08.164361',_binary '�\�\0t\0\ranonymousUser','2025-05-14 05:17:08.164361','FRONTEND_DEVELOPER','quanpv@gmail.com','Phạm Văn Quân','091221521','OPEN',NULL),(_binary 'N\n1�)OϕC\�\Z',_binary '�\�\0t\0\ranonymousUser','2025-05-14 07:04:12.150638',_binary '�\�\0t\0\ranonymousUser','2025-05-14 07:04:12.150638','FRONTEND_DEVELOPER','a@gmail.com','An','012985125','OPEN',NULL),(_binary '_sD�\�C/�\Zq��\��',_binary '�\�\0t\0\ranonymousUser','2025-05-14 05:23:40.076337',_binary '�\�\0t\0\ranonymousUser','2025-05-14 05:24:03.023299','PROJECT_MANAGER','kha@gmail.com','Trần Đình Khả','091725121','PASSED_INTERVIEW',NULL),(_binary 'bV�H\�@\�!���l\�',_binary '�\�\0t\0\ranonymousUser','2025-05-14 05:31:10.043388',_binary '�\�\0t\0\ranonymousUser','2025-05-14 05:31:10.043388','FRONTEND_DEVELOPER','quynhnn@gmail.com','Nguyễn Ngọc Quỳnh','091872152','PASSED_INTERVIEW',NULL),(_binary '~�=ۥED��j���',_binary '�\�\0t\0\ranonymousUser','2025-05-14 05:21:12.428953',_binary '�\�\0t\0\ranonymousUser','2025-05-14 05:21:12.428953','PROJECT_MANAGER','baanh@gmail.com','Nguyễn Bá Anh','091287151','OPEN',NULL),(_binary '��<���H��v>����',_binary '�\�\0t\0\ranonymousUser','2025-05-14 05:22:17.679628',_binary '�\�\0t\0\ranonymousUser','2025-05-14 05:22:17.679628','TESTER','anhtrr@gmail.com','Anh Trần Trường','091782412','OPEN',NULL),(_binary '\�m\0\�\�\nF\�r�}�#�;',_binary '�\�\0t\0\ranonymousUser','2025-05-14 05:15:06.920796',_binary '�\�\0t\0\ranonymousUser','2025-05-14 05:15:06.920796','TESTER','hainv@gmail.com','Nguyễn Văn Hải','09712912','OPEN',NULL),(_binary 'Ӆi*aI��Ƨa\\��',_binary '�\�\0t\0\ranonymousUser','2025-05-14 05:13:23.395934',_binary '�\�\0t\0\ranonymousUser','2025-05-14 05:13:23.395934','HR','anv@gmail.com','Phạm Hải An','09812412','OPEN',NULL),(_binary '\���\�\�\�KR��l�D\�ʮ',_binary '�\�\0t\0\ranonymousUser','2025-05-14 05:23:18.023574',_binary '�\�\0t\0\ranonymousUser','2025-05-14 07:06:33.075043','HR','quocnt@gmail.com','Nguyễn Thái Quốc','019128951','OPEN',NULL),(_binary '�\�.�g>Cc�@^.Gy',_binary '�\�\0t\0\ranonymousUser','2025-05-14 05:22:38.921969',_binary '�\�\0t\0\ranonymousUser','2025-05-14 07:06:36.681280','FRONTEND_DEVELOPER','anhnn@gmail.com','Nguyễn Ngọc Anh','091278125','OPEN',NULL),(_binary '��#���H(��\r��L\�\�',_binary '�\�\0t\0\ranonymousUser','2025-05-14 05:16:39.900925',_binary '�\�\0t\0\ranonymousUser','2025-05-14 05:22:48.278920','BUSINESS_ANALYST','hla@gmail.com','Nhân Nguyễn','01829125','OPEN',NULL);
/*!40000 ALTER TABLE `candidate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interview`
--

DROP TABLE IF EXISTS `interview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interview` (
  `id` binary(16) NOT NULL,
  `job` varchar(255) DEFAULT NULL,
  `candidate` varchar(255) DEFAULT NULL,
  `interviewer` varchar(255) DEFAULT NULL,
  `result` varchar(255) DEFAULT NULL,
  `schedule` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interview`
--

LOCK TABLES `interview` WRITE;
/*!40000 ALTER TABLE `interview` DISABLE KEYS */;
INSERT INTO `interview` VALUES (_binary '(ڊ��\�F�cP�a:ܺ','UI/UX','Nguyễn Văn An','Phạm Minh Điệp','STRONG_HIRE','2025-05-15T17:00:00.000Z','PENDING_FEEDBACK','Interview Frontend Developer'),(_binary '1�÷PM��\�Yaf;M','Business Analyst','Trịnh Thanh Hằng','Bùi Văn Khôi','NO_HIRE','2025-05-19T17:00:00.000Z','COMPLETED','Interview Business Analyst'),(_binary '3oS=1OJ�8`\�\�y�','Security Specialist','Phạm Hoàng Yến','Trần Quốc Tuấn','Failed','29/10/2024 14:30','Completed','Interview Security Specialist'),(_binary '?(4q�A���)�#�\�O','Data Engineer','Nguyễn Minh Đức','Lê Thị Hạnh','Passed','28/10/2024 16:00','Invited','Interview Data Engineer'),(_binary 'G�\�e+B���\�\�\'M','QA Engineer','Đỗ Minh Trí','Lê Hồng Phúc','Pending','24/10/2024 15:30','Scheduled','Interview QA Engineer'),(_binary 'L���y�B5�s#P\�os�','UI/UX Designer','Lê Văn Khánh','Đặng Thị Hoa','HIRE','2025-05-28T17:00:00.000Z','PENDING_FEEDBACK','Interview UI/UX Designer'),(_binary 'Q]xK��D���P3\�?�\�','Product Manager','Vũ Anh Dũng','Hoàng Mỹ Linh','Failed','26/10/2024 10:00','Completed','Interview Product Manager'),(_binary 'RpaW̢B?��#��ڎ','Machine Learning Engineer','Lý Văn Nam','Đinh Thị Quỳnh Như','Pending','30/10/2024 11:30','Invited','Interview Machine Learning Engineer'),(_binary '^O\�$\��J��2I\�\�u','Backend Developer','Phạm Hải An','Phạm Minh Điệp','Passed','20/10/2024 10:30','Invited','Interview Senior Backend Developer'),(_binary '�Y:�AS�/\�i��\"/','Mobile Developer','Trần Ngọc Bích','Vũ Quốc Bảo','Passed','23/10/2024 11:00','Invited','Interview Mobile App Developer'),(_binary '�-\�^��K�D�ad\�I\�','Machine Learning Engineer','Lý Văn Nam','Đinh Thị Quỳnh','Pending','30/10/2024 11:30','Invited','Interview Machine Learning Engineer');
/*!40000 ALTER TABLE `interview` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `expired` bit(1) NOT NULL,
  `revoked` bit(1) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `token_type` varchar(255) DEFAULT NULL,
  `user_id` binary(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKpddrhgwxnms2aceeku9s2ewy5` (`token`),
  KEY `FKe32ek7ixanakfqsdaokm4q9y2` (`user_id`),
  CONSTRAINT `FKe32ek7ixanakfqsdaokm4q9y2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES (12,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NDcxNjY4NDYsImV4cCI6MTc0NzI1MzI0Nn0.2SbUo6m_ktqyjcair2Q9QiJyz4vzaQG4Yv2-oiYruk0','BEARER',_binary 'F�dx�AH��}zA#\�'),(13,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NDcxNjcwNjIsImV4cCI6MTc0NzI1MzQ2Mn0.wH44HztMuyg18DOJeI--GgV8fuRoc944AU8fUJxsPKc','BEARER',_binary 'F�dx�AH��}zA#\�'),(14,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NDcxNjcwOTEsImV4cCI6MTc0NzI1MzQ5MX0.eq-a69wnlioAftLzCNNYY3JA5D9xvxIIXsvocGDZuxk','BEARER',_binary 'F�dx�AH��}zA#\�'),(15,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NDcxNjcxNjAsImV4cCI6MTc0NzI1MzU2MH0.FCZRLHzDcewpkFrdI3OWrtmKLlHtqB6ABHtXDrbA78E','BEARER',_binary 'F�dx�AH��}zA#\�'),(16,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NDcxNjcxNjYsImV4cCI6MTc0NzI1MzU2Nn0.ksFDQMmLCvUzn20JoGf7yFMX8uI0EpgcKhekZrzylSg','BEARER',_binary 'F�dx�AH��}zA#\�'),(17,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NDcxNjcxNzUsImV4cCI6MTc0NzI1MzU3NX0.jurvmLprzhaKTYAEHZxnfUe0acnFj8RpJNXxfli7XuE','BEARER',_binary 'F�dx�AH��}zA#\�'),(18,_binary '\0',_binary '\0','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3NDcxNjcxODQsImV4cCI6MTc0NzI1MzU4NH0.GPAOzR8u2uvMWA18XOumBy7gXszrsWkiM6PKh88OqSI','BEARER',_binary 'F�dx�AH��}zA#\�'),(22,_binary '\0',_binary '\0','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmh0aHVAZ21haWwuY29tIiwiaWF0IjoxNzQ3MTc1MjA3LCJleHAiOjE3NDcyNjE2MDd9.j3D0s2hWdqc62evuqh1nLIke5tTvVjtn78Jje-l14eM','BEARER',_binary '��ǴJꮇ��f\�Ͳ');
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` binary(16) NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_date` datetime(6) DEFAULT NULL,
  `last_modified_by` varchar(255) DEFAULT NULL,
  `last_modified_date` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('INTERVIEWER','MANAGER','RECRUITER') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (_binary 'F�dx�AH��}zA#\�','anonymousUser','2025-05-14 03:07:25.977987','anonymousUser','2025-05-14 03:07:25.977987','admin@gmail.com','Phạm Minh Điệp','$2a$10$4jNo6xRy.7vY3ilbVBOYi.qjfmNHOFJrOvVrcgfQ7nlUpJ48v7SKu','MANAGER'),(_binary '��ǴJꮇ��f\�Ͳ','anonymousUser','2025-05-14 05:26:47.071989','anonymousUser','2025-05-14 05:26:47.071989','anhthu@gmail.com','Nguyễn Hải Đăng','$2a$10$JEShHfz3dm6gbEJEtLg4s.q547ToSyFJ/qnKCzRQOFjXI5RwEJYde','MANAGER');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-22 15:29:36
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: partner_db
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-22 15:29:36
