using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;

namespace backend.Models {
    public class Chat {
        
        [Key,DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ChatId { get; set; }

       
        public virtual User User1 {get;set;}

        [Required]
        public int UserId1 {get;set;}

      
        public virtual User User2 {get;set;}

        [Required]
        public int UserId2 {get;set;}

        public  virtual IList <Message> MessageLinkedToChat {get;set;} = new List<Message>();
        

    }
}