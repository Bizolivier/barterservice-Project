﻿using System;
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
                    Role = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
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
                columns: new[] { "UserId", "Email", "Fullname", "Nickname", "Picture", "Province", "Role", "Sexe", "TimeCredit" },
                values: new object[,]
                {
                    { 8, "bizidudu@gmail.com", "Olivier Bizimungu", "L'Olive", "vide.png", 8, 0, 1, 50 },
                    { 1, "ben@gmail.com", "Penelle", "Ben", "vide.png", 3, 0, 1, 5 },
                    { 2, "bruno@gmail.com", "Lacroix", "Bru", "vide.png", 0, 0, 1, 5 },
                    { 3, "aela@gmail.com", "Izere", "Aela", "vide.png", 8, 0, 0, 5 },
                    { 4, "luis@gmail.com", "Save Lara", "Luis", "vide.png", 0, 0, 1, 5 },
                    { 5, "amin@gmail.com", "Gandouz", "Amin", "vide.png", 0, 0, 1, 5 },
                    { 6, "nico@gmail.com", "Krstev", "Nico", "vide.png", 1, 0, 1, 5 },
                    { 7, "momo@gmail.com", "Mohammed Assbai", "Momo", "vide.png", 0, 0, 1, 5 },
                    { 9, "alain@gmail.com", "Alain Silovy", "Timon", "vide.png", 0, 0, 1, 5 }
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
                    { 7, 7 },
                    { 8, 8 },
                    { 9, 9 }
                });

            migrationBuilder.InsertData(
                table: "Services",
                columns: new[] { "ServiceId", "CategoryLinkToId", "IsRecherche", "OfferLinkedtoServiceId", "Title" },
                values: new object[,]
                {
                    { 1, 2, true, 8, "Massage" },
                    { 2, 3, true, 8, "Electricité" },
                    { 3, 10, true, 8, "Entretien" },
                    { 4, 4, true, 8, "cours dotnet" },
                    { 5, 6, false, 8, "Jardinage" },
                    { 6, 10, false, 8, "Co Voiturage" },
                    { 7, 9, false, 8, "Hébergement" }
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
                name: "IX_Messages_ChatId",
                table: "Messages",
                column: "ChatId");

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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
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