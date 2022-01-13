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
                            .Include(x => x.Model)
                            .Include(x => x.ManuFacturer)
                            .Include(x => x.Color)
                            .ToListAsync();

            var mappedAssetList = new List<AssetDTO>();
            mappedAssetList = _mapper.Map<List<AssetDTO>>(allAssetList);
            return mappedAssetList;
        }

        [HttpGet("filter")]
        public async Task<ActionResult<List<AssetDTO>>> Filter([FromQuery] PaginationDTO pagination)
        {
            var queryable = _context.Assets.AsQueryable();

            if (!(pagination.ManuFacturerId.Equals(Guid.Empty)))
            {
                queryable = queryable.Where(x => x.ManuFacturerId.Equals(pagination.ManuFacturerId));
            }

            if (!(pagination.ModelId.Equals(Guid.Empty)))
            {
                queryable = queryable.Where(x => x.ModelId.Equals(pagination.ModelId));
            }

            await HttpContext.InsertPaginationParametersInResponse(queryable,
                pagination.RecordsPerPage);

            var assets = await queryable.Paginate(pagination)
                            .Include(x => x.Model)
                            .Include(x => x.ManuFacturer)
                            .Include(x => x.Color)
                            .ToListAsync();
            return _mapper.Map<List<AssetDTO>>(assets);
        }

        //[HttpGet("getAllAssetsCount")]
        //public async Task<ActionResult<int>> getAllAssetsCount([FromQuery] PaginationDTO pagination)
        //{
        //    var queryable = _context.Assets.AsQueryable();

        //    if (!(pagination.ManuFacturerId.Equals(Guid.Empty)))
        //    {
        //        queryable = queryable.Where(x => x.ManuFacturerId.Equals(pagination.ManuFacturerId));
        //    }

        //    if (!(pagination.ModelId.Equals(Guid.Empty)))
        //    {
        //        queryable = queryable.Where(x => x.ModelId.Equals(pagination.ModelId));
        //    }
        //    int assetsCount = await _context.Assets.CountAsync();
        //    return assetsCount;
        //}

        [HttpGet("{id}", Name = "getAsset")]
        public async Task<ActionResult<AssetDTO>> Get(Guid id)
        {
            var asset = await _context.Assets
                            .Include(x => x.Model)
                            .Include(x => x.ManuFacturer)
                            .Include(x => x.Color)
                            .FirstOrDefaultAsync(x => x.Id.Equals(id));

            if (asset == null)
            {
                return NotFound();
            }

            return _mapper.Map<AssetDTO>(asset);
        }

        [HttpPut("{Id}")]
        public async Task<ActionResult> Put([FromBody] AssetInsertionDTO assetInsertionDTO)
        {
            var mappedAsset = new Asset();
            mappedAsset = _mapper.Map<Asset>(assetInsertionDTO);

            _context.Entry(mappedAsset).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] AssetInsertionDTO assetInsertionDTO)
        {
            if (ModelState.IsValid)
            {
                var mappedAsset = new Asset();
                mappedAsset = _mapper.Map<Asset>(assetInsertionDTO);
                Guid id = Guid.NewGuid();
                mappedAsset.Id = id;
                _context.Assets.Add(mappedAsset);
                await _context.SaveChangesAsync();
                return Ok();
            }
            else
            {
                ModelState.AddModelError("ErrorMessage", "Check the errors");
                return Forbid();
            }
        }
    }
}
