using System;
using System.Collections.Generic;
using backend.Models;

namespace backend.Models {
    public class MessageDTO {

        public int MsgId {get;set;}
        public string Content{ get; set; }
        public DateTime Date {get;set;}
        public int ChatId { get; set; }
       
    }
}