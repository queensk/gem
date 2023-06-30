-- create database OnDemandPortfolio;
use OnDemandPortfolio;
drop database OnDemandPortfolio
-- Drop the schema and its objects
SELECT * FROM sys.schemas WHERE name = 'OnDemandPortfolio';
GRANT ALTER ON SCHEMA::OnDemandPortfolio TO sa;
DROP SCHEMA OnDemandPortfolio;



--CREATE SCHEMA UsereActivity;

-- Add uniqueness constraints to the Email and Username columns
ALTER TABLE UsereActivity.Users
ADD CONSTRAINT UC_Email UNIQUE (Email),
    CONSTRAINT UC_Username UNIQUE (Username);


-- Create the User table
CREATE TABLE UsereActivity.Users (
    UserID UNIQUEIDENTIFIER PRIMARY KEY,
    Username NVARCHAR(255) UNIQUE NOT NULL,
    Email NVARCHAR(255) UNIQUE NOT NULL,
    Password NVARCHAR(255) NOT NULL,
    ProfilePicture NVARCHAR(255),
    Biography NVARCHAR(MAX)
);

-- Create the Portfolio table
CREATE TABLE UsereActivity.Portfolios (
    PortfolioID UNIQUEIDENTIFIER PRIMARY KEY,
    UserID UNIQUEIDENTIFIER,
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX),
    CreationDate DATE,
    LastUpdatedDate DATE,
    FOREIGN KEY (UserID) REFERENCES UsereActivity.Users(UserID)
);

-- Create the PortfolioItem table
CREATE TABLE UsereActivity.PortfolioItems (
    ItemID UNIQUEIDENTIFIER PRIMARY KEY,
    PortfolioID UNIQUEIDENTIFIER,
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX),
    Content NVARCHAR(MAX),
    CreationDate DATE,
    LastUpdatedDate DATE,
    FOREIGN KEY (PortfolioID) REFERENCES UsereActivity.Portfolios(PortfolioID)
);

-- Create the Followers table
CREATE TABLE UsereActivity.Followers (
    FollowerID UNIQUEIDENTIFIER,
    FollowingID UNIQUEIDENTIFIER,
    PRIMARY KEY (FollowerID, FollowingID),
    FOREIGN KEY (FollowerID) REFERENCES UsereActivity.Users(UserID),
    FOREIGN KEY (FollowingID) REFERENCES UsereActivity.Users(UserID)
);

-- Create the Followers table
CREATE TABLE UsereActivity.ProfileLike (
    LikeID UNIQUEIDENTIFIER,
    LikingID UNIQUEIDENTIFIER,
    PRIMARY KEY (LikeID, LikingID),
    FOREIGN KEY (LikeID) REFERENCES UsereActivity.Users(UserID),
    FOREIGN KEY (LikingID) REFERENCES UsereActivity.Users(UserID)
);

-- Create the Likes table
CREATE TABLE UsereActivity.Likes (
    UserID UNIQUEIDENTIFIER,
    ItemID UNIQUEIDENTIFIER,
    FOREIGN KEY (UserID) REFERENCES UsereActivity.Users(UserID),
    FOREIGN KEY (ItemID) REFERENCES UsereActivity.PortfolioItems(ItemID)
);

-- Create the Comments table
CREATE TABLE UsereActivity.Comments (
    CommentID UNIQUEIDENTIFIER PRIMARY KEY,
    UserID UNIQUEIDENTIFIER,
    ItemID UNIQUEIDENTIFIER,
    Content NVARCHAR(MAX),
    CreationDate DATE,
    FOREIGN KEY (UserID) REFERENCES UsereActivity.Users(UserID),
    FOREIGN KEY (ItemID) REFERENCES UsereActivity.PortfolioItems(ItemID)
);

-- Create the Tags table
CREATE TABLE UsereActivity.Tags (
    TagID UNIQUEIDENTIFIER PRIMARY KEY,
    Name NVARCHAR(255)
);

-- Create the PortfolioItemTags table (for the many-to-many relationship)
CREATE TABLE UsereActivity.PortfolioItemTags (
    ItemID UNIQUEIDENTIFIER,
    TagID UNIQUEIDENTIFIER,
    FOREIGN KEY (ItemID) REFERENCES UsereActivity.PortfolioItems(ItemID),
    FOREIGN KEY (TagID) REFERENCES UsereActivity.Tags(TagID)
);

-- Create the Availability table
CREATE TABLE UsereActivity.Availability (
    AvailabilityID UNIQUEIDENTIFIER PRIMARY KEY,
    UserID UNIQUEIDENTIFIER,
    StartDate DATE,
    EndDate DATE,
    PricePerHour DECIMAL(10, 2),
    FOREIGN KEY (UserID) REFERENCES UsereActivity.Users(UserID)
);

-- Create the Purchases table
CREATE TABLE UsereActivity.Purchases (
    PurchaseID UNIQUEIDENTIFIER PRIMARY KEY,
    BuyerUserID UNIQUEIDENTIFIER,
    SellerUserID UNIQUEIDENTIFIER,
    AvailabilityID UNIQUEIDENTIFIER,
    PurchaseDate DATE,
    FOREIGN KEY (BuyerUserID) REFERENCES UsereActivity.Users(UserID),
    FOREIGN KEY (SellerUserID) REFERENCES UsereActivity.Users(UserID),
    FOREIGN KEY (AvailabilityID) REFERENCES UsereActivity.Availability(AvailabilityID)
);

-- Create the Messages table
CREATE TABLE UsereActivity.Messages (
    MessageID UNIQUEIDENTIFIER PRIMARY KEY,
    SenderID UNIQUEIDENTIFIER,
    ReceiverID UNIQUEIDENTIFIER,
    Text NVARCHAR(MAX),
    Time DATETIME,
    FOREIGN KEY (SenderID) REFERENCES UsereActivity.Users(UserID),
    FOREIGN KEY (ReceiverID) REFERENCES UsereActivity.Users(UserID)
);

-- Insert demo data into the User table
INSERT INTO UsereActivity.Users (UserID, Username, Email, Password, ProfilePicture, Biography)
VALUES
    ('3A7DF6A5-6C1B-4D23-94D8-42C105E7C0A1', 'JohnDoe', 'johndoe@example.com', 'password123', '', 'I am a software developer.'),
    ('FC523A8E-72A2-4B8B-99B1-997C3DB4A7A2', 'JaneSmith', 'janesmith@example.com', 'securepass', '', 'Passionate about art and design.'),
    ('1F240B59-8E8E-4B69-A8FF-F0D6B38D4616', 'AlexWilliams', 'awilliams@example.com', 'abc123', '', 'Nature lover and outdoor enthusiast.');
