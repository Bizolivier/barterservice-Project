using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;

namespace backend.Models {

    public class Offer {
      
       [Key,
        DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OfferId { get; set; }
        
        [Required]
        public  virtual User Author {get;set;}
        [Required]
        public int AuthorId {get;set;}
        [NotMapped]
        public virtual IList<Service> ServiceToProvid  {get;set;} = new List <Service>();
         public virtual IList<Service> ServiceNeeded  {get;set;} = new List <Service>();

        public virtual IList<Message> AllCommunications  {get;set;} = new List <Message>();


    }



}
