using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KBD_Marketing_department.WEB.Models
{
    public class Product
    {
        // PK
        public int Code { get; set; }
        public string Manufacturer { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public int Price { get; set; }
    }

    public class ProductSnapshot
    {
        // PK
        public int Id { get; set; }
        public string Manufacturer { get; set; }
        public string Name { get; set; }
        public DateTime DateTime { get; set; }
        public int Price { get; set; }
    }

    public class ProductEdit
    {
        // PK
        public int Code { get; set; }
        public string Manufacturer { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public int Price { get; set; }
        public int OldPrice { get; set; }
    }
}
