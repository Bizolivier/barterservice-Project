using Microsoft.EntityFrameworkCore;

namespace backend.Models {
    public class BarterContext : DbContext {
        public BarterContext(DbContextOptions<BarterContext> options)
            : base(options) {
        }

        public DbSet<User> Users { get; set; }
        public  DbSet<Service> Services {get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet <Offer> Offers {get;set;}
        public DbSet <LinkOfferService> LinkOfferService {get;set;}

        // public DbSet<Comment> Comments { get; set; }
        // // public DbSet<Rating> Ratings { get; set; }
      


        protected override void OnModelCreating(ModelBuilder modelBuilder) {
           base.OnModelCreating(modelBuilder);
           structuralConfiguration(modelBuilder);
           addData(modelBuilder);
           addOffers(modelBuilder);
           }
         private void structuralConfiguration(ModelBuilder modelBuilder) {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Nickname)
                .IsUnique();

            modelBuilder.Entity<User>()
                 .HasIndex(u => u.Email)
                 .IsUnique();

            modelBuilder.Entity<LinkOfferService>().HasKey(l => new { l.OfferId, l.ServiceId });

            modelBuilder.Entity<LinkOfferService>()
                .HasOne<Offer>(l => l.OfferLinked)
                .WithMany(m => m.AllLinkToService)
                .HasForeignKey(f => f.OfferId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<LinkOfferService>()
                .HasOne<Service>(f => f.ServiceLinked)
                .WithMany(m => m.AllLinksToOffer)
                .HasForeignKey(f => f.ServiceId)
                .OnDelete(DeleteBehavior.Restrict);
         }













      
        

         private void addData(ModelBuilder modelBuilder) {
            addUsers(modelBuilder);
           
        }
        private void addUsers(ModelBuilder modelBuilder) {
            modelBuilder.Entity<User>().HasData(
                    new User() {  UserId =1, Nickname = "Ben", Password = "ben",Name ="Penelle",Email="ben@gmail.com",  TimeCredit = 5 ,Sexe = Sexe.Male, Role = Role.User,Province=Province.Brabant_flamant },
                    new User() {  UserId =2, Nickname = "Bru", Password = "bruno",Name ="Lacroix",Email="bruno@gmail.com", TimeCredit = 5,  Sexe = Sexe.Male,Role = Role.User,Province=Province.Bruxelles },
                    new User() {  UserId =3, Nickname = "Aela", Password = "aela",Name ="Izere",Email="aela@gmail.com", TimeCredit = 5 ,Sexe = Sexe.Female,Role =  Role.User,Province=Province.Flandre_orientale },
                    new User() {  UserId =4, Nickname = "Luis", Password = "luis",Name ="Lara",Email="luis@gmail.com", TimeCredit = 5 ,Sexe = Sexe.Male,Role =  Role.User,Province=Province.Bruxelles },
                    new User() {  UserId =5, Nickname = "Amin", Password = "amin",Name ="Gandouz",Email="amin@gmail.com", TimeCredit = 5 ,Sexe = Sexe.Male,Role =  Role.User,Province=Province.Bruxelles  },
                    new User() {  UserId =6, Nickname = "Nico", Password = "nico",Name ="Krstev",Email="nico@gmail.com", TimeCredit = 5 ,Sexe = Sexe.Male,Role =  Role.User,Province=Province.Hainaut },
                    new User() {  UserId =7, Nickname = "Momo", Password = "momo",Name ="AssBai",Email="momo@gmail.com", TimeCredit = 5 ,Sexe = Sexe.Male,Role =  Role.User,Province=Province.Bruxelles }
        
   
            );
        }
        private void addOffers(ModelBuilder modelBuilder){
            modelBuilder.Entity<Offer>().HasData(
                new Offer() { OfferId =1,AuthorId =1  },
                new Offer() { OfferId =2,AuthorId =2  },
                new Offer() { OfferId =3,AuthorId =3  },
                new Offer() { OfferId =4,AuthorId =4  },
                new Offer() { OfferId =5,AuthorId =5  },
                new Offer() { OfferId =6,AuthorId =6  },
                new Offer() { OfferId =7,AuthorId =7  }
            );
        }
    }
}    