DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `clearUserResults`(IN user INT(11))
BEGIN

DELETE FROM futurequestisland_activity_status WHERE userId = user;
DELETE FROM futurequestisland_avatars WHERE userId = user;
DELETE FROM futurequestisland_careers WHERE userId = user;
DELETE FROM futurequestisland_collage_items WHERE userId = user;
DELETE FROM futurequestisland_collages WHERE userId = user;
DELETE FROM futurequestisland_hut_items WHERE userId = user;
DELETE FROM futurequestisland_island_status WHERE userId = user;
DELETE FROM futurequestisland_mysterygame_selections WHERE userId = user;
DELETE FROM futurequestisland_quizresponse WHERE userId = user;
DELETE FROM futurequestisland_rooms WHERE userId = user;
DELETE FROM futurequestisland_goals WHERE userId = user;
 
UPDATE futurequestisland_account SET account = 200 WHERE userId = user;


END;;
DELIMITER ;