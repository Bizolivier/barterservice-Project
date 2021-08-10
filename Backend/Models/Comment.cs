using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;

namespace backend.Models {

    public class Comment {
          [Key,
        DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CmntId { get; set; }
        
        [
        Required(ErrorMessage = "Required"),
        MinLength(3, ErrorMessage = "Minimum 3 characters"),
        MaxLength(10, ErrorMessage = "Maximum 10 characters")]
        public string Description { get; set; }

        public virtual User Author { get; set; }

        public virtual User Receiver { get; set; }

        public DateTime Date {get;set;}

        
    }
}