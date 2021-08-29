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
    public class UsersController : ControllerBase {
        private readonly BarterContext _context;

        public UsersController(BarterContext context) {
            _context = context;
        }



        [HttpGet]
    
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetAll() {
             return (await _context.Users.ToListAsync()).ToDTO();
        }


        [HttpGet("usersToChat/{email}")]
    
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetAllusersToChat(string email) {
          return (await _context.Users.Where(u=>u.Email!= email).ToListAsync()).ToDTO();
        }




         [HttpPut("connect")]
        public async Task<ActionResult<UserDTO>> connect(UserDTO user)
        {
            
            var user2 = await _context.Users.SingleOrDefaultAsync(u => u.Email == user.Email);

              if(user2 != null)
                   return  user2.ToDTO();
              else{
                var userToConnect =  new User() {
                Nickname = user.Nickname,
                Fullname = user.Fullname,
                Email = user.Email,
                TimeCredit = 5,
                Picture=user.Picture
               };

               _context.Users.Add(userToConnect);
                await _context.SaveChangesAsyncWithValidation();


                user2 = await _context.Users.SingleOrDefaultAsync(u => u.Email == user.Email);
                var offer = new Offer(){AuthorId = user2.UserId};


               _context.Offers.Add(offer);
               await _context.SaveChangesAsyncWithValidation();
               
                 return user2.ToDTO();
            }


        }




          [HttpGet("{userId}")]
          public async Task<ActionResult<UserDTO>> GetOne(int userId) {
              var user = await _context.Users.FindAsync(userId);
           if (user == null)
             return NotFound();
           return user.ToDTO();
        }
        

         [HttpGet("GetOneByEmail/{email}")]
        public async Task<ActionResult<UserDTO>> GetOneByEmail(string email) {
        var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
           if (user == null)
             return NotFound();
           return user.ToDTO();
        }


         [HttpPost]        
         public async Task<ActionResult<UserDTO>> PostUser(UserDTO data) {
              var user = await _context.Users.FindAsync(data.Nickname);
             if (user != null) {
              var err = new ValidationErrors().Add("Nickname already in use", nameof(user.Nickname));
           return BadRequest(err);
        }
            var newUser = new User() {
            Nickname= data.Nickname,
            Fullname = data.Fullname,
            Email = data.Email,
            TimeCredit = data.TimeCredit,
            Sexe = data.Sexe,
            Role = data.Role
           };

           _context.Users.Add(newUser);
           var res = await _context.SaveChangesAsyncWithValidation();
             if (!res.IsEmpty) 
             return BadRequest(res);

           return CreatedAtAction(nameof(GetOne), new { nickname = newUser.Nickname }, newUser.ToDTO());
        }


         [HttpPut("PutUser/{email}")]
         public async Task<IActionResult> PutUser(string email , UserDTO userDTO) {
           if (email != userDTO.Email)
              return BadRequest();

            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);

           if (user == null)
              return NotFound();

         user.Nickname = userDTO.Nickname;
         user .Fullname = userDTO.Fullname;
         user .Province = userDTO.Province;
         user .Sexe = userDTO.Sexe;
         

         var res = await _context.SaveChangesAsyncWithValidation();
           if (!res.IsEmpty)
           return BadRequest(res);

         return NoContent();
}





    }
}