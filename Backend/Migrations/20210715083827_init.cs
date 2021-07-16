using Microsoft.EntityFrameworkCore.Migrations;

namespace barterserv.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Nickname = table.Column<string>(maxLength: 10, nullable: false),
                    Name = table.Column<string>(maxLength: 10, nullable: false),
                    Email = table.Column<string>(nullable: false),
                    TimeCredit = table.Column<int>(nullable: false),
                    Password = table.Column<string>(nullable: false),
                    Sexe = table.Column<int>(nullable: false),
                    Role = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Nickname);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Nickname", "Email", "Name", "Password", "Role", "Sexe", "TimeCredit" },
                values: new object[] { "ben", "ben@gmail.com", "Penelle", "ben", 0, 1, 5 });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Nickname", "Email", "Name", "Password", "Role", "Sexe", "TimeCredit" },
                values: new object[] { "bru", "bruno@gmail.com", "Lacroix", "bruno", 0, 1, 5 });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Nickname", "Email", "Name", "Password", "Role", "Sexe", "TimeCredit" },
                values: new object[] { "aela", "aela@gmail.com", "Izere", "aela", 0, 0, 5 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
