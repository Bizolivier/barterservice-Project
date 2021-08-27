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
     

        // public DbSet<Comment> Comments { get; set; }
        // // public DbSet<Rating> Ratings { get; set; }
      


        protected override void OnModelCreating(ModelBuilder modelBuilder) {
           base.OnModelCreating(modelBuilder);
           structuralConfiguration(modelBuilder);
           addData(modelBuilder);
           addOffers(modelBuilder);
           addCategories(modelBuilder);
           addServices(modelBuilder);
           }
         private void structuralConfiguration(ModelBuilder modelBuilder) {
            
            modelBuilder.Entity<User>()
                 .HasIndex(u => u.Email)
                 .IsUnique();

            modelBuilder.Entity<Chat>(entity =>{
                     entity.HasOne(chat => chat.user1)
                           .WithMany(user => user.ChatLinkedToUser1)
                           .HasForeignKey(chat => chat.UserId1);

                    entity.HasOne(chat => chat.user2)
                           .WithMany(user => user.ChatLinkedToUser2)
                           .HasForeignKey(chat => chat.UserId2);
            });

            modelBuilder.Entity<User>(entity =>{
                     entity.HasMany(user => user.ChatLinkedToUser1)
                           .WithOne(chat => chat.user1)
                           .HasForeignKey(chat => chat.UserId1);

                     entity.HasMany(user => user.ChatLinkedToUser2)
                           .WithOne(chat => chat.user2)
                           .HasForeignKey(chat => chat.UserId2);
            });
            
            
         }


         private void addData(ModelBuilder modelBuilder) {
            addUsers(modelBuilder);
           
        }
        private void addUsers(ModelBuilder modelBuilder) {
            modelBuilder.Entity<User>().HasData(
                    new User() {  UserId =1, Nickname = "Ben", Fullname ="Penelle",Email="ben@gmail.com", Picture="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4bxhnd6kVOSazM4XZWjZ1cdgjx25wewGa6PMJDzLGyS3vV_gKb1cEFXGv0ev5oa6kTpU&usqp=CAU", TimeCredit = 5 ,Sexe = Sexe.Male, Role = Role.User,Province=Province.Brabant_flamant },
                    new User() {  UserId =2, Nickname = "Bru",Fullname ="Lacroix",Email="bruno@gmail.com", Picture="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4bxhnd6kVOSazM4XZWjZ1cdgjx25wewGa6PMJDzLGyS3vV_gKb1cEFXGv0ev5oa6kTpU&usqp=CAU", TimeCredit = 5,  Sexe = Sexe.Male,Role = Role.User,Province=Province.Bruxelles },
                    new User() {  UserId =3, Nickname = "Aela",Fullname ="Izere",Email="aela@gmail.com", Picture="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4bxhnd6kVOSazM4XZWjZ1cdgjx25wewGa6PMJDzLGyS3vV_gKb1cEFXGv0ev5oa6kTpU&usqp=CAU", TimeCredit = 5 ,Sexe = Sexe.Female,Role =  Role.User,Province=Province.Flandre_orientale },
                    new User() {  UserId =4, Nickname = "Luis",Fullname ="Save Lara",Email="luis@gmail.com", Picture="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4bxhnd6kVOSazM4XZWjZ1cdgjx25wewGa6PMJDzLGyS3vV_gKb1cEFXGv0ev5oa6kTpU&usqp=CAU", TimeCredit = 5 ,Sexe = Sexe.Male,Role =  Role.User,Province=Province.Bruxelles },
                    new User() {  UserId =5, Nickname = "Amin",Fullname ="Gandouz",Email="amin@gmail.com", Picture="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4bxhnd6kVOSazM4XZWjZ1cdgjx25wewGa6PMJDzLGyS3vV_gKb1cEFXGv0ev5oa6kTpU&usqp=CAU", TimeCredit = 5 ,Sexe = Sexe.Male,Role =  Role.User,Province=Province.Bruxelles  },
                    new User() {  UserId =6, Nickname = "Nico",Fullname ="Krstev",Email="nico@gmail.com", Picture="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4bxhnd6kVOSazM4XZWjZ1cdgjx25wewGa6PMJDzLGyS3vV_gKb1cEFXGv0ev5oa6kTpU&usqp=CAU", TimeCredit = 5 ,Sexe = Sexe.Male,Role =  Role.User,Province=Province.Hainaut },
                    new User() {  UserId =7, Nickname = "Momo",Fullname ="Mohammed Assbai",Email="momo@gmail.com", Picture="../images/unknown.jpg", TimeCredit = 5 ,Sexe = Sexe.Male,Role =  Role.User,Province=Province.Bruxelles },
                    new User() {  UserId =8, Nickname = "L'Olive",Fullname ="Olivier Bizimungu",Email="bizidudu@gmail.com", Picture="../images/unknown.jpg", TimeCredit = 50 ,Sexe = Sexe.Male,Role = Role.User,Province=Province.Flandre_orientale },
                    new User() {  UserId =9, Nickname = "Timon",Fullname ="Alain Silovy",Email="alain@gmail.com", Picture="../images/unknown.jpg", TimeCredit = 5 , Sexe = Sexe.Male, Role =  Role.User, Province=Province.Bruxelles }
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
    }


    
}    