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
             
                 var chatTable = await _context.Chats.SingleOrDefaultAsync(c=>(c.UserId1 == userId1 && c.UserId2 == userId2)||(c.UserId1 == userId2 && c.UserId2 == userId1));
                
                 if(chatTable!=null){
                    var chat = (chatTable).ToDTO();                    
                    var messages = (await _context.Messages.Where(m=>(m.ChatId==chat.ChatId)).ToListAsync()).ToDTO();
                    chat.MessageLinkedToChat=messages;
                    return chat;
          
                 }else{
                    var newChat = new Chat(){
                         UserId1=userId1,
                         UserId2= userId2,
                         MessageLinkedToChat=new List<Message>()
                    }; 
                    _context.Chats.Add(newChat);
                    await _context.SaveChangesAsync();
                    return newChat.ToDTO();
                       
                  }
               
            }

          [HttpPost("addMessage/{userId2}")]        
          public async Task<ActionResult<ChatDTO>> addChat(MessageDTO data,int userId2) {
               var chat = (await _context.Chats.SingleOrDefaultAsync(c=>(c.UserId1 == data.SenderId && c.UserId2 == userId2)||
                                                                        (c.UserId1 == userId2 && c.UserId2 == data.SenderId)));
                Console.WriteLine(data.Content) ;                                                       
              
               if(chat!=null){
                    var newMsg= new Message(){
                       Content=data.Content,
                       Date =data.Date,
                       SenderId=data.SenderId,
                       ChatId=chat.ChatId
                    };
                      _context.Messages.Add(newMsg);  
                    chat.MessageLinkedToChat.Add(newMsg);
                    await _context.SaveChangesAsync();

               }
               await _context.SaveChangesAsync();
               return Ok();
           
        }
     } 
}