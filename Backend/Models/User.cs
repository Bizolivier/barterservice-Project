using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;

namespace backend.Models {

        public enum Sexe {
         Female = 0, Male = 1, Autre=2
       }
       public enum Role {
         Admin = 1,User =0
       }
       public enum Province{
         Bruxelles = 0 ,Hainaut = 1 ,Namur = 2 ,Brabant_flamant = 3,Brabant_wallon = 4,Limbourg = 5,Luxembourg = 6 ,Anvers = 7,Flandre_orientale = 8,Flandre_occidentale = 9


       }

  public class User: IValidatableObject {
        [Key,
         DatabaseGenerated(DatabaseGeneratedOption.Identity)]
         public int UserId { get; set; }

        [
        Required(ErrorMessage = "Required"),
        MinLength(3, ErrorMessage = "Minimum 3 characters"),
        MaxLength(30, ErrorMessage = "Maximum 30 characters")]
        public string Nickname { get; set; }


        [
        Required(ErrorMessage = "Required"),
        MinLength(3, ErrorMessage = "Minimum 3 characters"),
        MaxLength(30, ErrorMessage = "Maximum 30 characters")]
        public string Fullname { get; set; }

       

        [Required(ErrorMessage ="Required")]
        public string Email{get;set;}

        public int TimeCredit{get;set;}

        public virtual Offer OwnerOffer {get; set;}

        public Province Province {get;set;} = Province.Bruxelles;
        
        public Sexe Sexe { get; set; } = Sexe.Female;

        public Role Role {get;set;} = Role.User;
        




     public IEnumerable<ValidationResult> Validate(ValidationContext validationContext) {
            var currContext = validationContext.GetService(typeof(BarterContext)) as BarterContext;
            Debug.Assert(currContext != null);
            if (Fullname== "abc")
                yield return new ValidationResult("The fullname may not be equal to 'abc'", new[] { nameof(Fullname) });
            
    }
  }

        
}
