using Microsoft.EntityFrameworkCore;

namespace backend.Models {
    public class BarterContext : DbContext {
        public BarterContext(DbContextOptions<BarterContext> options)
            : base(options) {
        }

        public DbSet<User> Users { get; set; }

         
        // public DbSet<Message> Messages { get; set; }
        // public DbSet<Comment> Comments { get; set; }
        // // public DbSet<Rating> Ratings { get; set; }
        // public  DbSet<Service> Services {get; set; }
        // public DbSet<Category> Categories { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder) {
           base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<User>().HasData(
        new User() { Nickname = "ben", Password = "ben",Name ="Penelle",Email="ben@gmail.com",  TimeCredit = 5 ,Sexe = Sexe.Male, Role = Role.User },
        new User() {  Nickname = "bru", Password = "bruno",Name ="Lacroix",Email="bruno@gmail.com", TimeCredit = 5,  Sexe = Sexe.Male,Role = Role.User },
        new User() {  Nickname = "aela", Password = "aela",Name ="Izere",Email="aela@gmail.com", TimeCredit = 5 ,Sexe = Sexe.Female,Role =  Role.User }
   
    );
        }
    }
}    