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
    public class ColorController : ControllerBase
    {
        private readonly AssetDBContext _context;
        private readonly ILogger<ColorController> _logger;
        private readonly IMapper _mapper;

        public ColorController(AssetDBContext context,
                               ILogger<ColorController> logger,
                               IMapper mapper)
        {
            _context = context;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<ColorDTO>>> Get()
        {
            var allColorList = await _context.Colors
                            .ToListAsync();

            var mappedColorList = new List<ColorDTO>();
            mappedColorList = _mapper.Map<List<ColorDTO>>(allColorList);
            return mappedColorList;
        }
    }
}
