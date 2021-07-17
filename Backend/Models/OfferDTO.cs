using System;
using System.Collections.Generic;
using backend.Models;

namespace backend.Models {
    public class OfferDTO {
        public int OfferId {get;set;}
    
      
       public  int  AuthorId {get;set;}
      
       public IEnumerable <ServiceDTO> ServiceToProvid  { get; set; }  
       public IEnumerable <ServiceDTO> ServiceNeeded { get; set; } 
       public IEnumerable<MessageDTO> AllCommunications { get; set; } 
    }
}