using KBD_Marketing_department.WEB.Models;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KBD_Marketing_department.WEB.Services
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
            using (
                NpgsqlCommand command = new NpgsqlCommand(
                $"insert into {productsTableName} (manufacturer, name, category, price) values" +
                $"('{product.Manufacturer}', '{product.Name}', '{product.Category}', {product.Price}); ",
                Connection
                ))
            {
                await command.ExecuteNonQueryAsync();
            }            
        }

        public async Task<ICollection<Product>> GetAllProducts()
        {
            ICollection<Product> products = new List<Product>();

            using (
                NpgsqlCommand command = new NpgsqlCommand(
                $"select code, manufacturer, name, category, price from {productsTableName}", 
                Connection
                ))
            {
                reader = await command.ExecuteReaderAsync();

                while (await reader.ReadAsync())
                {
                    products.Add(new Product {
                        Code = (int)reader[0],
                        Manufacturer = (string)reader[1],
                        Name = (string)reader[2],
                        Category = (string)reader[3],
                        Price = (int)reader[4]
                    });
                }
            }

            return products;
        }

        public void Dispose()
        {
            Connection.Close();
            Connection.DisposeAsync();
        }
    }
}
