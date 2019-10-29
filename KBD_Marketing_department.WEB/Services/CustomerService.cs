using KBD_Marketing_department.WEB.Models;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KBD_Marketing_department.WEB.Services
{
    public class CustomerService : IDisposable
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

        public async Task<ICollection<CustomerView>> GetAllCustomersAsync()
        {
            ICollection<CustomerView> customers = new List<CustomerView>();

            using (
                NpgsqlCommand command = new NpgsqlCommand(
                $"select c.type, c.name, c.person_name, c.adress, d.number, d.series, b.name from {customersTableName} c " +
                $"inner join {documentsTableName} d on d.number = c.doc_number " +
                $"inner join {banksTableName} b on b.number = c.bank_number",
                Connection
                ))
            {
                reader = await command.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    customers.Add(new CustomerView
                    {
                        Type = (string)reader[0],
                        Name = (string)reader[1],
                        PersonName = (string)reader[2],
                        Adress = (string)reader[3],
                        Bank = (string)reader[6],
                        DocumentNumber = (string)reader[4],
                        DocumentSeries = (string)reader[5]
                    });
                }
            }

            return customers;
        }
        public async Task DeleteCustomerAsync(string documentNumber)
        {
            using (
                NpgsqlCommand command = new NpgsqlCommand(
                $"delete from {documentsTableName} where number = '{documentNumber}'",
                Connection
                ))
            {
                await command.ExecuteNonQueryAsync();
            }
        }

        public async Task<ICollection<Bank>> GetAllBanksAsync()
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

        public async Task<CustomerCreate> CreateCustomerAsync(CustomerCreate customer)
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
                $"('{customer.Type}', '{customer.Name}', '{customer.PersonName}', " +
                $"'{customer.Adress}', '{customer.DocumentNumber}', '{customer.BankNumber}'); ",
                Connection
                ))
            {
                await command.ExecuteNonQueryAsync();
            }

            return customer;
        }

        public void Dispose()
        {
            Connection.Close();
            Connection.DisposeAsync();
        }
    }
}
