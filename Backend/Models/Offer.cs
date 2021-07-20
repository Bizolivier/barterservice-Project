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
        public virtual IList <LinkOfferService> AllLinkToService {get;set;} = new List <LinkOfferService>();
        [NotMapped]
        public IEnumerable<Service> ServiceToProvid {
            get => AllLinkToService.Select(sp => sp.ServiceLinked);} 

        [NotMapped]
        public IEnumerable<Service> ServiceNeeded {
            get => AllLinkToService.Select(sp => sp.ServiceLinked);} 

       

       

        public virtual IList<Message> AllCommunications  {get;set;} = new List <Message>();


    }



}
