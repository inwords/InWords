using System;
using System.Collections.Generic;
using System.Text;

namespace InWords.Data.Models
{
    public class Seria
    {
        public int SeriaID { get; set; }
        
        public string SetName { get; set; }

        public User Creator { get; set; }
    }
}
