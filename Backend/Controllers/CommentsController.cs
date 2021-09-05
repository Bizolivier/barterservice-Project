using System;
using System.Linq;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using BARTER_Framework;

namespace backend.Controllers {

        [Route("api/[controller]")]
        [ApiController]
        public class CommentsController : ControllerBase {
             private readonly BarterContext _context;

             public CommentsController(BarterContext context) {
                 _context = context;
            }

             [HttpGet]
             public async Task<ActionResult<IEnumerable<CommentDTO>>> GetAll() {
                 return (await _context.Comments.ToListAsync()).ToDTO();
            }

             [HttpGet("GetCommentsByServiceId/{serviceId}")]
             public async Task<ActionResult<IEnumerable<CommentDTO>>> GetCommentsByServiceId(int serviceId) {
                   var comments = (await _context.Comments.Where(c=>(c.ServiceLinkedToId == serviceId)).ToListAsync()).ToDTO();
                   if (comments == null)
                     return NotFound();
                   return comments; 
           }


        }
}    