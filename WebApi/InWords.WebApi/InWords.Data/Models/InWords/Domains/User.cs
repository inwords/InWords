namespace InWords.Data.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class User
    {
        [ForeignKey("Account")]
        public int UserID { get; set; }

        [StringLength(32)]
        public string NickName { get; set; }

        public string AvatarPath { get; set; }

        public int Expirience { get; set; }

        //[ForeignKey("UserID")] private
        public virtual Account Account { get; set; }
    }
}
