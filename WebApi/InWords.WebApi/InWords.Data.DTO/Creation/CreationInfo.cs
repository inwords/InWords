using System.Collections.Generic;

namespace InWords.Data.DTO.Creation
{
    public class CreationInfo
    {
        public int? CreatorId { get; set; }

        public string CreatorNickname { get; set; }

        public List<DescriptionInfo> Descriptions { get; set; }
    }
}