using System.Collections.Generic;

namespace InWords.Transfer.Data.Models.Creation
{
    public class CreationInfo
    {
        public int? CreatorId { get; set; }

        public List<DescriptionInfo> Descriptions { get; set; }
    }
}