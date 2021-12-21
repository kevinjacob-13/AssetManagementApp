using System;
using System.Collections.Generic;

#nullable disable

namespace AssetManagementApp.Models
{
    public partial class Color
    {
        public Color()
        {
            Assets = new HashSet<Asset>();
        }

        public Guid Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Asset> Assets { get; set; }
    }
}
