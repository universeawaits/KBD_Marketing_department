using KBD_Marketing_department.WEB.Models;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KBD_Marketing_department.WEB.Services
{
    public class CustomerService
    {
        public NpgsqlConnection Connection { get; set; }
        private NpgsqlDataReader reader;

        private string customersTableName;
        private string documentsTableName;
        private string banksTableName;

        public CustomerService(string connString)
        {
            Connection = new NpgsqlConnection(connString);
            Connection.Open();

            customersTableName = "customers";
            documentsTableName = "documents";
            banksTableName = "banks";
        }

        public async Task<ICollection<Customer>> GetAllCustomers()
        {
            ICollection<Customer> customers = new List<Customer>();

            using (
                NpgsqlCommand command = new NpgsqlCommand(
                $"select * from {customersTableName}",
                Connection
                ))
            {
                reader = await command.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    customers.Add(new Customer
                    {
                        Type = (string)reader[0],
                        Name = (string)reader[1],
                        PersonName = (string)reader[2],
                        Adress = (string)reader[3],
                        DocumentNumber = (string)reader[4],
                        BankNumber = (int)reader[5],
                    });
                }
            }

            return customers;
        }

        public async Task<ICollection<Bank>> GetAllBanks()
        {
            ICollection<Bank> banks = new List<Bank>();

            using (
                NpgsqlCommand command = new NpgsqlCommand(
                $"select * from {banksTableName}",
                Connection
                ))
            {
                reader = await command.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    banks.Add(new Bank
                    {
                        Number = (int)reader[0],
                        Name = (string)reader[1]
                    });
                }
            }

            return banks;
        }

        public async Task<CustomerCreate> CreateCustomer(CustomerCreate customer)
        {
            using (
                NpgsqlCommand command = new NpgsqlCommand(
                $"insert into {documentsTableName} (number, series) values" +
                $"('{customer.DocumentNumber}', '{customer.DocumentSeries}'); ",
                Connection
                ))
            {
                await command.ExecuteNonQueryAsync();
            }

            using (
                NpgsqlCommand command = new NpgsqlCommand(
                $"insert into {customersTableName} (type, name, person_name, adress, doc_number, bank_number) values" +
                $"('{customer.Type}', '{customer.Name}', '{customer.PersonName}', '{customer.Adress}', '{customer.DocumentNumber}', '{customer.BankNumber}'); ",
                Connection
                ))
            {
                await command.ExecuteNonQueryAsync();
            }

            return customer;
        }
    }
}
