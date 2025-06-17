SELECT @token:= token `token`, @uid:= uid `uid`, @dc:= dateCreated `dc`, @du:= dateUpdated `du` FROM sessions 
WHERE userId = 1
ORDER BY dateCreated DESC LIMIT 1;

TRUNCATE TABLE sessions;

INSERT INTO sessions (userId, token, uid, dateCreated, dateUpdated) VALUES (1, @token, @uid, @dc, @du);