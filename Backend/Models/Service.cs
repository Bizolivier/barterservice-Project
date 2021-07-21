using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;

namespace backend.Models {
    public class Service  {
          [Key,
        DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ServiceId { get; set; }


        [
        Required(ErrorMessage = "Required"),
        MinLength(3, ErrorMessage = "Minimum 3 characters"),
        MaxLength(10, ErrorMessage = "Maximum 10 characters")]
        
        public string Title { get; set; }

        public  virtual Offer OfferLinkedtoService {get;set;}

      
       //Relation one to many category_Service
        

        [Required]
        public virtual Category CategoryLinkTo {get;set;}

         [Required]
        public int CategoryLinkToId {get;set;}




        
    }
}