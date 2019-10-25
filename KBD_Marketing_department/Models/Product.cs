using System;


namespace KBD_Marketing_department.Models
{
    public class Product
    {
        // PK
        public string Code { get; set; }
        public string Name { get; set; }
        // FK
        public int CategoryId { get; set; }
        public int Price { get; set; }
    }

    public class Category
    {
        // PK
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class ProductSnapshot
    {
        // PK
        public int Id { get; set; }
        public string ManufactoryName { get; set; }
        public string Name { get; set; }
        public DateTime DateTime { get; set; }
        public string Price { get; set; }
    }
}
