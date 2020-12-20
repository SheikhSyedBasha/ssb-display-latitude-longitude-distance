using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test.Data.Models;

namespace Test.Data
{
	public class TestContext: DbContext
	{
		public TestContext(DbContextOptions<TestContext> options): base(options)
		{

		}
		public DbSet<LandMarkModel> LandMarks { get; set; }
	}
}
