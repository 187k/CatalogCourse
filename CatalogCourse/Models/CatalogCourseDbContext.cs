using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CatalogCourse.Models;

public partial class CatalogCourseDbContext : DbContext
{
    public CatalogCourseDbContext()
    {
    }

    public CatalogCourseDbContext(DbContextOptions<CatalogCourseDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Guide> Guides { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer("Server=localhost;Database=CatalogCourseDB;Trusted_Connection=True;TrustServerCertificate=True;");
        }
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Guide>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Guides__3214EC07C9A40E7C");

            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.Language).HasMaxLength(50);
            entity.Property(e => e.Link).HasMaxLength(200);
            entity.Property(e => e.Title).HasMaxLength(100);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
