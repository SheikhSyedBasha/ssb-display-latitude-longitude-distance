﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Test.Data.Interfaces;
using Test.Data.Models;
using Test.Services.Interfaces;

namespace Test.Services
{
	public class LandMarkService : ILandMarkService
	{
		private readonly ILandMarkRepo _repo;

		public LandMarkService(ILandMarkRepo repo)
		{
			_repo = repo;
		}
		public async Task<IEnumerable<LandMarkModel>> Get()
		{
			return await _repo.Get();
		}

		public async Task<LandMarkModel> Post(LandMarkModel model)
		{
			model.Distance = Convert.ToInt64(GetDistanceBetweenPoints(model.Latitude, model.Longitude));

			return await _repo.Post(model);
		}

		public double GetDistanceBetweenPoints(double lat1, double long1)
		{
			double distance = 0;

			double dLat = (lat1) / 180 * Math.PI;
			double dLong = (long1) / 180 * Math.PI;

			double a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2)
			           + Math.Cos(lat1) * Math.Sin(dLong / 2) * Math.Sin(dLong / 2);
			double c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

			//Calculate radius of earth
			// For this you can assume any of the two points.
			double radiusE = 6378135; // Equatorial radius, in metres
			double radiusP = 6356750; // Polar Radius

			//Numerator part of function
			double nr = Math.Pow(radiusE * radiusP * Math.Cos(lat1 / 180 * Math.PI), 2);
			//Denominator part of the function
			double dr = Math.Pow(radiusE * Math.Cos(lat1 / 180 * Math.PI), 2)
			            + Math.Pow(radiusP * Math.Sin(lat1 / 180 * Math.PI), 2);
			double radius = Math.Sqrt(nr / dr);

			//Calaculate distance in metres.
			distance = radius * c;
			return distance;
		}
    }
}
