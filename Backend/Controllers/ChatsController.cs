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
        public class ChatsController : ControllerBase {
             private readonly BarterContext _context;

             public ChatsController(BarterContext context) {
                 _context = context;
            }

             [HttpGet]
             public async Task<ActionResult<IEnumerable<ChatDTO>>> GetAll() {
                 return (await _context.Chats.ToListAsync()).ToDTO();
            }

           [HttpGet("getChatByUsers/{userId1}/{userId2}")]
            public async Task<ActionResult<ChatDTO>> getChatByUsers(int userId1,int userId2) {
                 var chat = (await _context.Chats.SingleOrDefaultAsync(c=>(c.UserId1 == userId1 && c.UserId2 == userId2)||(c.UserId1 == userId2 && c.UserId2 == userId1))).ToDTO();
                 var messages = (await _context.Messages.Where(m=>(m.ChatId==chat.ChatId)).ToListAsync()).ToDTO();
                 chat.MessageLinkedToChat=messages;
                 return chat;
            }

           
        } 
}