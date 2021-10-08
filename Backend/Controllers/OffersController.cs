using System;
using System.Linq;
using System.Collections.Generic;
using System.IO;
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
        public class OffersController : ControllerBase {
             private readonly BarterContext _context;

             public OffersController(BarterContext context) {
                 _context = context;
            }
            [AllowAnonymous]
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
        
            [AllowAnonymous]
            [HttpGet("GetOfferByEmail/{email}")]
            public async Task<ActionResult<OfferDTO>> GetOfferByEmail(string email) {
                  var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);

                  if (user == null)
                    return NotFound();
           
                 Offer offer = await _context.Offers.SingleOrDefaultAsync(o => o.AuthorId == user.UserId);

                 if (offer == null)
                    return NotFound();

                   return offer.ToDTO();

            }

            [AllowAnonymous]
            [HttpGet("GetOfferByAuthorId/{userId}")]
            public async Task<ActionResult<OfferDTO>> GetOfferByAuthorId(int userId) {
                 Offer offer = await _context.Offers.SingleOrDefaultAsync(o => o.AuthorId == userId);

                 if (offer == null)
                    return NotFound();

                   return offer.ToDTO();

            }



            [AllowAnonymous]
            [HttpGet("GetOffersBySearch/{searchValue}/{provinceNum}/{categoryId}")]
            public async Task<ActionResult<IEnumerable<OfferDTO>>> GetOffersBySearch(string searchValue, int provinceNum,int categoryId) {

               List<User> listUsers = await _context.Users.ToListAsync();

              if(provinceNum!=-1){

                listUsers = await _context.Users.Where(u =>((int) u.Province) == provinceNum).ToListAsync();
              }            
             

              List<Offer> listOffers = await _context.Offers.Where(o=>(listUsers.Select(u=>u.UserId).ToList()).Contains(o.AuthorId)).ToListAsync();

               if(categoryId != 0){
                 
                 List<Service> listService = await _context.Services.Where(
                   s=>(s.CategoryLinkToId ==categoryId && (listOffers.Select(s=>(s.OfferId)).ToList()).Contains( s.OfferLinkedtoServiceId))
                   ).ToListAsync();

                listOffers = listOffers.Where(o=>((listService.Select(s=>(s.OfferLinkedtoServiceId )).ToList()).Contains(o.OfferId))).ToList();


               }

              if(searchValue!="-1"){
                 List<Service> listService = await _context.Services.Where(
                   s=>(s.Title.Contains(searchValue) && (listOffers.Select(s=>(s.OfferId)).ToList()).Contains( s.OfferLinkedtoServiceId))
                   ).ToListAsync();

                listOffers = listOffers.Where(o=>((listService.Select(s=>(s.OfferLinkedtoServiceId )).ToList()).Contains(o.OfferId))).ToList();


              }
              return listOffers.ToDTO();


             }
          } 
        }