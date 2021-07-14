using System;
using backend.Models;

namespace backend.DTO {
    public class UserDTO {
       public string Nickname { get; set; }
       public string Name { get; set; }
       public string Surname { get; set; }
       public int TimeCredit{get;set;}
       public string Password { get; set; }
       public Sexe Sexe { get; set; } = Sexe.Female;
       public Role Role { get; set; }
    }
}