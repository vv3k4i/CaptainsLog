using System.Data.Entity;

namespace PendingListBackend.Models
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<ToDoItem> ToDoItems { get; set; }

        public ApplicationDbContext()
            : base("DefaultConnection")
        {
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}