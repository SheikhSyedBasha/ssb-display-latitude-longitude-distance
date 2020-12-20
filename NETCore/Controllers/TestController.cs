using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Test.Data.Models;
using Test.Services.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Test.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TestController : ControllerBase
	{
		private readonly ILandMarkService _service;
		public TestController(ILandMarkService service)
		{
			_service = service;
		}

		[HttpGet]
		public async Task<IActionResult> Get()
		{
			var result = await _service.Get();
			return Ok(result);
		}
		

		[HttpPost]
		public async Task<IActionResult> Post([FromBody] LandMarkModel _model)
		{
			var result = await _service.Post(_model);
			return Ok(result);
		}
	}
}
