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



         [HttpGet("getRequestedSevices/{email}")]
        public async Task<ActionResult<IEnumerable<ServiceDTO>>> getRequestedSevices(string email) {
            User user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
            if (user == null)
              return NotFound(); 
            Offer offer = await _context.Offers.SingleOrDefaultAsync(o => o.AuthorId == user.UserId); 
             return( await _context.Services.Where(s => s.IsRecherche == true && s.OfferLinkedtoServiceId == offer.OfferId).ToListAsync()).ToDTO();

       
        }
        
         [HttpGet("getOfferedSevices/{email}")]
        public async Task<ActionResult<IEnumerable<ServiceDTO>>> getOfferedSevices(string email) {
            User user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
            if (user == null)
              return NotFound(); 
            Offer offer = await _context.Offers.SingleOrDefaultAsync(o => o.AuthorId == user.UserId); 
            var offerList = await _context.Services.Where(s => s.IsRecherche == false && s.OfferLinkedtoServiceId == offer.OfferId).ToListAsync();

            return ( offerList == null ) ?  NotFound() :  offerList.ToDTO();
            

       
        }
         
    }
}