using System;
using backend.Models;

namespace backend.Models{

    public class PrestationDTO{

        public int Id { get; set; }
        public int IdServiceProvided {get;set;}        
        public string nomService {get;set;}
        public int IdUserClient  {get;set;}
        public string nomClient {get;set;}
        public int IdUserProvider {get;set;}
        public string nomProvider {get;set;}
        public DateTime Date {get;set;}
        public Etat Etat {get;set;} = Etat.Orded;
        
    }
}