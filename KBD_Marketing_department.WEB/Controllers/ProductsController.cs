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

        [HttpPost]
        public async Task CreateProduct([FromBody] Product product)
        {
            await productService.CreateProduct(product);
        }

        [HttpGet]
        public async Task<ICollection<Product>> GetAllProducts()
        {
            return await productService.GetAllProducts();
        }
    }
}
