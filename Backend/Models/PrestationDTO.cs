using System;
using backend.Models;

namespace backend.Models{

    public class PrestationDTO{

        public int PrestationId { get; set; }
        public int IdServiceProvided {get;set;}
        public int IdUserClient  {get;set;}
        public int IdUserProvider {get;set;}
        public Etat Etat {get;set;} = Etat.Orded;
        
    }
}