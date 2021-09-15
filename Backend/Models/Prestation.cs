using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;

namespace backend.Models{

     public enum Etat {
         Orded = 0, provided = 1, rated=2
       }

    public class Prestation {
          [Key,
        DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PrestationId { get; set; }

        [ ForeignKey("Service")]
        public int IdServiceProvided {get;set;}

        [ ForeignKey("User")]
        public int IdUserClient {get;set;}

         [ ForeignKey("User")]
        public int IdUserProvider {get;set;}

        public Etat Etat {get;set;} = Etat.Orded;

        
    }
}