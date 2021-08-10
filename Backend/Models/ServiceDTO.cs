using System;
using System.Collections.Generic;
using backend.Models;

namespace backend.Models {
    public class ServiceDTO {
        
       public int ServiceId { get;set;}
       public string Title{ get; set; }
       public int CategoryLinkToId { get;set; }
       public bool IsRecherche { get;set; }
       
    }
}