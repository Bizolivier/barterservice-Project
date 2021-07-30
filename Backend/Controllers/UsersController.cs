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



        [HttpGet("connect/{email}")]
        public async Task<ActionResult<UserDTO>> connect(string email)
        {
            
             var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
            if(user != null)
                return  user.ToDTO();
            else{
                var userToConnect =  new User() {
                Nickname = "Nickname",
                Fullname = "Fullname",
                Email = email,
                TimeCredit = 5,
               
                };
                 _context.Users.Add(userToConnect);
            
                var res = await _context.SaveChangesAsyncWithValidation();
            
                 return (await _context.Users.SingleOrDefaultAsync(u => u.Email == email)).ToDTO();
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


         [HttpPut("{userId}")]
         public async Task<IActionResult> PutUser(int userId, UserDTO userDTO) {
           if (userId != userDTO.UserId)
              return BadRequest();

            var user = await _context.Users.FindAsync(userId);

           if (user == null)
              return NotFound();

         user.Nickname = userDTO.Nickname;
         user .Fullname = userDTO.Fullname;
         user .Email = userDTO.Email;
         user .Province = userDTO.Province;
         user .Sexe = userDTO.Sexe;
         

         var res = await _context.SaveChangesAsyncWithValidation();
           if (!res.IsEmpty)
           return BadRequest(res);

         return NoContent();
}





    }
}