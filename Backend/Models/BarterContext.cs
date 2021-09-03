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
                    new User() {  UserId =9, Nickname = "Timon",Fullname ="Alain Silovy",Email="alain@gmail.com", Picture="timon.png", TimeCredit = 5 , Sexe = Sexe.Male, Role =  Role.User, Province=Province.Bruxelles }
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
                new Service() { ServiceId =7, Title ="Hébergement", CategoryLinkToId=9, OfferLinkedtoServiceId = 8,IsRecherche = false }
             
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
               new Comment (){ CmntId = 2, Description="Prestation excellente ,vraiment au dessus de nos attente.Je recommande à 100%", AuthorId = 7,ServiceLinkedToId= 3 , ReceiverId = 8,Rating=5  }
           );
        }
    }


    
}    