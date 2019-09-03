using System;
using System.ComponentModel.DataAnnotations;

namespace InWords.Data.Domains.EmailEntitys
{
    public class EmailVerifier
    {
        [Key]
        public int UserId { get; set; }

        [MaxLength(64)]
        [Required] public string Email { get; set; }

        public DateTime SentTime { get; set; }

        public int Code { get; set; }

        public short Attempts { get; set; }

        public bool Equals(EmailVerifier b) => Equals(b.UserId, b.Email, b.Code);

        public override bool Equals(object obj)
        {
            return obj is EmailVerifier ? Equals((EmailVerifier)obj) : false;
        }

        public bool Equals(int userId, string email, int code)
        {
            return Equals(UserId, userId) && Equals(Email, email) && Equals(Code, code);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(UserId, Email, Code);
        }
    }
}
