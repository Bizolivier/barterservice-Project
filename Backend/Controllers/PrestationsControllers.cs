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
              return (await _context.Prestations.ToListAsync()).ToDTO();
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


        //***********************************UPDATE******************************************/
        //***********************************UPDATE******************************************/
        //***********************************UPDATE******************************************/
    }
}    