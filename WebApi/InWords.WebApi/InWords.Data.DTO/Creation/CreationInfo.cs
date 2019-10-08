using System.Collections.Generic;

namespace InWords.Data.DTO.Creation
{
    public class CreationInfo
    {
        private string creatorNickname;
        public int? CreatorId { get; set; }

        public string CreatorNickname
        {
            get
            {
                if (creatorNickname == null)
                    creatorNickname = string.Empty;
                return creatorNickname;
            }
            set => creatorNickname = value;
        }

        public List<DescriptionInfo> Descriptions { get; set; }
    }
}