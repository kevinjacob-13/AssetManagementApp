using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AssetManagementApp.Models;
using AssetManagementApp.DTOs;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using AssetManagementApp.Helpers;

namespace AssetManagementApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ModelController : ControllerBase
    {
        private readonly AssetDBContext _context;
        private readonly ILogger<ModelController> _logger;
        private readonly IMapper _mapper;

        public ModelController(AssetDBContext context,
                               ILogger<ModelController> logger,
                               IMapper mapper)
        {
            _context = context;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<ModelDTO>>> Get()
        {
            var allModelList = await _context.Models
                            .ToListAsync();

            var mappedModelList = new List<ModelDTO>();
            mappedModelList = _mapper.Map<List<ModelDTO>>(allModelList);
            return mappedModelList;
        }
    }
}
