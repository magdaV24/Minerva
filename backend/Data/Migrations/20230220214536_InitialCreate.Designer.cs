﻿// <auto-generated />
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace API.Data.Migrations
{
    [DbContext(typeof(MinervaContext))]
    [Migration("20230220214536_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.3");

            modelBuilder.Entity("API.Entities.FlipCard", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Back")
                        .HasColumnType("TEXT");

                    b.Property<string>("Category")
                        .HasColumnType("TEXT");

                    b.Property<string>("Front")
                        .HasColumnType("TEXT");

                    b.Property<bool>("Public")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("FlipCards");
                });

            modelBuilder.Entity("API.Entities.MultiCard", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Category")
                        .HasColumnType("TEXT");

                    b.Property<string>("OptionOne")
                        .HasColumnType("TEXT");

                    b.Property<string>("OptionThree")
                        .HasColumnType("TEXT");

                    b.Property<string>("OptionTwo")
                        .HasColumnType("TEXT");

                    b.Property<bool>("Public")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Question")
                        .HasColumnType("TEXT");

                    b.Property<string>("RightAns")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("MultiCards");
                });
#pragma warning restore 612, 618
        }
    }
}
