using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using BARTER_Framework;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers {

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ServicesController : ControllerBase {

    private readonly BarterContext _context;

        public ServicesController(BarterContext context) {
            _context = context;
        }

          [AllowAnonymous]
         [HttpGet]
       public async Task<ActionResult<IEnumerable<ServiceDTO>>> GetAll() {
              return (await _context.Services.ToListAsync()).ToDTO();
        }

          [AllowAnonymous]
          [HttpPost]        
      public async Task<ActionResult<ServiceDTO>> PostService(ServiceDTO data) {
       Offer offer = await _context.Offers.FindAsync(data.OfferLinkedtoServiceId);
       Category category =await _context.Categories.FindAsync(data.CategoryLinkToId); 

              var newService = new Service() {
                Title= data.Title,
                OfferLinkedtoServiceId = data.OfferLinkedtoServiceId,
                CategoryLinkToId = data.CategoryLinkToId,
                IsRecherche = data.IsRecherche
              };
          Console.WriteLine(offer);
          Console.WriteLine(offer.ServicesLinkedToOffer);

           _context.Services.Add(newService);
          offer.ServicesLinkedToOffer.Add(newService);
          category.CategorysServices.Add(newService);

           var res = await _context.SaveChangesAsyncWithValidation();
             if (!res.IsEmpty) 
             return BadRequest(res);

           return NoContent();
        }



          [AllowAnonymous]
         [HttpGet("getRequestedSevices/{email}")]
        public async Task<ActionResult<IEnumerable<ServiceDTO>>> getRequestedSevices(string email) {
            User user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
            if (user == null)
              return NotFound(); 
            Offer offer = await _context.Offers.SingleOrDefaultAsync(o => o.AuthorId == user.UserId); 
             return( await _context.Services.Where(s => s.IsRecherche == true && s.OfferLinkedtoServiceId == offer.OfferId).ToListAsync()).ToDTO();

       
        }
          [AllowAnonymous]
         [HttpGet("getOfferedSevices/{email}")]
        public async Task<ActionResult<IEnumerable<ServiceDTO>>> getOfferedSevices(string email) {
            User user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
            if (user == null)
              return NotFound(); 
            Offer offer = await _context.Offers.SingleOrDefaultAsync(o => o.AuthorId == user.UserId); 
            var offerList = await _context.Services.Where(s => s.IsRecherche == false && s.OfferLinkedtoServiceId == offer.OfferId).ToListAsync();

            return ( offerList == null ) ?  NotFound() :  offerList.ToDTO();
        }

         [AllowAnonymous]
        [HttpGet("getSingleOfferedSevices/{email}/{servId}")]
         public async Task<ActionResult<ServiceDTO>> getSingleOfferedSevices(string email,int servId) {
            User user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
            if (user == null)
              return NotFound(); 
              Offer offer = await _context.Offers.SingleOrDefaultAsync(o => o.AuthorId == user.UserId); 
            var offerList = await _context.Services.Where(s => s.IsRecherche == false && s.OfferLinkedtoServiceId == offer.OfferId).ToListAsync();

          var service = offerList.Find(s=>s.ServiceId== servId).ToDTO();
        return service;
         }



           [AllowAnonymous]
         [HttpDelete("deleteService/{serviceId}")]
        public async Task<IActionResult> deleteService(int serviceId) {
          var service = await _context.Services.FindAsync(serviceId);
           if (service == null)
              return NotFound(); 

          var offer = await _context.Offers.FindAsync(service.OfferLinkedtoServiceId);
           if (offer == null)
              return NotFound();

          var category =await _context.Categories.FindAsync(service.CategoryLinkToId); 
           if (category == null)
              return NotFound(); 

          category.CategorysServices.Remove(service);           

          offer.ServicesLinkedToOffer.Remove(service);

           service.CommentLinkedToService.Clear();

          _context.Services.Remove(service);
          
          
                var res = await _context.SaveChangesAsyncWithValidation();
                if (!res.IsEmpty)
                    return BadRequest(res);

                return NoContent();    
            }

      }
            

       
      
         
    }
