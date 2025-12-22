using Microsoft.EntityFrameworkCore;
using CadastroProdutos.Models;

namespace CadastroProdutos.Database
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Produto> Produtos { get; set; } = null!; // sua tabela de produtos
        public DbSet<Usuario> Usuarios { get; set; } = null!; // nova tabela de usuários
    }
}
