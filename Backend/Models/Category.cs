using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;

namespace backend.Models {
    public class Category {
          [Key,
        DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CategoryId { get; set; }


        [
        Required(ErrorMessage = "Required"),
        ]
        public string Name { get; set; }

        [Required]
        public virtual IList<Service> CategorysServices {get;set;} = new List <Service>();

        
    }
}