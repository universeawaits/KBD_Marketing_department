﻿using KBD_Marketing_department.WEB.Models;
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
        private string customersTableName;
        private string productsTableName;

        private IDictionary<string, string> exceptionMessages;

        public InvoiceService(string connString)
        {
            Connection = new NpgsqlConnection(connString);
            Connection.Open();

            invoicesTableName = "invoices";
            customersTableName = "customers";
            productsTableName = "products";

            exceptionMessages = new Dictionary<string, string>
            {
                { "23503", "No customer with this document number or product with this code was found" },
                { "23505", "Set of all properties remain (except ID and product code) must be unique per invoice" }
            };
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
                    invoices.Add(new Invoice
                    {
                        Id = (int)reader[0],
                        CustomerDocumentNumber = (string)reader[1],
                        Adress = (string)reader[2],
                        TotalPrice = (double)reader[3],
                        TotalProductCount = (int)reader[4],
                        DateTime = (DateTime)reader[5],
                        ProductCode = (int)reader[6]
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
            double productPrice = 0;

            using (
                NpgsqlCommand command = new NpgsqlCommand(
                $"select price from {productsTableName} where code = {invoice.ProductCode}",
                Connection
                ))
            {
                try
                {
                    productPrice = (double)await command.ExecuteScalarAsync();
                }
                catch (PostgresException ex)
                {
                    if (exceptionMessages.TryGetValue(ex.SqlState, out string message))
                    {
                        return message;
                    }
                }
            }

            invoice.TotalPrice = invoice.TotalProductCount * productPrice;

            using (
                NpgsqlCommand command = new NpgsqlCommand(
                $"insert into {invoicesTableName} " +
                $"(customer_doc, adress, total_price, total_product_count, datetime, product_code) values" +
                $"('{invoice.CustomerDocumentNumber}', '{invoice.Adress}', " +
                $"{invoice.TotalPrice.ToString().Replace(",", ".")}, {invoice.TotalProductCount}, '{invoice.DateTime.Date}', " +
                $"{invoice.ProductCode}); ",
                Connection
                ))
            {
                try
                {
                    await command.ExecuteNonQueryAsync();
                }
                catch (PostgresException ex)
                {
                    if (exceptionMessages.TryGetValue(ex.SqlState, out string message))
                    {
                        return message;
                    }
                }
            }

            using (
                NpgsqlCommand command = new NpgsqlCommand(
                $"select id from {invoicesTableName} where " +
                $"customer_doc = '{invoice.CustomerDocumentNumber}' and " +
                $"adress = '{invoice.Adress}' and " +
                $"total_price = {invoice.TotalPrice.ToString().Replace(",", ".")} and " +
                $"total_product_count = {invoice.TotalProductCount} and " +
                $"datetime = '{invoice.DateTime.Date}'",
                Connection
                ))
            {
                object id = await command.ExecuteScalarAsync();
                invoice.Id = (int)id;
            }

            return null;
        }

        public async Task<string> UpdateInvoice(Invoice invoice)
        {
            double productPrice = 0;

            using (
                NpgsqlCommand command = new NpgsqlCommand(
                $"select price from {productsTableName} where code = {invoice.ProductCode}",
                Connection
                ))
            {
                try
                {
                    productPrice = (double)await command.ExecuteScalarAsync();
                }
                catch (PostgresException ex)
                {
                    if (exceptionMessages.TryGetValue(ex.SqlState, out string message))
                    {
                        return message;
                    }
                }
            }

            invoice.TotalPrice = invoice.TotalProductCount * productPrice;

            using (
                NpgsqlCommand command = new NpgsqlCommand(
                $"update {invoicesTableName} set " +
                $"customer_doc = '{invoice.CustomerDocumentNumber}', adress = '{invoice.Adress}'," +
                $" total_price = {invoice.TotalPrice.ToString().Replace(",", ".")}, " +
                $"total_product_count = {invoice.TotalProductCount}, datetime = '{invoice.DateTime.Date}'," +
                $" product_code = {invoice.ProductCode} " +
                $"where id = {invoice.Id}",
                Connection
                ))
            {
                try
                {
                    await command.ExecuteNonQueryAsync();
                }
                catch (PostgresException ex)
                {
                    if (exceptionMessages.TryGetValue(ex.SqlState, out string message))
                    {
                        return message;
                    }
                }
            }

            return null;
        }

        public async Task<ICollection<CustomerInvoice>> GetMaxPriceInvoices(DateTime dateTime)
        {
            ICollection<CustomerInvoice> maxInvoices = new List<CustomerInvoice>();

            using (
                NpgsqlCommand command = new NpgsqlCommand(
                $"select i.datetime, c.name, i.adress, i.total_price from {invoicesTableName} i " +
                $"inner join {customersTableName} c on c.doc_number = i.customer_doc " +
                $"where i.total_price = (select MAX(total_price) from {invoicesTableName} i2 " +
                $"where i2.datetime = '{dateTime.Date}')",
                Connection
                ))
            {
                reader = await command.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    maxInvoices.Add(new CustomerInvoice
                    {
                        DateTime = (DateTime)reader[0],
                        CustomerName = (string)reader[1],
                        Adress = (string)reader[2],
                        TotalPrice = (double)reader[3]
                    });
                }
            }

            return maxInvoices;
        }

        public void Dispose()
        {
            Connection.Close();
            Connection.DisposeAsync();
        }
    }
}
