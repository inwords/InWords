namespace InWords.Data.Models
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    public class GameBox
    {
        [Key]
        public int GameBoxID { get; set; }

        /// <summary>
        /// User created this Seria
        /// </summary>
        public int CreationID { get; set; }

        [ForeignKey("CreationID")]
        public virtual Creation Creator { get; set; }

        /// <summary>
        /// List of Description on different langs
        /// </summary>
        public virtual ICollection<CreationDescription> CreationDescriptions { get; set; }

    }
}
