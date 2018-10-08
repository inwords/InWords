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

        /// <summary>
        /// Seria's Title
        /// </summary>
        [Required]
        [StringLength(64)]
        public string SeriaName { get; set; }

        /// <summary>
        /// User created this Seria
        /// </summary>
        [ForeignKey("User")]
        public int CreatorID { get; set; }

        public virtual User Creator { get; set; }

        /// <summary>
        /// List of Description on different langs
        /// </summary>
        public virtual ICollection<SeriaDescription> SeriaDescriptions { get; set; }
    }
}