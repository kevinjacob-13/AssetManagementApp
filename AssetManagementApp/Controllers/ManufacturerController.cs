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
    public class ManufacturerController : ControllerBase
    {
        private readonly AssetDBContext _context;
        private readonly ILogger<ManufacturerController> _logger;
        private readonly IMapper _mapper;

        public ManufacturerController(AssetDBContext context,
                               ILogger<ManufacturerController> logger,
                               IMapper mapper)
        {
            _context = context;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<ManufacturerDTO>>> Get()
        {
            var allManufacturerList = await _context.Manufacturers
                            .ToListAsync();

            var mappedManufacturerList = new List<ManufacturerDTO>();
            mappedManufacturerList = _mapper.Map<List<ManufacturerDTO>>(allManufacturerList);
            return mappedManufacturerList;
        }
    }
}
