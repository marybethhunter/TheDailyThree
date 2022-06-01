CREATE TABLE Goals (
    Id INTEGER IDENTITY (1, 1) NOT NULL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    [Description] VARCHAR(1000) NOT NULL,
    Completed BIT NOT NULL,
    UserId INTEGER NOT NULL,
    CONSTRAINT [FK_Goal_User] FOREIGN KEY (UserId) REFERENCES [User](Id),
);

--DUMMY DATA FOR THIS TABLE AT THE START
INSERT INTO Goals (Title, [Description], Completed, UserId) VALUES ('Water', 'Start drinking 8 glasses of water every day!', 0, 1);