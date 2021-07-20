using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;

namespace backend.Models {

    public class LinkOfferService {
        public int OfferId {get;set;}
        public virtual Offer OfferLinked {get;set;}

        public int ServiceId {get;set;}

        public virtual  Service ServiceLinked {get;set;}

    }
}