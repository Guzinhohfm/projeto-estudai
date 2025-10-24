using api__barramento_estudai.Domain.Enum;

namespace api__barramento_estudai.Domain.Entities
{
    public class Conexao
    {
        public int Cod_conexao { get; set; }
        public int Cod_usuario { get; set; }
        public int Cod_usuario2 { get; set; }
        public StatusConexao Status { get; set; } // 'P' (Pendente), 'A' (Aceita), 'R' (Recusada)
        public DateTime Data_conexao { get; set; }

        // Propriedades de navegação (opcional, apenas para consulta com JOIN)
        public Usuario Usuario { get; set; }
        public Usuario Usuario2 { get; set; }
    }
}
