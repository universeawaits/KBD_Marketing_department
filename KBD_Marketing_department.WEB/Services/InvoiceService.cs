using KBD_Marketing_department.WEB.Models;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KBD_Marketing_department.WEB.Services
{
    public class InvoiceService : IDisposable
    {
        public NpgsqlConnection Connection { get; set; }
        private NpgsqlDataReader reader;

        private string invoicesTableName;

        public InvoiceService(string connString)
        {
            Connection = new NpgsqlConnection(connString);
            Connection.Open();

            invoicesTableName = "invoices";
        }

        public async Task<ICollection<Invoice>> GetAllInvoicesAsync()
        {
            ICollection<Invoice> invoices = new List<Invoice>();

            using (
                NpgsqlCommand command = new NpgsqlCommand(
                $"select * from {invoicesTableName}",
                Connection
                ))
            {
                reader = await command.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    var t = (DateTime)reader[5];

                    invoices.Add(new Invoice
                    {
                        Id = (int)reader[0],
                        CustomerDocumentNumber = (string)reader[1],
                        Adress = (string)reader[2],
                        TotalPrice = (int)reader[3],
                        TotalProductCount = (int)reader[4],
                        DateTime = (DateTime)reader[5]
                    });
                }
            }

            return invoices;
        }

        public async Task DeleteInvoice(int id)
        {
            using (
                NpgsqlCommand command = new NpgsqlCommand(
                $"delete from {invoicesTableName} where id = {id}",
                Connection
                ))
            {
                await command.ExecuteNonQueryAsync();
            }
        }

        public async Task<string> CreateInvoiceAsync(Invoice invoice)
        {
            using (
                NpgsqlCommand command = new NpgsqlCommand(
                $"insert into {invoicesTableName} " +
                $"(customer_doc, adress, total_price, total_product_count, datetime) values" +
                $"('{invoice.CustomerDocumentNumber}', '{invoice.Adress}', " +
                $"{invoice.TotalPrice}, {invoice.TotalProductCount}, '{invoice.DateTime.Date}'); ",
                Connection
                ))
            {
                try
                {
                    await command.ExecuteNonQueryAsync();
                }
                catch (PostgresException ex)
                {
                    return ex.SqlState;
                }
            }

            return null;
        }

        public async Task UpdateInvoice(Invoice invoice)
        {
            using (
                NpgsqlCommand command = new NpgsqlCommand(
                $"update {invoicesTableName} set " +
                $"customer_doc = '{invoice.CustomerDocumentNumber}', adress = '{invoice.Adress}'," +
                $" total_price = {invoice.TotalPrice}, " +
                $"total_product_price = {invoice.TotalProductCount}, datetime = '{invoice.DateTime}'" +
                $"where id = {invoice.Id}",
                Connection
                ))
            {
                await command.ExecuteNonQueryAsync();
            }
        }

        public void Dispose()
        {
            Connection.Close();
            Connection.DisposeAsync();
        }
    }
}
