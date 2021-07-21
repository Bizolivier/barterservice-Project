using System;
using System.Collections.Generic;
using backend.Models;

namespace backend.Models {
      public class OfferDTO {
      public int OfferId {get;set;}
      public IList <ServiceDTO> ServicesLinkedToOffer { get; set; }  
      public IList<MessageDTO> AllCommunications { get; set; } 
    }
}