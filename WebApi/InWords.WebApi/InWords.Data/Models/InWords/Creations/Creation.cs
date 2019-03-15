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
        public int CreationId { get; set; }

        public int CreatorId { get; set; }

        [ForeignKey("CreatorId")]
        public virtual User Creator { get; set; }
    }
}