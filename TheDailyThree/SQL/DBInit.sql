USE MASTER
GO

IF NOT EXISTS (
    SELECT [name]
    FROM sys.databases
    WHERE [name] = N'TheDailyThree'
)
CREATE DATABASE TheDailyThree
GO

USE TheDailyThree
GO


DROP TABLE IF EXISTS [User];
DROP TABLE IF EXISTS Mood;
DROP TABLE IF EXISTS [Entry];

CREATE TABLE Mood(
	Id INTEGER IDENTITY (1, 1) NOT NULL PRIMARY KEY,
	[Name] VARCHAR(55) NOT NULL,
);

CREATE TABLE [User](
	Id INTEGER IDENTITY (1, 1) NOT NULL PRIMARY KEY,
	[Name] VARCHAR(55) NOT NULL,
	[Uid] VARCHAR(100) NOT NULL,
	Streak INTEGER NOT NULL,
);

CREATE TABLE [Entry](
	Id INTEGER IDENTITY (1, 1) NOT NULL PRIMARY KEY,
	[Date] DATETIME NOT NULL,
	Thing1 VARCHAR(200) NOT NULL,
	Thing2 VARCHAR(200) NOT NULL,
	Thing3 VARCHAR(200) NOT NULL,
	Comment VARCHAR(500) NOT NULL,
	MoodId INTEGER NOT NULL,
	UserId INTEGER NOT NULL,
	CONSTRAINT [FK_Entry_User] FOREIGN KEY (UserId) REFERENCES [User](Id),
	CONSTRAINT [FK_Entry_Mood] FOREIGN KEY (MoodId) REFERENCES Mood(Id),
);

INSERT INTO Mood ([Name]) VALUES ('Pretty Bad');
INSERT INTO Mood ([Name]) VALUES ('Could Be Better');
INSERT INTO Mood ([Name]) VALUES ('No Complaints');
INSERT INTO Mood ([Name]) VALUES ('Overall Good');
INSERT INTO Mood ([Name]) VALUES ('Truly Amazing');

INSERT INTO [User] ([Name], [Uid], Streak) VALUES ('Mary Beth Hunter', 'sidDEcc827Ao', 3);

INSERT INTO [Entry] ([Date], Thing1, Thing2, Thing3, Comment, MoodId, UserId) VALUES ('04/12/22', 'Gratitude 1', 'Gratitude 2', 'Gratitude 3', 'This is my test comment.', '5', 1);
INSERT INTO [Entry] ([Date], Thing1, Thing2, Thing3, Comment, MoodId, UserId) VALUES ('05/24/22', 'Gratitude 1', 'Gratitude 2', 'Gratitude 3', 'This is my test comment.', '4', 1);