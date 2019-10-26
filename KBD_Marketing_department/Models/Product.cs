using System;


namespace KBD_Marketing_department.Models
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
}
