using System.ComponentModel.DataAnnotations;

namespace PendingListBackend.Models
{
    public class ToDoItem
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public bool IsComplete { get; set; }

        [StringLength(255)]
        public string Comment { get; set; }

    }
}