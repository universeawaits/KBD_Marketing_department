namespace KBD_Marketing_department.Models
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
        public string BankNumber { get; set; }
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
        public string Number { get; set; }
        public string Name { get; set; }
    }
}
