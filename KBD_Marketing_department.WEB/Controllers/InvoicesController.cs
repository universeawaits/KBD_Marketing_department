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

            return Ok(invoice);
        }

        [HttpDelete]
        public async Task DeleteInvoice([FromQuery] int id)
        {
            await invoiceService.DeleteInvoice(id);
        }

        [HttpGet]
        [Route("maxPrice")]
        public async Task<ICollection<CustomerInvoice>> GetMaxPriceInvoices([FromQuery] DateTime dateTime)
        {
            return await invoiceService.GetMaxPriceInvoices(dateTime);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateInvoice([FromBody] Invoice invoice)
        {
            string error = await invoiceService.UpdateInvoice(invoice);

            if (error != null)
            {
                return BadRequest(error);
            }

            return Ok(invoice);
        }
    }
}
