namespace InWords.Data.Models
{
    using System.ComponentModel.DataAnnotations.Schema;

    public class User
    {
        [ForeignKey("Account")]
        public int UserID { get; set; }

        public string NickName { get; set; }

        public string AvatarPath { get; set; }

        public int Expirience { get; set; }

        public virtual Account Account { get; set; }
    }
}
