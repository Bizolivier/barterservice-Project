using System;
using System.Collections.Generic;
using backend.Models;

namespace backend.Models {
    public class ChatDTO {

        public int ChatId {get;set;}
        public int UserId1 {get;set;}
        public int UserId2 {get;set;}
        public IEnumerable <MessageDTO> MessageLinkedToChat { get; set; }  
       
    }
}