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
        
        public string Name { get; set; }


        [Required]
        public virtual User Provider {get;set;}

        [Required]
        public int ProviderId {get;set;}



        [Required]
        public virtual Offer OfferLinkedTo {get;set;}

        [Required]

        public int OfferLinkToId {get;set;}

        

        [Required]
        public virtual Category CategoryLinkTo {get;set;}

         [Required]
        public int CategoryLinkToId {get;set;}




        
    }
}