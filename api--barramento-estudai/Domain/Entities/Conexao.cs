using System.ComponentModel.DataAnnotations.Schema;
using api__barramento_estudai.Domain.Enum;

namespace api__barramento_estudai.Domain.Entities
{
    public class Conexao
    {
        public int Cod_conexao { get; set; }
        public int Cod_usuario { get; set; }
        public int Cod_usuario2 { get; set; }
        public string Status { get; set; } // 'P' (Pendente), 'A' (Aceita), 'R' (Recusada)
        public DateTime Data_conexao { get; set; }

        public Usuario Usuario { get; set; }
        public Usuario Usuario2 { get; set; }

        [NotMapped]
        public StatusConexao StatusEnum => Status switch
        {
            "P" => StatusConexao.Pendente,
            "A" => StatusConexao.Aceita,
            "R" => StatusConexao.Recusada,
            _ => throw new ArgumentOutOfRangeException(nameof(Status))
        };
    }
}
