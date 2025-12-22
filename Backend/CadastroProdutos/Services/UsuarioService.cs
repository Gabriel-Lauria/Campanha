using CadastroProdutos.Database;
using CadastroProdutos.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CadastroProdutos.Services
{
    public class UsuarioService
    {
        private readonly ApplicationDbContext _db;
        private readonly PasswordHasher<Usuario> _hasher = new();

        public UsuarioService(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<Usuario?> ObterPorUsuarioAsync(string usuarioNome)
        {
            return await _db.Usuarios.FirstOrDefaultAsync(u => u.UsuarioNome == usuarioNome);
        }

        public async Task<Usuario> CriarUsuarioAsync(string usuarioNome, string senha, string role = "cliente")
        {
            var usuario = new Usuario
            {
                UsuarioNome = usuarioNome,
                Role = role
            };
            usuario.SenhaHash = _hasher.HashPassword(usuario, senha);

            _db.Usuarios.Add(usuario);
            await _db.SaveChangesAsync();
            return usuario;
        }

        public bool ValidarSenha(Usuario usuario, string senha)
        {
            var resultado = _hasher.VerifyHashedPassword(usuario, usuario.SenhaHash, senha);
            return resultado == PasswordVerificationResult.Success;
        }
    }
}
