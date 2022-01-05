using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AssetManagementApp.DTOs
{
    public class AssetInsertionDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid ModelId { get; set; }
        public Guid ManuFacturerId { get; set; }
        public decimal Price { get; set; }
        public Guid? ColorId { get; set; }
        public bool InUse { get; set; }
        public string Description { get; set; }
        public DateTime? PurchaseDate { get; set; }
    }
}
