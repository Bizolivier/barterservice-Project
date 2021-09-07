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
                    Name = table.Column<string>(nullable: false)
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
                    Picture = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: false),
                    TimeCredit = table.Column<int>(nullable: false),
                    Province = table.Column<int>(nullable: false),
                    Sexe = table.Column<int>(nullable: false),
                    Role = table.Column<int>(nullable: false),
                    UserId1 = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Users_Users_UserId1",
                        column: x => x.UserId1,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Chats",
                columns: table => new
                {
                    ChatId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    UserId1 = table.Column<int>(nullable: false),
                    UserId2 = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Chats", x => x.ChatId);
                    table.ForeignKey(
                        name: "FK_Chats_Users_UserId1",
                        column: x => x.UserId1,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Chats_Users_UserId2",
                        column: x => x.UserId2,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
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
                    Date = table.Column<DateTime>(nullable: false),
                    SenderId = table.Column<int>(nullable: false),
                    ChatId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.MsgId);
                    table.ForeignKey(
                        name: "FK_Messages_Chats_ChatId",
                        column: x => x.ChatId,
                        principalTable: "Chats",
                        principalColumn: "ChatId",
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
                    Title = table.Column<string>(nullable: false),
                    OfferLinkedtoServiceId = table.Column<int>(nullable: false),
                    CategoryLinkToId = table.Column<int>(nullable: false),
                    IsRecherche = table.Column<bool>(nullable: false)
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
                        name: "FK_Services_Offers_OfferLinkedtoServiceId",
                        column: x => x.OfferLinkedtoServiceId,
                        principalTable: "Offers",
                        principalColumn: "OfferId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    CmntId = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Description = table.Column<string>(nullable: false),
                    AuthorId = table.Column<int>(nullable: false),
                    ServiceLinkedToId = table.Column<int>(nullable: false),
                    ReceiverId = table.Column<int>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false),
                    Rating = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.CmntId);
                    table.ForeignKey(
                        name: "FK_Comments_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Comments_Users_ReceiverId",
                        column: x => x.ReceiverId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Comments_Services_ServiceLinkedToId",
                        column: x => x.ServiceLinkedToId,
                        principalTable: "Services",
                        principalColumn: "ServiceId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "CategoryId", "Name" },
                values: new object[,]
                {
                    { 1, "Aide à la personne" },
                    { 9, "Vacances" },
                    { 8, "Travail" },
                    { 7, "Mode" },
                    { 6, "Maison" },
                    { 10, "Vehicule" },
                    { 4, "Cours" },
                    { 3, "Bricolage" },
                    { 2, "Beauté bien être" },
                    { 5, "Loisirs" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Email", "Fullname", "Nickname", "Picture", "Province", "Role", "Sexe", "TimeCredit", "UserId1" },
                values: new object[,]
                {
                    { 8, "bizidu@gmail.com", "Olivier Bizimungu", "L'Olive", "vautour.jpg", 8, 0, 1, 50, null },
                    { 1, "ben@gmail.com", "Penelle", "Ben", "mufassa.jpg", 3, 0, 1, 5, null },
                    { 2, "bruno@gmail.com", "Lacroix", "Bru", "pumba.jpg", 0, 0, 1, 5, null },
                    { 3, "aela@gmail.com", "Izere", "Aela", "nala.jpg", 8, 0, 0, 5, null },
                    { 4, "luis@gmail.com", "Save Lara", "Luis", "scar.jpg", 0, 0, 1, 5, null },
                    { 5, "amin@gmail.com", "Gandouz", "Amin", "simba.jpg", 0, 0, 1, 5, null },
                    { 6, "nico@gmail.com", "Krstev", "Nico", "rafiki.jpg", 1, 0, 1, 5, null },
                    { 7, "momo@gmail.com", "Mohammed Assbai", "Momo", "zazu.jpg", 0, 0, 1, 5, null },
                    { 9, "Ombi@gmail.com", "Bizi Ombi", "Ombeline", "timon.png", 0, 0, 1, 5, null }
                });

            migrationBuilder.InsertData(
                table: "Chats",
                columns: new[] { "ChatId", "UserId1", "UserId2" },
                values: new object[] { 1, 7, 8 });

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
                    { 7, 7 },
                    { 8, 8 },
                    { 9, 9 }
                });

            migrationBuilder.InsertData(
                table: "Messages",
                columns: new[] { "MsgId", "ChatId", "Content", "Date", "SenderId" },
                values: new object[,]
                {
                    { 1, 1, "salut Mo ", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 8 },
                    { 2, 1, "Alors l'Olive çà? ", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 7 }
                });

            migrationBuilder.InsertData(
                table: "Services",
                columns: new[] { "ServiceId", "CategoryLinkToId", "IsRecherche", "OfferLinkedtoServiceId", "Title" },
                values: new object[,]
                {
                    { 8, 8, false, 1, "archivage" },
                    { 26, 6, true, 7, "Decoration" },
                    { 27, 6, false, 7, "gardiennage" },
                    { 1, 2, true, 8, "Massage" },
                    { 2, 3, true, 8, "Electricité" },
                    { 3, 10, true, 8, "Entretien" },
                    { 25, 6, false, 7, "colocation" },
                    { 4, 4, true, 8, "cours dotnet" },
                    { 6, 10, false, 8, "Co Voiturage" },
                    { 7, 9, false, 8, "Hébergement" },
                    { 28, 3, false, 8, "plomberie" },
                    { 29, 3, true, 8, "tapisserie" },
                    { 30, 3, false, 8, "outillage" },
                    { 34, 6, false, 9, "Jardinage" },
                    { 35, 10, false, 9, "Co Voiturage" },
                    { 5, 6, false, 8, "Jardinage" },
                    { 36, 3, true, 9, "Electricité" },
                    { 24, 8, false, 6, "traduction" },
                    { 22, 3, false, 6, "maçonerie" },
                    { 9, 9, true, 1, "camping" },
                    { 31, 1, false, 1, "promenade animaux" },
                    { 10, 3, false, 2, "maçonerie" },
                    { 11, 1, true, 2, "Repassage" },
                    { 12, 8, false, 2, "traduction" },
                    { 13, 6, false, 3, "colocation" },
                    { 14, 6, true, 3, "Decoration" },
                    { 23, 1, true, 6, "Repassage" },
                    { 15, 6, false, 3, "gardiennage" },
                    { 16, 3, false, 4, "plomberie" },
                    { 17, 3, true, 4, "tapisserie" },
                    { 18, 3, false, 4, "outillage" },
                    { 33, 1, false, 4, "lecture" },
                    { 19, 1, false, 5, "promenade animaux" },
                    { 20, 1, true, 5, "ménage" },
                    { 21, 1, false, 5, "lecture" },
                    { 32, 1, true, 3, "ménage" },
                    { 37, 10, true, 9, "Entretien" }
                });

            migrationBuilder.InsertData(
                table: "Comments",
                columns: new[] { "CmntId", "AuthorId", "Date", "Description", "Rating", "ReceiverId", "ServiceLinkedToId" },
                values: new object[,]
                {
                    { 10, 9, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "vraiment au dessus de nos attentes", 5f, 1, 8 },
                    { 7, 5, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Recomandable", 4f, 8, 5 },
                    { 6, 4, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "peu mieux faire", 3f, 8, 4 },
                    { 2, 7, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Prestation excellente ,vraiment au dessus de nos attentes.Je recommande à 100%", 5f, 8, 3 },
                    { 1, 7, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Très satisfait du service rendu,je recommande", 4f, 8, 3 },
                    { 5, 4, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Reussit", 3f, 8, 2 },
                    { 4, 2, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "peu recommandable", 1f, 8, 1 },
                    { 3, 3, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Médiocre", 1f, 8, 1 },
                    { 26, 5, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Passable", 3f, 6, 24 },
                    { 25, 9, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Service minimum", 2f, 6, 23 },
                    { 24, 8, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Rien de pas ordinnaire", 3f, 6, 22 },
                    { 23, 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), " Satisfait ", 3f, 5, 21 },
                    { 22, 7, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "probleme de retard à l heure convenue ,mais prestation super", 4f, 5, 20 },
                    { 21, 6, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Prester apres 2 rdv ,mais bien executé", 3f, 5, 19 },
                    { 20, 2, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Trés amateur hélas!!", 1f, 4, 18 },
                    { 19, 9, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Très mitigé", 2f, 4, 17 },
                    { 18, 8, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Prestation moyenne", 3f, 4, 16 },
                    { 17, 7, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "A recommande", 4f, 3, 15 },
                    { 16, 6, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), " Nos attente non pas étaient déçues", 5f, 3, 14 },
                    { 15, 5, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Très bien fait", 4f, 3, 13 },
                    { 14, 4, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Prestation à recommande à 100%", 5f, 2, 12 },
                    { 13, 3, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "service rendu excellent", 4f, 2, 11 },
                    { 12, 1, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Je recommande à 100%", 5f, 2, 10 },
                    { 11, 9, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Très satisfait", 5f, 1, 9 },
                    { 8, 6, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Prestation excellente ", 5f, 8, 6 },
                    { 9, 7, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "je recommande", 4f, 8, 7 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Chats_UserId1",
                table: "Chats",
                column: "UserId1");

            migrationBuilder.CreateIndex(
                name: "IX_Chats_UserId2",
                table: "Chats",
                column: "UserId2");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_AuthorId",
                table: "Comments",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_ReceiverId",
                table: "Comments",
                column: "ReceiverId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_ServiceLinkedToId",
                table: "Comments",
                column: "ServiceLinkedToId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_ChatId",
                table: "Messages",
                column: "ChatId");

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
                name: "IX_Services_OfferLinkedtoServiceId",
                table: "Services",
                column: "OfferLinkedtoServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_UserId1",
                table: "Users",
                column: "UserId1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropTable(
                name: "Services");

            migrationBuilder.DropTable(
                name: "Chats");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Offers");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
