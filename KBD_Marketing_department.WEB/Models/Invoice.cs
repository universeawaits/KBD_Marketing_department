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
        public string CustomerDocumentNumber { get; set; }
        public DateTime DateTime { get; set; }
        public double TotalPrice { get; set; }
        public int TotalProductCount { get; set; }
        public string Adress { get; set; }
    }

    public class CustomerInvoice
    {
        public DateTime DateTime { get; set; }
        public string CustomerName { get; set; }
        public string Adress { get; set; }
        public double TotalPrice { get; set; }
    }
}
