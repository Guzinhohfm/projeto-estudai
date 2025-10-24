using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api__barramento_estudai.Domain.Entities
{
    public class Usuario
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Cod_usuario { get; set; }

        [Required]
        public int Num_matricula { get; set; }

        [Required]
        [MaxLength(100)]
        public string Email { get; set; }

        [Required]
        [StringLength(11)]
        public string CPF { get; set; }

        [Required]
        [MaxLength(255)]
        public string Senha { get; set; }

        [Required]
        [MaxLength(255)]
        public string Nome { get; set; }

        [Required]
        public DateTime Data_nascimento { get; set; }

        [Required]
        [StringLength(1)]
        public string Sexo { get; set; } 

        public int? Cod_curso { get; set; }

        [Required]
        [StringLength(1)]
        public string Tipo_usuario { get; set; }

        public int? Semestre { get; set; } 

    }
}
