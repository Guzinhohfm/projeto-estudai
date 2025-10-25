namespace api__barramento_estudai.Application.Dto
{
    public class AmizadePendenteDto
    {
        public int Cod_conexao { get; set; }
        public int Cod_usuario { get; set; }
        public int Cod_usuario2 { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime Data_conexao { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }
}
