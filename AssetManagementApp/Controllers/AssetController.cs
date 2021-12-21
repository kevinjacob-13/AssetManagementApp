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

namespace AssetManagementApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AssetController : ControllerBase
    {
        private readonly AssetDBContext _context;
        private readonly ILogger<AssetController> _logger;
        private readonly IMapper _mapper;

        public AssetController(AssetDBContext context, 
                               ILogger<AssetController> logger,
                               IMapper mapper)
        {
            _context = context;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<AssetDTO>>> Get()
        {
            var allAssetList = await _context.Assets
                            .Take(10)
                            .Include(x => x.Model)
                            .Include(x => x.ManuFacturer)
                            .Include(x => x.Color)
                            .ToListAsync();

            var mappedAssetList = new List<AssetDTO>();
            mappedAssetList = _mapper.Map<List<AssetDTO>>(allAssetList);
            return mappedAssetList;
        }
    }
}
