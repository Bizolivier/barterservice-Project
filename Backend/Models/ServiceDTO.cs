using System;
using System.Collections.Generic;
using backend.Models;

namespace backend.Models {
    public class ServiceDTO {
        public int ServiceId {get;set;}
       public string Name { get; set; }
      
       public int ProviderId {get;set;}
      
     
       public int OfferLinkToId {get;set;}
       
        public int CategoryLinkToId {get;set;}
       
    }
}