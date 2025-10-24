using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace api__barramento_estudai.Domain.Entities
{
    public class Grupo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Cod_grupo { get; set; }

        [Required]
        [MaxLength(100)]
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public DateTime Data_criacao { get; set; }
    }
}
