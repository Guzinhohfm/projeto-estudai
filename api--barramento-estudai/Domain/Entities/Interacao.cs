namespace api__barramento_estudai.Domain.Entities
{
    public class Interacao
    {
        public int Cod_interacao { get; set; }

        public string Usuario { get; set; }

        public int Cod_usuario { get; set; }
        public int Cod_postagem { get; set; }
        public int Tipo_interacao { get; set; }
        public string? Comentario { get; set; }
        public DateTime Data_interacao { get; set; }
    }
}
