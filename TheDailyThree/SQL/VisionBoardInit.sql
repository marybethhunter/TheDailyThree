CREATE TABLE VisionBoards (
    Id INTEGER IDENTITY (1, 1) NOT NULL PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    UserId INTEGER NOT NULL,
    CONSTRAINT [FK_Vision_Board_User] FOREIGN KEY (UserId) REFERENCES [User](Id),
);

CREATE TABLE VisionBoardImages (
    Id INTEGER IDENTITY (1, 1) NOT NULL PRIMARY KEY,
    Src VARCHAR(500) NOT NULL,
    AltText VARCHAR(100) NOT NULL,
    VisionBoardId INTEGER NOT NULL,
    CONSTRAINT [FK_Images_VisionBoard] FOREIGN KEY (VisionBoardId) REFERENCES [VisionBoards](Id),
);

--DUMMY DATA FOR THIS TABLE AT THE START
INSERT INTO VisionBoards (Title, UserId) VALUES ('Vacation', 1);
INSERT INTO VisionBoardImages (Src, AltText, VisionBoardId) VALUES ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUhy_PXpkCwRGE0-YHw3L6TIr54iJ2kAKXgg&usqp=CAU', 'italian architecture', 1);