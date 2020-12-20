﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test.Data.Models;

namespace Test.Data.Interfaces
{
	public interface ILandMarkRepo
	{
		public Task<IEnumerable<LandMarkModel>> Get();
		public Task<LandMarkModel> Post(LandMarkModel model);
	}
}
