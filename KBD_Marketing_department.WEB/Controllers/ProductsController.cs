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
            return await productService.GetAllProducts();
        }

        [HttpPost]
        public async Task<Product> CreateProduct([FromBody] Product product)
        {
            return await productService.CreateProduct(product);
        }

        [HttpDelete]
        public async Task DeleteProduct([FromQuery] int code)
        {
            await productService.DeleteProduct(code);
        }

        [HttpPut]
        public async Task UpdateProduct([FromBody] ProductEdit product)
        {
            await productService.UpdateProduct(product);

            if (product.Price != product.OldPrice)
            {
                await productService.CreateProductSnapshot(product);
            }
        }

        [HttpGet]
        [Route("categories")]
        public async Task<ICollection<string>> GetCategories()
        {
            return await productService.GetCategories();
        }

        [HttpGet]
        [Route("snapshots")]
        public async Task<ICollection<ProductSnapshot>> GetProductSnapshots([FromQuery] int code)
        {
            return await productService.GetProductSnapshots(code);
        }
    }
}
