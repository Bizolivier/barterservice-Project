using Microsoft.EntityFrameworkCore;
using System;

namespace backend.Models {
    public class BarterContext : DbContext {
        public BarterContext(DbContextOptions<BarterContext> options)
            : base(options) {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Service> Services {get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet <Offer> Offers {get;set;}
        public DbSet <Chat> Chats {get;set;}
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Prestation> Prestations {get;set;}
        
      


        protected override void OnModelCreating(ModelBuilder modelBuilder) {
           base.OnModelCreating(modelBuilder);
           structuralConfiguration(modelBuilder);
           addData(modelBuilder);
           addOffers(modelBuilder);
           addCategories(modelBuilder);
           addServices(modelBuilder);
           addChats(modelBuilder);
           addMessages(modelBuilder);
           addComments(modelBuilder);
           addPrestations(modelBuilder);
           
           }
         private void structuralConfiguration(ModelBuilder modelBuilder) {
            
            modelBuilder.Entity<User>()
                 .HasIndex(u => u.Email)
                 .IsUnique();

            modelBuilder.Entity<Chat>(entity =>{
                     entity.HasOne(chat => chat.User1)
                           .WithMany(user => user.ChatLinkedToUser1)
                           .HasForeignKey(chat => chat.UserId1);

                    entity.HasOne(chat => chat.User2)
                           .WithMany(user => user.ChatLinkedToUser2)
                           .HasForeignKey(chat => chat.UserId2);
            });

            modelBuilder.Entity<User>(entity =>{
                     entity.HasMany(user => user.ChatLinkedToUser1)
                           .WithOne(chat => chat.User1)
                           .HasForeignKey(chat => chat.UserId1);

                     entity.HasMany(user => user.ChatLinkedToUser2)
                           .WithOne(chat => chat.User2)
                           .HasForeignKey(chat => chat.UserId2);
            });
            modelBuilder.Entity<Comment>(entity =>{
                     entity.HasOne(comment => comment.Author)
                           .WithMany(user => user.CommentsOwned)
                           .HasForeignKey(comment => comment.AuthorId);

                    entity.HasOne(comment => comment.Receiver)
                           .WithMany(user => user.CommentReceived)
                           .HasForeignKey(comment =>comment.ReceiverId);
            });
             modelBuilder.Entity<User>(entity =>{
                     entity.HasMany(user =>  user.CommentsOwned)
                           .WithOne(comment => comment.Author)
                           .HasForeignKey(comment => comment.AuthorId);

                     entity.HasMany(user => user.CommentReceived)
                           .WithOne(comment => comment.Receiver)
                           .HasForeignKey(comment =>comment.ReceiverId );
            });
            
            
         }


         private void addData(ModelBuilder modelBuilder) {
            addUsers(modelBuilder);
           
        }
        private void addUsers(ModelBuilder modelBuilder) {
            modelBuilder.Entity<User>().HasData(
                    new User() {  UserId =1, Nickname = "Ben", Fullname ="Penelle",Email="ben@gmail.com", Picture="mufassa.jpg", TimeCredit = 5 ,Sexe = Sexe.Male, Role = Role.User,Province=Province.Brabant_flamant },
                    new User() {  UserId =2, Nickname = "Bru",Fullname ="Lacroix",Email="bruno@gmail.com", Picture="pumba.jpg", TimeCredit = 5,  Sexe = Sexe.Male,Role = Role.User,Province=Province.Bruxelles },
                    new User() {  UserId =3, Nickname = "Aela",Fullname ="Izere",Email="aela@gmail.com", Picture="nala.jpg", TimeCredit = 5 ,Sexe = Sexe.Female,Role =  Role.User,Province=Province.Flandre_orientale },
                    new User() {  UserId =4, Nickname = "Luis",Fullname ="Save Lara",Email="luis@gmail.com", Picture="scar.jpg", TimeCredit = 5 ,Sexe = Sexe.Male,Role =  Role.User,Province=Province.Bruxelles },
                    new User() {  UserId =5, Nickname = "Amin",Fullname ="Gandouz",Email="amin@gmail.com", Picture="simba.jpg", TimeCredit = 5 ,Sexe = Sexe.Male,Role =  Role.User,Province=Province.Bruxelles  },
                    new User() {  UserId =6, Nickname = "Nico",Fullname ="Krstev",Email="nico@gmail.com", Picture="rafiki.jpg", TimeCredit = 5 ,Sexe = Sexe.Male,Role =  Role.User,Province=Province.Hainaut },
                    new User() {  UserId =7, Nickname = "Momo",Fullname ="Mohammed Assbai",Email="momo@gmail.com", Picture="zazu.jpg", TimeCredit = 5 ,Sexe = Sexe.Male,Role =  Role.User,Province=Province.Bruxelles },
                    new User() {  UserId =8, Nickname = "L'Olive",Fullname ="Olivier Bizimungu",Email="bizidu@gmail.com", Picture="vautour.jpg", TimeCredit = 50 ,Sexe = Sexe.Male,Role = Role.User,Province=Province.Flandre_orientale },
                    new User() {  UserId =9, Nickname = "Ombeline",Fullname ="Bizi Ombi",Email="Ombi@gmail.com", Picture="timon.png", TimeCredit = 5 , Sexe = Sexe.Male, Role =  Role.User, Province=Province.Bruxelles }
            );
        }
        private void addOffers(ModelBuilder modelBuilder){
            modelBuilder.Entity<Offer>().HasData(
                new Offer() { OfferId =1,AuthorId =1 },
                new Offer() { OfferId =2,AuthorId =2 },
                new Offer() { OfferId =3,AuthorId =3 },
                new Offer() { OfferId =4,AuthorId =4  },
                new Offer() { OfferId =5,AuthorId =5  },
                new Offer() { OfferId =6,AuthorId =6  },
                new Offer() { OfferId =7,AuthorId =7  },
                new Offer() { OfferId =8,AuthorId =8  },
                new Offer() { OfferId =9,AuthorId =9  }

            );
        }

         private void addCategories(ModelBuilder modelBuilder){
            modelBuilder.Entity<Category>().HasData(
                new Category() { CategoryId =1,Name ="Aide à la personne" },
                new Category() { CategoryId =2,Name ="Beauté bien être" },
                new Category() { CategoryId =3,Name ="Bricolage"  },
                new Category() { CategoryId =4,Name ="Cours"  },
                new Category() { CategoryId =5,Name ="Loisirs"  },
                new Category() { CategoryId =6,Name ="Maison" },
                new Category() { CategoryId =7,Name ="Mode" },
                new Category() { CategoryId =8,Name ="Travail"  },
                new Category() { CategoryId =9,Name ="Vacances" },
                new Category() { CategoryId =10,Name ="Vehicule"  }
            );
        }
        
         private void addServices(ModelBuilder modelBuilder){
            modelBuilder.Entity<Service>().HasData(
                new Service() { ServiceId =1, Title ="Massage", CategoryLinkToId=2, OfferLinkedtoServiceId = 8, IsRecherche = true },
                new Service() { ServiceId =2, Title ="Electricité", CategoryLinkToId=3, OfferLinkedtoServiceId =8 ,IsRecherche = true },
                new Service() { ServiceId =3, Title ="Entretien", CategoryLinkToId=10, OfferLinkedtoServiceId = 8,IsRecherche = true },
                new Service() { ServiceId =4, Title ="cours dotnet", CategoryLinkToId=4, OfferLinkedtoServiceId = 8,IsRecherche = true },
                new Service() { ServiceId =5, Title ="Jardinage", CategoryLinkToId=6, OfferLinkedtoServiceId = 8,IsRecherche = false },
                new Service() { ServiceId =6, Title ="Co Voiturage", CategoryLinkToId=10, OfferLinkedtoServiceId =8 ,IsRecherche = false },
                new Service() { ServiceId =7, Title ="Hébergement", CategoryLinkToId=9, OfferLinkedtoServiceId = 8,IsRecherche = false },

                new Service() { ServiceId =8, Title ="archivage", CategoryLinkToId=8, OfferLinkedtoServiceId = 1, IsRecherche = false },
                new Service() { ServiceId =9, Title ="camping", CategoryLinkToId=9, OfferLinkedtoServiceId =1 ,IsRecherche = true },

                new Service() { ServiceId =10, Title ="maçonerie", CategoryLinkToId=3, OfferLinkedtoServiceId = 2, IsRecherche = false },
                new Service() { ServiceId =11, Title ="Repassage", CategoryLinkToId=1, OfferLinkedtoServiceId =2 ,IsRecherche = true },
                new Service() { ServiceId =12, Title ="traduction", CategoryLinkToId=8, OfferLinkedtoServiceId = 2, IsRecherche = false },

                new Service() { ServiceId =13, Title ="colocation", CategoryLinkToId=6, OfferLinkedtoServiceId = 3, IsRecherche = false },
                new Service() { ServiceId =14, Title ="Decoration", CategoryLinkToId=6, OfferLinkedtoServiceId =3 ,IsRecherche = true },
                new Service() { ServiceId =15, Title ="gardiennage", CategoryLinkToId=6, OfferLinkedtoServiceId = 3, IsRecherche = false },

                new Service() { ServiceId =16, Title ="plomberie", CategoryLinkToId=3, OfferLinkedtoServiceId = 4, IsRecherche = false },
                new Service() { ServiceId =17, Title ="tapisserie", CategoryLinkToId=3, OfferLinkedtoServiceId =4 ,IsRecherche = true },
                new Service() { ServiceId =18, Title ="outillage", CategoryLinkToId=3, OfferLinkedtoServiceId = 4, IsRecherche = false },

                new Service() { ServiceId =19, Title ="promenade animaux", CategoryLinkToId=1, OfferLinkedtoServiceId = 5, IsRecherche = false },
                new Service() { ServiceId =20, Title ="ménage", CategoryLinkToId=1, OfferLinkedtoServiceId =5 ,IsRecherche = true },
                new Service() { ServiceId =21, Title ="lecture", CategoryLinkToId=1, OfferLinkedtoServiceId = 5, IsRecherche = false },

                new Service() { ServiceId =22, Title ="maçonerie", CategoryLinkToId=3, OfferLinkedtoServiceId = 6, IsRecherche = false },
                new Service() { ServiceId =23, Title ="Repassage", CategoryLinkToId=1, OfferLinkedtoServiceId =6,IsRecherche = true },
                new Service() { ServiceId =24, Title ="traduction", CategoryLinkToId=8, OfferLinkedtoServiceId = 6, IsRecherche = false },

                new Service() { ServiceId =25, Title ="colocation", CategoryLinkToId=6, OfferLinkedtoServiceId = 7, IsRecherche = false },
                new Service() { ServiceId =26, Title ="Decoration", CategoryLinkToId=6, OfferLinkedtoServiceId =7,IsRecherche = true },
                new Service() { ServiceId =27, Title ="gardiennage", CategoryLinkToId=6, OfferLinkedtoServiceId = 7, IsRecherche = false },

                new Service() { ServiceId =28, Title ="plomberie", CategoryLinkToId=3, OfferLinkedtoServiceId = 8, IsRecherche = false },
                new Service() { ServiceId =29, Title ="tapisserie", CategoryLinkToId=3, OfferLinkedtoServiceId =8 ,IsRecherche = true },
                new Service() { ServiceId =30, Title ="outillage", CategoryLinkToId=3, OfferLinkedtoServiceId = 8, IsRecherche = false },

                new Service() { ServiceId =31, Title ="promenade animaux", CategoryLinkToId=1, OfferLinkedtoServiceId = 1, IsRecherche = false },
                new Service() { ServiceId =32, Title ="ménage", CategoryLinkToId=1, OfferLinkedtoServiceId =3 ,IsRecherche = true },
                new Service() { ServiceId =33, Title ="lecture", CategoryLinkToId=1, OfferLinkedtoServiceId = 4, IsRecherche = false },

                new Service() { ServiceId =34, Title ="Jardinage", CategoryLinkToId=6, OfferLinkedtoServiceId = 9,IsRecherche = false },
                new Service() { ServiceId =35, Title ="Co Voiturage", CategoryLinkToId=10, OfferLinkedtoServiceId =9 ,IsRecherche = false },
                new Service() { ServiceId =36, Title ="Electricité", CategoryLinkToId=3, OfferLinkedtoServiceId =9 ,IsRecherche = true },
                new Service() { ServiceId =37, Title ="Entretien", CategoryLinkToId=10, OfferLinkedtoServiceId = 9,IsRecherche = true }
             
            );
        } 


 
         private void addMessages(ModelBuilder modelBuilder){
            modelBuilder.Entity<Message>().HasData(
               new Message() { MsgId =1, Content ="salut Mo ", SenderId =8, ChatId=1},
               new Message() { MsgId =2, Content ="Alors l'Olive çà? ", SenderId = 7 ,ChatId=1}
             
            );
        }


         private void addChats(ModelBuilder modelBuilder){
            modelBuilder.Entity<Chat>().HasData(
                new Chat(){ ChatId =1, UserId1 =7, UserId2 =8}
            );
        }

        private void addComments(ModelBuilder modelBuilder){
           modelBuilder.Entity<Comment>().HasData(
               new Comment (){ CmntId = 1, Description="Très satisfait du service rendu,je recommande", AuthorId = 7, ServiceLinkedToId= 3,ReceiverId = 8,Rating=4  },
               new Comment (){ CmntId = 2, Description="Prestation excellente ,vraiment au dessus de nos attentes.Je recommande à 100%", AuthorId = 7,ServiceLinkedToId= 3 , ReceiverId = 8,Rating=5  },

               new Comment (){ CmntId = 3, Description="Médiocre", AuthorId = 3, ServiceLinkedToId= 1,ReceiverId = 8,Rating=1  },
               new Comment (){ CmntId = 4, Description="peu recommandable", AuthorId = 2,ServiceLinkedToId= 1 , ReceiverId = 8,Rating=1  },

               new Comment (){ CmntId = 5, Description="Reussit", AuthorId = 4, ServiceLinkedToId= 2,ReceiverId = 8,Rating=3  },
               new Comment (){ CmntId = 6, Description="peu mieux faire", AuthorId = 4,ServiceLinkedToId= 4 , ReceiverId = 8,Rating=3  },

               new Comment (){ CmntId = 7, Description="Recomandable", AuthorId = 5, ServiceLinkedToId= 5,ReceiverId = 8,Rating=4  },
               new Comment (){ CmntId = 8, Description="Prestation excellente ", AuthorId = 6,ServiceLinkedToId= 6 , ReceiverId = 8,Rating=5  },

               new Comment (){ CmntId = 9, Description="je recommande", AuthorId = 7, ServiceLinkedToId= 7,ReceiverId = 8,Rating=4  },
               new Comment (){ CmntId = 10, Description="vraiment au dessus de nos attentes", AuthorId = 9,ServiceLinkedToId= 8 , ReceiverId = 1,Rating=5  },

               new Comment (){ CmntId = 11, Description="Très satisfait", AuthorId = 9, ServiceLinkedToId= 9,ReceiverId = 1,Rating=5  },
               new Comment (){ CmntId = 12, Description="Je recommande à 100%", AuthorId = 1,ServiceLinkedToId= 10 , ReceiverId = 2,Rating=5  },

               new Comment (){ CmntId = 13, Description="service rendu excellent", AuthorId = 3, ServiceLinkedToId= 11,ReceiverId = 2,Rating=4  },
               new Comment (){ CmntId = 14, Description="Prestation à recommande à 100%", AuthorId = 4,ServiceLinkedToId= 12 , ReceiverId = 2,Rating=5  },

                new Comment (){ CmntId = 15, Description="Très bien fait", AuthorId = 5, ServiceLinkedToId= 13,ReceiverId = 3,Rating=4  },
               new Comment (){ CmntId = 16, Description=" Nos attente non pas étaient déçues", AuthorId = 6,ServiceLinkedToId= 14 , ReceiverId = 3,Rating=5  },

               new Comment (){ CmntId = 17, Description="A recommande", AuthorId = 7, ServiceLinkedToId= 15,ReceiverId = 3,Rating=4  },




               new Comment (){ CmntId = 18, Description="Prestation moyenne", AuthorId = 8,ServiceLinkedToId= 16 , ReceiverId = 4,Rating=3  },

               new Comment (){ CmntId = 19, Description="Très mitigé", AuthorId = 9, ServiceLinkedToId= 17,ReceiverId = 4,Rating=2  },
               new Comment (){ CmntId = 20, Description="Trés amateur hélas!!", AuthorId = 2,ServiceLinkedToId= 18 , ReceiverId = 4,Rating=1  },

               new Comment (){ CmntId = 21, Description="Prester apres 2 rdv ,mais bien executé", AuthorId = 6, ServiceLinkedToId= 19,ReceiverId = 5,Rating=3  },
               new Comment (){ CmntId = 22, Description="probleme de retard à l heure convenue ,mais prestation super", AuthorId = 7,ServiceLinkedToId= 20 , ReceiverId = 5,Rating=4  },

               new Comment (){ CmntId = 23, Description=" Satisfait ", AuthorId = 1, ServiceLinkedToId= 21,ReceiverId = 5,Rating=3  },
               new Comment (){ CmntId = 24, Description="Rien de pas ordinnaire", AuthorId = 8,ServiceLinkedToId= 22 , ReceiverId = 6,Rating=3  },

               new Comment (){ CmntId = 25, Description="Service minimum", AuthorId = 9, ServiceLinkedToId= 23,ReceiverId = 6,Rating=2  },
               new Comment (){ CmntId = 26, Description="Passable", AuthorId = 5,ServiceLinkedToId= 24 , ReceiverId = 6,Rating=3  }
           );
        }



          private void addPrestations(ModelBuilder modelBuilder){
            modelBuilder.Entity<Prestation>().HasData(
               new Prestation() { PrestationId =1, IdServiceProvided  =1, IdUserClient  =7, IdUserProvider=8},
               new Prestation() { PrestationId =2, IdServiceProvided = 10, IdUserClient = 4 ,IdUserProvider=2}
             
            );
        }
    }


    
}    