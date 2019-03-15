using System.ComponentModel.DataAnnotations;

namespace InWords.Data.Models.InWords.Domains
{
    public class Language
    {
        [Key]
        public int LanguageId { get; set; }

        [StringLength(32)]
        public string Title { get; set; }
    }
}
