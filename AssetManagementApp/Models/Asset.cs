using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using AssetManagementApp.Custom_Validations;

#nullable disable

namespace AssetManagementApp.Models
{
    public partial class Asset
    {
        [RegularExpression(@"^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$")]
        public Guid Id { get; set; }

        [Required]
        [StringLength(40)]
        public string Name { get; set; }

        [RegularExpression(@"^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$")]
        [Required]
        public Guid ModelId { get; set; }

        [RegularExpression(@"^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$")]
        [Required]
        public Guid ManuFacturerId { get; set; }

        [RegularExpression(@"^\d+(\.\d{1,2})?$")]
        [Range(0, 9999999999.99)]
        [Required]
        public decimal Price { get; set; }

        [RegularExpression(@"^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$")]
        public Guid? ColorId { get; set; }

        [Required]
        public bool InUse { get; set; }

        [StringLength(400)]
        public string Description { get; set; }

        [FutureDate(ErrorMessage = "Date should not be in the future.")]
        [DataType(DataType.DateTime)]
        public DateTime? PurchaseDate { get; set; }

        public virtual Color Color { get; set; }
        public virtual Manufacturer ManuFacturer { get; set; }
        public virtual Model Model { get; set; }
    }
}
