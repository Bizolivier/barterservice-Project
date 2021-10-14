using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;
using BARTER_Framework;
using backend.AuthorizeFile;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Text;
using System.Security.Claims;

namespace backend.Controllers {
    [Authorize]
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

      [Authorized(Role.Admin)]
      [HttpGet("getUsersWithRoleUser")]
    
        public async Task<ActionResult<IEnumerable<UserDTO>>> getUsersWithRoleUser() {
          return (await _context.Users.Where(u=>u.Role== 0).ToListAsync()).ToDTO();
        }


       
        [HttpGet("usersToChat/{email}")]
    
        public async Task<ActionResult<IEnumerable<UserDTO>>> GetAllusersToChat(string email) {
          return (await _context.Users.Where(u=>u.Email!= email).ToListAsync()).ToDTO();
        }



        [AllowAnonymous]
        private async Task<UserDTO> Authenticate(UserDTO user) {
          var visitor = await _context.Users.SingleOrDefaultAsync(u => u.Email == user.Email);

              // return null if member not found
              if (visitor  == null){
                 return null;
              }else {
              // authentication successful so generate jwt token
               var tokenHandler = new JwtSecurityTokenHandler();
               var key = Encoding.ASCII.GetBytes("my-super-secret-key");
               var tokenDescriptor = new SecurityTokenDescriptor {
                     Subject = new ClaimsIdentity(new Claim[]{
                              new Claim(ClaimTypes.Name, visitor.Nickname),
                              new Claim(ClaimTypes.Role, visitor.Role.ToString())
                    }),
                          IssuedAt = DateTime.UtcNow,
                          Expires = DateTime.UtcNow.AddMinutes(10),
                       SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                     };
                     var token = tokenHandler.CreateToken(tokenDescriptor);
                   visitor.Token = tokenHandler.WriteToken(token);
                     }


                   return visitor.ToDTO();
        }



         [AllowAnonymous]
         [HttpPut("connect")]
        public async Task<ActionResult<UserDTO>> connect(UserDTO user)
        {
            
            var user2 = await _context.Users.SingleOrDefaultAsync(u => u.Email == user.Email);

              if(user2 != null){
                    
                  return await Authenticate(user2.ToDTO());

              }else{
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



          [AllowAnonymous]
          [HttpGet("GetOne/{userId}")]
          public async Task<ActionResult<UserDTO>> GetOne(int userId) {
              var user = await _context.Users.FindAsync(userId);
           if (user == null)
             return NotFound();
           return user.ToDTO();
        }
        
          [AllowAnonymous] 
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
         user.Role = userDTO.Role;
         

         var res = await _context.SaveChangesAsyncWithValidation();
           if (!res.IsEmpty)
           return BadRequest(res);

         return NoContent();
        }


        
         [HttpDelete("deleteUser/{userId}")]
        public async Task<IActionResult> deleteUser(int userId) {
          var user = await _context.Users.FindAsync(userId);
           if (user == null)
              return NotFound(); 

          // var offer = await _context.Offers.FindAsync(user.AuthorId);
          //  if (offer == null)
          //     return NotFound();

          // var serviceList = await _context.Services.Where(s => s.OfferLinkedtoServiceId == offer.OfferId ).ToListAsync() ; 
          // var comntList = await _context.comment.where()

          // var category =await _context.Categories.FindAsync(service.CategoryLinkToId); 
          //  if (category == null)
          //     return NotFound(); 

          // category.CategorysServices.Remove(service);           

          // offer.ServicesLinkedToOffer.Remove(service);

          //  service.CommentLinkedToService.Clear();

          _context.Users.Remove(user);
          
          
                var res = await _context.SaveChangesAsyncWithValidation();
                if (!res.IsEmpty)
                    return BadRequest(res);

                return NoContent();    
            }

      }





    
}