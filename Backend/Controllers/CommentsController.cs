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

            [HttpPost("addComment")]        
            public async Task<ActionResult<CommentDTO>> PostComment(CommentDTO data) {
              var service = await _context.Services.FindAsync(data.ServiceLinkedToId);
                 if (service == null)
                 return NotFound(); 
      

              var newComment = new Comment(){
                Description= data.Description,
                AuthorId= data.AuthorId,
                ServiceLinkedToId= data.ServiceLinkedToId,
                ReceiverId=data.ReceiverId,
                Date=data.Date,
                Rating= data.Rating
              };

          Console.WriteLine(newComment.Description);
          Console.WriteLine(newComment.Date);
          Console.WriteLine(newComment.ServiceLinkedToId);
          Console.WriteLine(newComment.ReceiverId);
          Console.WriteLine(newComment.AuthorId);
          Console.WriteLine(newComment.Rating);

           _context.Comments.Add(newComment);
        await _context.SaveChangesAsyncWithValidation();
        
          service.CommentLinkedToService.Add(newComment);
          
           var res = await _context.SaveChangesAsyncWithValidation();
             if (!res.IsEmpty) 
             return BadRequest(res);

           return NoContent();
        }



        }
}    