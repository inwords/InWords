namespace InWords.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    /// <summary>
    /// Words Set with levels
    /// </summary>
    public class Creation
    {
        [Key]
        public int CreationID { get; set; }

        /// <summary>
        /// User created this Seria
        /// </summary>
        public int CreatorID { get; set; }

        [ForeignKey("CreatorID")]
        public virtual User Creator { get; set; }
    }
}