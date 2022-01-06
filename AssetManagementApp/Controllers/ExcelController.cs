//using Microsoft.AspNetCore.Mvc;
//using Microsoft.Extensions.Logging;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using AssetManagementApp.Models;
//using AssetManagementApp.DTOs;
//using Microsoft.EntityFrameworkCore;
//using AutoMapper;
//using AssetManagementApp.Helpers;
//using System.Text;

//namespace AssetManagementApp.Controllers
//{
//    public class ExcelController : Controller
//    {
//        private readonly AssetDBContext _context;
//        private readonly ILogger<ExcelController> _logger;
//        private readonly IMapper _mapper;

//        public ExcelController(AssetDBContext context,
//                               ILogger<ExcelController> logger,
//                               IMapper mapper)
//        {
//            _context = context;
//            _logger = logger;
//            _mapper = mapper;
//        }

//        public List<Asset> assetExcel = new List<Asset>
//        {
            
//        };

//        public IActionResult Index()
//        {
//            return View();
//        }

//        public IActionResult CSV()
//        {
//            var builder = new StringBuilder();
//            builder.AppendLine("AssetName,Price,Description");
//            foreach(var item in collection)
//            {

//            }
//        }
//    }
//}
