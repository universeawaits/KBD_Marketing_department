using KBD_Marketing_department.Models;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KBD_Marketing_department.Services
{
    public class ProductService : IDisposable
    {
        public NpgsqlConnection Connection { get; set; }
        private NpgsqlDataReader reader;
        private string productsTableName;

        public ProductService(string connString)
        {
            Connection = new NpgsqlConnection(connString);
            Connection.Open();

            productsTableName = "products";
        }

        public async Task CreateProduct(Product product)
        {
            NpgsqlCommand command = new NpgsqlCommand(
                $"insert into {productsTableName} (manufactorer, name, category, price) values" + 
                $"('{product.Manufacturer}', '{product.Name}', '{product.Category}', {product.Price}); ", 
                Connection
                );
            await command.ExecuteNonQueryAsync();
        }

        public void Dispose()
        {
            Connection.Close();
            Connection.DisposeAsync();
        }
    }
}
