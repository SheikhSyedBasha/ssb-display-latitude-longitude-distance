using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Test.Data.Models
{
	[Table("LandMark")]
	public class LandMarkModel
	{
		[Key]
		public int LandmarkId { get; set; }
		[Column("Landmarkname")]
		public string LandmarkName { get; set; }
		public string Address { get; set; }
		public double Latitude { get; set; }
		public double Longitude { get; set; }
		[Column("Contact")]
		public Int64 ContactDetails { get; set; }
		public int PointOrder { get; set; }
		public Int64 Distance { get; set; }
		public DateTime CreatedDate { get; set; }

	}
}
