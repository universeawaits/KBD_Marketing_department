using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KBD_Marketing_department.WEB.Models
{
    public class Invoice
    {
        // PK
        public int Id { get; set; }
        // FK
        public string CustomerDocumnetNumber { get; set; }
        public DateTime DateTime { get; set; }
        public int TotalPrice { get; set; }
        public int TotalProductCount { get; set; }
        public string Adress { get; set; }
    }
}
