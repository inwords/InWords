using System;
using System.Collections.Generic;
using System.Text;

namespace InWords.Transfer.Data
{
    public class CreationInfo
    {
        public int CreatorID { get; set; }

        public List<DescriptionInfo> Descriptions { get; set; }
    }
}
