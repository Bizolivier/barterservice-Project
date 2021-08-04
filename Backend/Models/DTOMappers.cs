using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Models {
    public static class DTOMappers {
        public static UserDTO ToDTO(this User user) {
            return new UserDTO {
                UserId =user.UserId,
                Nickname = user.Nickname,
                Fullname = user.Fullname,
                Email = user.Email,
                // we don't put the password in the DTO for security reasons
                 TimeCredit = user.TimeCredit,
                Sexe = user.Sexe,
                Role = user.Role,
                Province = user.Province
 
            
            };
        }

        public static List<UserDTO> ToDTO(this IEnumerable<User> users) {
            return users.Select(u => u.ToDTO()).ToList();
        } 
         


        public static OfferDTO ToDTO(this Offer offer){
            return new OfferDTO {
                OfferId = offer.OfferId,
                AuthorId= offer.AuthorId,
                ServicesLinkedToOffer =offer.ServicesLinkedToOffer.ToDTO(),
                AllCommunications = offer.AllCommunications.ToDTO()
                

            };

        }
         public static List<OfferDTO> ToDTO(this IEnumerable<Offer> offers) {
            return offers.Select(o => o.ToDTO()).ToList();
        }





        public static ServiceDTO ToDTO(this Service service){
            return new ServiceDTO {
                ServiceId = service.ServiceId,
                Title = service.Title,
                CategoryLinkToId = service.CategoryLinkToId 
          
            };

        }
         public static List<ServiceDTO> ToDTO(this IEnumerable<Service> services) {
            return services.Select(o => o.ToDTO()).ToList();
        }



        public static MessageDTO ToDTO(this Message message){
            return new MessageDTO  {
                MsgId = message.MsgId,
                Content = message.Content,
                SenderId = message.SenderId,
                OfferLinkedToId = message.OfferLinkedToId,
                Date = message.Date
            
          
            };

        }
         public static List<MessageDTO > ToDTO(this IEnumerable<Message > messages ) {
            return messages.Select(o => o.ToDTO()).ToList();
        }

        public static CategoryDTO ToDTO (this Category category){
            return new CategoryDTO{
                CategoryId = category.CategoryId,
                Name = category.Name
            };
        }
         public static List<CategoryDTO > ToDTO(this IEnumerable<Category > categories ) {
            return categories.Select(c => c.ToDTO()).ToList();
        }

        
    }
}