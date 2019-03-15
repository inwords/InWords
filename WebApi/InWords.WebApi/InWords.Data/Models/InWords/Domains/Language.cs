namespace InWords.Data.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Text;

    public class Language
    {
        [Key]
        public int LanguageId { get; set; }

        [StringLength(32)]
        public string Title { get; set; }
    }
}
