using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KBD_Marketing_department.WEB.Models
{
    public enum CustomerType { Individual, Legal }

    public class Customer
    {
        public string Type { get; set; }
        public string Name { get; set; }
        public string PersonName { get; set; }
        public string Adress { get; set; }
        // PK, FK
        public string DocumentNumber { get; set; }
        // FK
        public int BankNumber { get; set; }
    }

    public class CustomerCreate
    {
        public string Type { get; set; }
        public string Name { get; set; }
        public string PersonName { get; set; }
        public string Adress { get; set; }
        // PK, FK
        public string DocumentNumber { get; set; }
        public string DocumentSeries { get; set; }
        // FK
        public int BankNumber { get; set; }
    }
    public class CustomerView
    {
        public string Type { get; set; }
        public string Name { get; set; }
        public string PersonName { get; set; }
        public string Adress { get; set; }
        // PK, FK
        public string DocumentNumber { get; set; }
        public string DocumentSeries { get; set; }
        // FK
        public string Bank { get; set; }
    }

    public class Document
    {
        // PK
        public string Number { get; set; }
        public string Series { get; set; }
    }

    public class Bank
    {
        // PK
        public int Number { get; set; }
        public string Name { get; set; }
    }
}
