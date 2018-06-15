namespace PendingListBackend.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddToDoItem : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ToDoItems",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        IsComplete = c.Boolean(nullable: false),
                        Comment = c.String(maxLength: 255),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.ToDoItems");
        }
    }
}
