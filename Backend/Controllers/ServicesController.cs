using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using BARTER_Framework;

namespace backend.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ServicesController : ControllerBase {

    private readonly BarterContext _context;

        public ServicesController(BarterContext context) {
            _context = context;
        }
         [HttpGet]
       public async Task<ActionResult<IEnumerable<ServiceDTO>>> GetAll() {
              return (await _context.Services.ToListAsync()).ToDTO();
        }      
    }
}