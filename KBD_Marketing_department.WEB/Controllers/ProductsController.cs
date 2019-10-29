using KBD_Marketing_department.WEB.Models;
using KBD_Marketing_department.WEB.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KBD_Marketing_department.WEB.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductService productService;

        public ProductsController(ProductService productService)
        {
            this.productService = productService;
        }

        [HttpGet]
        public async Task<ICollection<Product>> GetAllProducts()
        {
            return await productService.GetAllProductsAsync();
        }

        [HttpPost]
        public async Task<Product> CreateProduct([FromBody] Product product)
        {
            return await productService.CreateProductAsync(product);
        }

        [HttpDelete]
        public async Task DeleteProduct([FromQuery] int code)
        {
            await productService.DeleteProductAsync(code);
        }

        [HttpPut]
        public async Task UpdateProduct([FromBody] ProductEdit product)
        {
            await productService.UpdateProductAsync(product);

            if (product.Price != product.OldPrice)
            {
                await productService.CreateProductSnapshotAsync(product);
            }
        }

        [HttpGet]
        [Route("categories")]
        public async Task<ICollection<string>> GetCategories()
        {
            return await productService.GetCategoriesAsync();
        }

        [HttpGet]
        [Route("snapshots")]
        public async Task<ICollection<ProductSnapshot>> GetProductSnapshots([FromQuery] int code)
        {
            return await productService.GetProductSnapshotsAsync(code);
        }
    }
}
