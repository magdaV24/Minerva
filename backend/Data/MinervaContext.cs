using API.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class MinervaContext : IdentityDbContext<User, Role, int>
    {
        public MinervaContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<FlipCard> FlipCards { get; set; }
        public DbSet<MultiCard> MultiCards { get; set; }
         protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
                .HasOne(a => a.Avatar)
                .WithOne()
                .HasForeignKey<UserAvatar>(a => a.Id)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Role>()
                .HasData(
                    new Role {Id = 1, Name = "User", NormalizedName = "USER" },
                    new Role {Id = 2, Name = "Admin", NormalizedName = "ADMIN" }
                );
        }
    }
}
