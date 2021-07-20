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
    public class OffersController : ControllerBase {
            private readonly BarterContext _context;

        public OffersController(BarterContext context) {
            _context = context;
        }
        [HttpGet]
       public async Task<ActionResult<IEnumerable<OfferDTO>>> GetAll() {
              return (await _context.Offers.ToListAsync()).ToDTO();
        } 
           [HttpGet("{offerId}")]
     public async Task<ActionResult<OfferDTO>> GetOne(string offerId) {
        var offer = await _context.Offers.FindAsync(offerId);
           if (offer == null)
             return NotFound();
           return offer.ToDTO(); 
        }   

    }
}