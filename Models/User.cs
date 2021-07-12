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
        Male = 1, Female = 0
       }
       public enum Role {
         Admin = 1,User =0
       }

  public class User: IValidatableObject {
        //   [Key,
        // DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        // public int Id { get; set; }


        [
          Key,
        Required(ErrorMessage = "Required"),
        MinLength(3, ErrorMessage = "Minimum 3 characters"),
        MaxLength(10, ErrorMessage = "Maximum 10 characters")]
        public string Nickname { get; set; }

          [
        Required(ErrorMessage = "Required"),
        MinLength(3, ErrorMessage = "Minimum 3 characters"),
        MaxLength(10, ErrorMessage = "Maximum 10 characters")]
        public string Name { get; set; }

            [
        Required(ErrorMessage = "Required"),
        MinLength(3, ErrorMessage = "Minimum 3 characters"),
        MaxLength(10, ErrorMessage = "Maximum 10 characters")]
        public string Surname { get; set; }

        public int TimeCredit{get;set;}

        [Required, MinLength(3)]
        public string Password { get; set; }
        
        public Sexe Sexe { get; set; } = Sexe.Female;
        public Role Role {get;set;} = Role.User;
        

        [NotMapped]
        public string Token { get; set; }



     public IEnumerable<ValidationResult> Validate(ValidationContext validationContext) {
            var currContext = validationContext.GetService(typeof(TrocContext)) as TrocContext;
            Debug.Assert(currContext != null);
            if (Password == "abc")
                yield return new ValidationResult("The password may not be equal to 'abc'", new[] { nameof(Password) });
            
    }
  }

        
}