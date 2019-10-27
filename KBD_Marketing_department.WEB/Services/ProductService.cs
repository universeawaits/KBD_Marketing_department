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
        private string productsSnapshotsTableName;

        public ProductService(string connString)
        {
            Connection = new NpgsqlConnection(connString);
            Connection.Open();

            productsTableName = "products";
            productsSnapshotsTableName = "products_snapshots";
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
                    products.Add(new Product
                    {
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

        public async Task<Product> CreateProduct(Product product)
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

            using (
                NpgsqlCommand command = new NpgsqlCommand(
                $"select code from {productsTableName} where " +
                $"name = '{product.Name}' and " +
                $"manufacturer = '{product.Manufacturer}' and " +
                $"category = '{product.Category}'",
                Connection
                ))
            {
                product.Code = (int) await command.ExecuteScalarAsync();
            }

            return product;
        }

        public async Task DeleteProduct(int code)
        {
            using (
                NpgsqlCommand command = new NpgsqlCommand(
                $"delete from {productsTableName} where code = {code}",
                Connection
                ))
            {
                await command.ExecuteNonQueryAsync();
            }
        }

        public async Task UpdateProduct(ProductEdit product)
        {
            using (
                NpgsqlCommand command = new NpgsqlCommand(
                $"update {productsTableName} set " +
                $"name = '{product.Name}', category = '{product.Category}', price = {product.Price}" +
                $"where code = {product.Code}",
                Connection
                ))
            {
                await command.ExecuteNonQueryAsync();
            }
        }

        public async Task CreateProductSnapshot(ProductEdit product)
        {
            using (
                NpgsqlCommand command = new NpgsqlCommand(
                $"insert into {productsSnapshotsTableName} (manufacturer, datetime, name, price) values" +
                $"('{product.Manufacturer}', '{DateTime.Now}', '{product.Name}', {product.Price}); ",
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
