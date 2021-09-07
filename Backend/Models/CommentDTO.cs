using System;
using System.Collections.Generic;
using backend.Models;

namespace backend.Models {
    public class CommentDTO {
        
        public int CmntId { get; set; }
        public string Description { get; set; }
        public int AuthorId {get;set;}
        public int ServiceLinkedToId {get;set;}
        public int ReceiverId {get;set;}
        public DateTime Date {get;set;}
        public float Rating {get;set;}
       
    }
}