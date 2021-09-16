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
    public class PrestationsController : ControllerBase {
            private readonly BarterContext _context;

        public PrestationsController(BarterContext context) {
            _context = context;
        }
        

        [HttpGet]
       public async Task<ActionResult<IEnumerable<PrestationDTO>>> GetAll() {
              List<PrestationDTO> listPrestation = (await _context.Prestations.ToListAsync()).ToDTO();
              for (int i=0 ; i<listPrestation.Count;i++){
                Service s =  _context.Services.Find(listPrestation[i].IdServiceProvided);

                listPrestation[i].nomService=s.Title;
              }
              return listPrestation;
        }


        //***********************************POST******************************************/
        //***********************************POST******************************************/
        //***********************************POST******************************************/


       [HttpPost]        
      public async Task<ActionResult<PrestationDTO>> PostService(PrestationDTO data) {
       

              var newPrestation = new Prestation() {
                IdServiceProvided = data.IdServiceProvided,
                IdUserClient = data.IdUserClient,
                IdUserProvider = data.IdUserProvider,
                Date = data.Date,
                Etat = data.Etat
               
              };
          

           _context.Prestations.Add(newPrestation);
        

           var res = await _context.SaveChangesAsyncWithValidation();
             if (!res.IsEmpty) 
             return BadRequest(res);

           return NoContent();
        }

        //***********************************UPDATE******************************************/
        //***********************************UPDATE******************************************/
        //***********************************UPDATE******************************************/



         [HttpPut("PutPrestation/{prestationId}")]
         public async Task<IActionResult> PutUser(int prestationId) {
        

            var prestation = await _context.Prestations.FindAsync(prestationId);

           if (prestation == null)
              return NotFound();

         prestation.Etat = prestation.Etat + 1;
         

         var res = await _context.SaveChangesAsyncWithValidation();
           if (!res.IsEmpty)
           return BadRequest(res);

         return NoContent();
        }


        //***********************************GETORDERED by Client******************************************/
        //***********************************GETORDERED by Client******************************************/
        //***********************************GETORDERED by Client******************************************/

        [HttpGet("getProvided/{userId}")]
        public async Task<ActionResult<IEnumerable<PrestationDTO>>> getProvided(int userId) {
           
             return( await _context.Prestations.Where(p => p.IdUserProvider== userId && p.Etat == Etat.Orded).ToListAsync()).ToDTO();
       }

        //***********************************GETPROVIDED by Client******************************************/
        //***********************************GETPROVIDED by Client******************************************/
        //***********************************GETPROVIDED by Client******************************************/

           [HttpGet("getOrdered/{userId}")]
        public async Task<ActionResult<IEnumerable<PrestationDTO>>> getOrdered(int userId) {
           
             return( await _context.Prestations.Where(p => p.IdUserClient == userId && p.Etat == Etat.Provided).ToListAsync()).ToDTO();
       }


       
        //***********************************GETORDERED by the provider******************************************/
        //***********************************GETORDERED by the provider******************************************/
        //***********************************GETORDERED by the provider******************************************/

          [HttpGet("getOrderedServByProvider/{idUserProvider}")]
        public async Task<ActionResult<IEnumerable<PrestationDTO>>> getOrderedServByProvider(int idUserProvider) {
           
             return( await _context.Prestations.Where(p => p.IdUserClient == idUserProvider && p.Etat ==Etat.Orded).ToListAsync()).ToDTO();
       }


       //***********************************GEtProvided by the provider******************************************/
        //***********************************GEtProvided by the provider******************************************/
        //***********************************GEtProvided by the provider******************************************/
         
             [HttpGet("getProvidedServByProvider/{idUserProvider}")]
        public async Task<ActionResult<IEnumerable<PrestationDTO>>> getProvidedServByProvider(int idUserProvider) {
           
             return( await _context.Prestations.Where(p => p.IdUserProvider == idUserProvider && p.Etat == Etat.Provided).ToListAsync()).ToDTO();
       }



       

        //***********************************GEtProvided by the provider******************************************/
        //***********************************GEtProvided by the provider******************************************/
        //***********************************GEtProvided by the provider******************************************/
         
         [HttpGet("getNbNotifications/{userId}")]
         public async Task<ActionResult<int>> getNbNotifications(int userId) {
           
              int nbCommandesRecuesAPrester = (await _context.Prestations.Where(p =>
                  p.IdUserProvider== userId && p.Etat == Etat.Orded
               ).ToListAsync()).Count;

              int nbCommanderRecuesApayer =  (await _context.Prestations.Where(p => 
                p.IdUserClient == userId && p.Etat == Etat.Provided
               ).ToListAsync()).Count;

              return(nbCommandesRecuesAPrester+nbCommanderRecuesApayer);
        }
        
    }
}    