using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Models {
    public static class DTOMappers {
        public static UserDTO ToDTO(this User user) {
            return new UserDTO {
                Nickname = user.Nickname,
                Name = user.Name,
                Email = user.Email,
                // we don't put the password in the DTO for security reasons
                 TimeCredit = user.TimeCredit,
                Sexe = user.Sexe,
                Role = user.Role
            
            };
        }

        public static List<UserDTO> ToDTO(this IEnumerable<User> users) {
            return users.Select(u => u.ToDTO()).ToList();
        }
    }
}