USE [Test]
GO

/****** Object:  Table [dbo].[LandMark]    Script Date: 12/20/2020 6:30:08 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[LandMark](
	[LandmarkId] [int] IDENTITY(1,1) NOT NULL,
	[Landmarkname] [nvarchar](30) NULL,
	[Address] [nvarchar](max) NULL,
	[Latitude] [float] NULL,
	[Longitude] [float] NULL,
	[Contact] [bigint] NULL,
	[PointOrder] [int] NULL,
	[Distance] [bigint] NULL,
	[CreatedDate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[LandmarkId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO

