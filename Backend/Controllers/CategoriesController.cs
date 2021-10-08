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
    public class CategoriesController : ControllerBase {
            private readonly BarterContext _context;

        public CategoriesController(BarterContext context) {
            _context = context;
        }
        
       [AllowAnonymous]
       [HttpGet]
       public async Task<ActionResult<IEnumerable<CategoryDTO>>> GetAll() {
              return (await _context.Categories.ToListAsync()).ToDTO();
        } 


        [AllowAnonymous]
        [HttpGet("{categoryId}")]
        public async Task<ActionResult<CategoryDTO>> GetOne(string categoryId) {
        var category = await _context.Categories.FindAsync(categoryId);
           if (category == null)
             return NotFound();
           return category.ToDTO(); 
        }   

    }
}