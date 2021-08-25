using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;

namespace backend.Models {
    public class Message {
        
        [Key,
        DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MsgId { get; set; }

        [Required(ErrorMessage = "Required"),
        MinLength(3, ErrorMessage = "Minimum 3 characters"),
        MaxLength(140, ErrorMessage = "Maximum 140 characters")]
        public string Content{ get; set; }

        public DateTime Date {get;set;}

        public virtual Chat chat {get;set;}

        public int ChatId { get; set; }
      
    }
}