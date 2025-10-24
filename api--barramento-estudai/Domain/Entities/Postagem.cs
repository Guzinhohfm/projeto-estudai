namespace api__barramento_estudai.Domain.Entities
{
    public class Postagem
    {
        public int Cod_postagem { get; set; }
        public int Cod_usuario { get; set; }
        public string? Texto { get; set; }
        public string? CaminhoMidia { get; set; }
        public string? Tipo_midia { get; set; }
        public DateTime Data_postagem { get; set; }
        public int Tipo_postagem { get; set; } // 1 = Publico , 2 = Privado
    }
}
