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
                   var comments = (await _context.Comments.Where(c=>(c.ServiceLinkedToId == serviceId)).ToListAsync());

                    for (int i=0 ; i<comments.Count;i++){
                        comments[i].Author= (await _context.Users.FindAsync(comments[i].AuthorId));
                    }

                   if (comments == null)
                     return NotFound();
                   return comments.ToDTO(); 
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

         [HttpDelete("deleteComment/{commentId}")]
        public async Task<IActionResult> deleteComment(int commentId) {
          var comment = await _context.Comments.FindAsync(commentId);
           if (comment == null)
              return NotFound(); 

       

          var service = await _context.Services.FindAsync(comment.ServiceLinkedToId);
              if (service == null)
              return NotFound();   

              service.CommentLinkedToService.Remove(comment);
             _context.Comments.Remove(comment);
          
          var res = await _context.SaveChangesAsyncWithValidation();
              if (!res.IsEmpty)
               return BadRequest(res);

                return NoContent();    
            }
     
        [HttpPut("addAnswerToComment/{commentId}/{answer}")]
        public async Task<IActionResult> addAnswerToComment(int commentId, string answer)
        {
             
            var comment = await _context.Comments.FindAsync(commentId);

              if (comment == null)
              return NotFound(); 
                
                comment.Answer = answer;
               
            
         var res = await _context.SaveChangesAsyncWithValidation();
           if (!res.IsEmpty)
           return BadRequest(res);

         return NoContent();
        }


      }
}    