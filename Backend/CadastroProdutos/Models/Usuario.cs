using System.ComponentModel.DataAnnotations;

namespace CadastroProdutos.Models
{
    public class Usuario
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string UsuarioNome { get; set; } = null!;

        [Required]
        public string SenhaHash { get; set; } = null!;

        [Required]
        public string Role { get; set; } = "cliente";
    }
}
