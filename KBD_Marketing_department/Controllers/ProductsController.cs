using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KBD_Marketing_department.Models;
using KBD_Marketing_department.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace KBD_Marketing_department.Controllers
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
    }
}