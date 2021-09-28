

namespace backend.Models {

    public class UserDTO {
        
        public int UserId {get;set;}
        public string Nickname { get; set; }
        public string Fullname { get; set; }
        public string Email{get;set;}
        public int TimeCredit{get;set;}
        public string Picture{get;set;}
        public Sexe Sexe { get; set; } = Sexe.Female;
        public Role Role { get; set; }
        public Province Province {get;set;}
        public string Token {get;set;}
    }
}