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
                User client = _context.Users.Find(listPrestation[i].IdUserClient);
                 User provider = _context.Users.Find(listPrestation[i].IdUserProvider);

                listPrestation[i].nomService=s.Title;
                listPrestation[i].nomClient=client.Nickname;
                listPrestation[i].nomProvider=provider.Nickname;
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



         [HttpPut("getEtatChanged/{id}")]
         public async Task<IActionResult> getEtatChanged(int id) {
        

            var prestation = await _context.Prestations.FindAsync(id);

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
           
            List<PrestationDTO> listPrestation =  ( await _context.Prestations.Where(p => p.IdUserProvider== userId && p.Etat == Etat.Orded || p.IdUserProvider== userId && p.Etat == Etat.Provided).ToListAsync()).ToDTO();
             for (int i=0 ; i<listPrestation.Count;i++){
                Service s =  _context.Services.Find(listPrestation[i].IdServiceProvided);
                User client = _context.Users.Find(listPrestation[i].IdUserClient);
                 User provider = _context.Users.Find(listPrestation[i].IdUserProvider);

                listPrestation[i].nomService=s.Title;
              

                listPrestation[i].nomClient=client.Nickname;
               

                listPrestation[i].nomProvider=provider.Nickname;
           
              }
              return listPrestation;
       }

        //***********************************GETPROVIDED by Client******************************************/
        //***********************************GETPROVIDED by Client******************************************/
        //***********************************GETPROVIDED by Client******************************************/

           [HttpGet("getOrdered/{userId}")]
        public async Task<ActionResult<IEnumerable<PrestationDTO>>> getOrdered(int userId) {
           
           
              List<PrestationDTO> listPrestation = ( await _context.Prestations.Where
              (p => p.IdUserClient == userId && p.Etat == Etat.Orded || p.IdUserClient == userId && p.Etat == Etat.Provided).ToListAsync()).ToDTO();

             for (int i=0 ; i<listPrestation.Count;i++){
                Service s =  _context.Services.Find(listPrestation[i].IdServiceProvided);
                User client = _context.Users.Find(listPrestation[i].IdUserClient);
                 User provider = _context.Users.Find(listPrestation[i].IdUserProvider);

                listPrestation[i].nomService=s.Title;
                listPrestation[i].nomClient=client.Nickname;
                listPrestation[i].nomProvider=provider.Nickname;
               
              }
              return listPrestation;
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
       
          [HttpDelete("getPrestDeleted/{id}")]
        public async Task<IActionResult> getPrestDeleted(int id) {
          var prestation = await _context.Prestations.FindAsync(id);
           if (prestation == null)
              return NotFound(); 

          _context.Prestations.Remove(prestation);
          
          
                var res = await _context.SaveChangesAsyncWithValidation();
                if (!res.IsEmpty)
                    return BadRequest(res);

                return NoContent();    
            

      }

        
        
    }
}    