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


        [Required(ErrorMessage = "Required")]
        public string Title { get; set; }

      
        public  virtual Offer OfferLinkedtoService {get;set;}

        [Required]
        public int OfferLinkedtoServiceId {get;set;}

    
        public virtual Category CategoryLinkTo {get;set;}

         [Required]
        public int CategoryLinkToId {get;set;}
        

        public bool IsRecherche {get;set;}

        public  virtual IList <Comment> CommentLinkedToService {get;set;} = new List<Comment>();
    
    }
}