using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test.Data.Interfaces;
using Test.Data.Models;

namespace Test.Data
{
	public class LandMarkRepo : ILandMarkRepo
	{
		private readonly TestContext _context;
		public LandMarkRepo(TestContext context)
		{
			_context = context;
		}

		public async Task<IEnumerable<LandMarkModel>> Get()
		{
			try
			{
				return _context.LandMarks.OrderBy(x => x.PointOrder).ToList();
			}
			catch (Exception e)
			{
				throw e;
			}
		}

		public async Task<LandMarkModel> Post(LandMarkModel model)
		{
			int i = 0;
			model.CreatedDate = DateTime.Now;
			try
			{
				List<LandMarkModel> list = (await Get()).ToList();
				list.Add(model);
				list?.OrderBy(x => x.Distance).ToList()?.ForEach((x) => x.PointOrder = ++i);
				_context.LandMarks.UpdateRange(list);
				await _context.SaveChangesAsync();
				return model;
			}
			catch (Exception e)
			{
				throw e;
			}
		}
	}
}
