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
                TimeCredit = user.TimeCredit,
                Picture=user.Picture,
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
                ServicesLinkedToOffer =offer.ServicesLinkedToOffer.ToDTO()
                
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
                ChatId = message.ChatId,
                Date = message.Date,
                SenderId=message.SenderId         
          
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

         public static ChatDTO ToDTO(this Chat chat){
             return new ChatDTO{
                ChatId = chat.ChatId,
                UserId1 = chat.UserId1,
                UserId2 = chat.UserId2,
                MessageLinkedToChat = chat.MessageLinkedToChat.ToDTO()};
        }
         public static List<ChatDTO > ToDTO(this IEnumerable<Chat > chats ) {
            return chats.Select(o => o.ToDTO()).ToList();
        }

          public static CommentDTO ToDTO(this Comment comment){
            return new CommentDTO {
                CmntId = comment.CmntId,
                Description = comment.Description,
                AuthorId = comment.AuthorId,
                Author= comment.Author.ToDTO(),
                ServiceLinkedToId =comment.ServiceLinkedToId,
                Date = comment.Date,
                Rating = comment.Rating,
                Answer =comment.Answer
            };

        }
         public static List<CommentDTO> ToDTO(this IEnumerable<Comment> comments) {
            return comments.Select(o => o.ToDTO()).ToList();
        }

         public static PrestationDTO ToDTO(this Prestation prestation){

            return new PrestationDTO {
                Id  = prestation.Id,
                IdServiceProvided = prestation.IdServiceProvided,
                IdUserClient = prestation.IdUserClient,
                IdUserProvider =prestation.IdUserProvider, 
                Date = prestation.Date,
                Etat = prestation.Etat
               
            };

        }
         public static List<PrestationDTO> ToDTO(this IEnumerable<Prestation> prestations) {
            return prestations.Select(p => p.ToDTO()).ToList();
        }

        
    }
}