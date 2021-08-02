using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace barterserv.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategoryId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.CategoryId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Nickname = table.Column<string>(maxLength: 30, nullable: false),
                    Fullname = table.Column<string>(maxLength: 30, nullable: false),
                    Email = table.Column<string>(nullable: false),
                    TimeCredit = table.Column<int>(nullable: false),
                    Province = table.Column<int>(nullable: false),
                    Sexe = table.Column<int>(nullable: false),
                    Role = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Offers",
                columns: table => new
                {
                    OfferId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    AuthorId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Offers", x => x.OfferId);
                    table.ForeignKey(
                        name: "FK_Offers_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    MsgId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Content = table.Column<string>(maxLength: 140, nullable: false),
                    SenderId = table.Column<int>(nullable: false),
                    OfferLinkedToId = table.Column<int>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.MsgId);
                    table.ForeignKey(
                        name: "FK_Messages_Offers_OfferLinkedToId",
                        column: x => x.OfferLinkedToId,
                        principalTable: "Offers",
                        principalColumn: "OfferId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Messages_Users_SenderId",
                        column: x => x.SenderId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    ServiceId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(maxLength: 10, nullable: false),
                    OfferLinkedtoServiceOfferId = table.Column<int>(nullable: true),
                    CategoryLinkToId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.ServiceId);
                    table.ForeignKey(
                        name: "FK_Services_Categories_CategoryLinkToId",
                        column: x => x.CategoryLinkToId,
                        principalTable: "Categories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Services_Offers_OfferLinkedtoServiceOfferId",
                        column: x => x.OfferLinkedtoServiceOfferId,
                        principalTable: "Offers",
                        principalColumn: "OfferId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Email", "Fullname", "Nickname", "Province", "Role", "Sexe", "TimeCredit" },
                values: new object[,]
                {
                    { 1, "ben@gmail.com", "Penelle", "Ben", 3, 0, 1, 5 },
                    { 2, "bruno@gmail.com", "Lacroix", "Bru", 0, 0, 1, 5 },
                    { 3, "aela@gmail.com", "Izere", "Aela", 8, 0, 0, 5 },
                    { 4, "luis@gmail.com", "Lara", "Luis", 0, 0, 1, 5 },
                    { 5, "amin@gmail.com", "Gandouz", "Amin", 0, 0, 1, 5 },
                    { 6, "nico@gmail.com", "Krstev", "Nico", 1, 0, 1, 5 },
                    { 7, "momo@gmail.com", "AssBai", "Momo", 0, 0, 1, 5 }
                });

            migrationBuilder.InsertData(
                table: "Offers",
                columns: new[] { "OfferId", "AuthorId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 2, 2 },
                    { 3, 3 },
                    { 4, 4 },
                    { 5, 5 },
                    { 6, 6 },
                    { 7, 7 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Messages_OfferLinkedToId",
                table: "Messages",
                column: "OfferLinkedToId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_SenderId",
                table: "Messages",
                column: "SenderId");

            migrationBuilder.CreateIndex(
                name: "IX_Offers_AuthorId",
                table: "Offers",
                column: "AuthorId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Services_CategoryLinkToId",
                table: "Services",
                column: "CategoryLinkToId");

            migrationBuilder.CreateIndex(
                name: "IX_Services_OfferLinkedtoServiceOfferId",
                table: "Services",
                column: "OfferLinkedtoServiceOfferId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropTable(
                name: "Services");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Offers");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
