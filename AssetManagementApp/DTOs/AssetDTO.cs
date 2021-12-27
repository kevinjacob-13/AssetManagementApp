using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AssetManagementApp.Models;

namespace AssetManagementApp.DTOs
{
    public class AssetDTO
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public string ColorName { get; set; }
        public string ManufacturerName { get; set; }
        public string ModelName { get; set; }
        //public virtual Color Color { get; set; }
        //public virtual Manufacturer ManuFacturer { get; set; }
        //public virtual Model Model { get; set; }
    }
}
