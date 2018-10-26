namespace InWords.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    /// <summary>
    /// Words Set with levels
    /// </summary>
    public class Seria
    {
        [Key]
        public int SeriaID { get; set; }

        [Required]
        [StringLength(64)]
        public string Title { get; set; }

        /// <summary>
        /// User created this Seria
        /// </summary>
        public int CreatorID { get; set; }

        [ForeignKey("CreatorID")]
        public virtual User Creator { get; set; }

        /// <summary>
        /// List of Description on different langs
        /// </summary>
        public virtual ICollection<SeriaDescription> SeriaDescriptions { get; set; }
    }
}