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
    public class InvoicesController : ControllerBase
    {
        private readonly InvoiceService invoiceService;

        public InvoicesController(InvoiceService invoiceService)
        {
            this.invoiceService = invoiceService;
        }

        [HttpGet]
        public async Task<ICollection<Invoice>> GetAllInvoices()
        {
            return await invoiceService.GetAllInvoicesAsync();
        }

        [HttpPost]
        public async Task<IActionResult> CreateInvoice([FromBody] Invoice invoice)
        {
            string error = await invoiceService.CreateInvoiceAsync(invoice);

            if (error != null)
            {
                return BadRequest(error);
            }

            return Ok();
        }

        [HttpDelete]
        public async Task DeleteProduct([FromQuery] int id)
        {
            await invoiceService.DeleteInvoice(id);
        }

        [HttpPut]
        public async Task<string> UpdateInvoice([FromBody] Invoice invoice)
        {
            return await invoiceService.UpdateInvoice(invoice);
        }
    }
}
