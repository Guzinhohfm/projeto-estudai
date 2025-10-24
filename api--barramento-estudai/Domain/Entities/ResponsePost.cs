namespace api__barramento_estudai.Domain.Entities
{
    public class ResponsePost
    {
        public int Cod_postagem { get; set; }
        public string NomeUsuario { get; set; }

        public string Curso { get; set; }

        public string? Texto { get; set; }
        public string? CaminhoMidia { get; set; }

        public string? Tipo_midia { get; set; }
        public DateTime Data_postagem { get; set; }
        public int Tipo_postagem { get; set; }
    }
}
