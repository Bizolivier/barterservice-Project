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
        MinLength(3, ErrorMessage = "Minimum 3 characters")
       ]
        public string Description { get; set; }

        public virtual User Author { get; set; }
        [Required]
        public int AuthorId {get;set;}

        public virtual Service ServiceLinkedTo { get; set; }
        [Required]
        public int ServiceLinkedToId {get;set;}

        public virtual User Receiver { get; set; }
        [Required]
        public int ReceiverId {get;set;}

        public DateTime Date {get;set;}

        public float Rating {get;set;}

        public string Answer {get;set;}

        
    }
}