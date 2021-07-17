﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backend.Models;

namespace barterserv.Migrations
{
    [DbContext(typeof(BarterContext))]
    [Migration("20210717172933_newtablesContext")]
    partial class newtablesContext
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("backend.Models.Category", b =>
                {
                    b.Property<int>("CategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(10) CHARACTER SET utf8mb4")
                        .HasMaxLength(10);

                    b.HasKey("CategoryId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("backend.Models.Message", b =>
                {
                    b.Property<int>("MsgId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("varchar(140) CHARACTER SET utf8mb4")
                        .HasMaxLength(140);

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("OfferLinkedToId")
                        .HasColumnType("int");

                    b.Property<int>("SenderId")
                        .HasColumnType("int");

                    b.HasKey("MsgId");

                    b.HasIndex("OfferLinkedToId");

                    b.HasIndex("SenderId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("backend.Models.Offer", b =>
                {
                    b.Property<int>("OfferId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("AuthorId")
                        .HasColumnType("int");

                    b.HasKey("OfferId");

                    b.HasIndex("AuthorId");

                    b.ToTable("Offers");

                    b.HasData(
                        new
                        {
                            OfferId = 1,
                            AuthorId = 1
                        },
                        new
                        {
                            OfferId = 2,
                            AuthorId = 2
                        },
                        new
                        {
                            OfferId = 3,
                            AuthorId = 3
                        },
                        new
                        {
                            OfferId = 4,
                            AuthorId = 4
                        },
                        new
                        {
                            OfferId = 5,
                            AuthorId = 5
                        },
                        new
                        {
                            OfferId = 6,
                            AuthorId = 6
                        },
                        new
                        {
                            OfferId = 7,
                            AuthorId = 7
                        });
                });

            modelBuilder.Entity("backend.Models.Service", b =>
                {
                    b.Property<int>("ServiceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CategoryLinkToId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(10) CHARACTER SET utf8mb4")
                        .HasMaxLength(10);

                    b.Property<int>("OfferLinkToId")
                        .HasColumnType("int");

                    b.Property<int>("OfferLinkedToOfferId")
                        .HasColumnType("int");

                    b.Property<int>("ProviderId")
                        .HasColumnType("int");

                    b.HasKey("ServiceId");

                    b.HasIndex("CategoryLinkToId");

                    b.HasIndex("OfferLinkedToOfferId");

                    b.HasIndex("ProviderId");

                    b.ToTable("Services");
                });

            modelBuilder.Entity("backend.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(10) CHARACTER SET utf8mb4")
                        .HasMaxLength(10);

                    b.Property<string>("Nickname")
                        .IsRequired()
                        .HasColumnType("varchar(10) CHARACTER SET utf8mb4")
                        .HasMaxLength(10);

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("Province")
                        .HasColumnType("int");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<int>("Sexe")
                        .HasColumnType("int");

                    b.Property<int>("TimeCredit")
                        .HasColumnType("int");

                    b.HasKey("UserId");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            UserId = 1,
                            Email = "ben@gmail.com",
                            Name = "Penelle",
                            Nickname = "Ben",
                            Password = "ben",
                            Province = 6,
                            Role = 0,
                            Sexe = 1,
                            TimeCredit = 5
                        },
                        new
                        {
                            UserId = 2,
                            Email = "bruno@gmail.com",
                            Name = "Lacroix",
                            Nickname = "Bru",
                            Password = "bruno",
                            Province = 9,
                            Role = 0,
                            Sexe = 1,
                            TimeCredit = 5
                        },
                        new
                        {
                            UserId = 3,
                            Email = "aela@gmail.com",
                            Name = "Izere",
                            Nickname = "Aela",
                            Password = "aela",
                            Province = 1,
                            Role = 0,
                            Sexe = 0,
                            TimeCredit = 5
                        },
                        new
                        {
                            UserId = 4,
                            Email = "luis@gmail.com",
                            Name = "Lara",
                            Nickname = "Luis",
                            Password = "luis",
                            Province = 9,
                            Role = 0,
                            Sexe = 1,
                            TimeCredit = 5
                        },
                        new
                        {
                            UserId = 5,
                            Email = "amin@gmail.com",
                            Name = "Gandouz",
                            Nickname = "Amin",
                            Password = "amin",
                            Province = 9,
                            Role = 0,
                            Sexe = 1,
                            TimeCredit = 5
                        },
                        new
                        {
                            UserId = 6,
                            Email = "nico@gmail.com",
                            Name = "Krstev",
                            Nickname = "Nico",
                            Password = "nico",
                            Province = 8,
                            Role = 0,
                            Sexe = 1,
                            TimeCredit = 5
                        },
                        new
                        {
                            UserId = 7,
                            Email = "luis@gmail.com",
                            Name = "AssBai",
                            Nickname = "Momo",
                            Password = "momo",
                            Province = 9,
                            Role = 0,
                            Sexe = 1,
                            TimeCredit = 5
                        });
                });

            modelBuilder.Entity("backend.Models.Message", b =>
                {
                    b.HasOne("backend.Models.Offer", "OfferLinkedTo")
                        .WithMany("AllCommunications")
                        .HasForeignKey("OfferLinkedToId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.User", "Sender")
                        .WithMany()
                        .HasForeignKey("SenderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("backend.Models.Offer", b =>
                {
                    b.HasOne("backend.Models.User", "Author")
                        .WithMany()
                        .HasForeignKey("AuthorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("backend.Models.Service", b =>
                {
                    b.HasOne("backend.Models.Category", "CategoryLinkTo")
                        .WithMany("CategorysServices")
                        .HasForeignKey("CategoryLinkToId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.Offer", "OfferLinkedTo")
                        .WithMany("ServiceNeeded")
                        .HasForeignKey("OfferLinkedToOfferId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.User", "Provider")
                        .WithMany()
                        .HasForeignKey("ProviderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
