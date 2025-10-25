namespace api__barramento_estudai.Application.Dto
{
    public class InteracaoDto
    {
        public int Cod_usuario { get; set; }
        public int Cod_postagem { get; set; }
        public int Tipo_interacao { get; set; }
        public string? Comentario { get; set; }
        public DateTime Data_interacao { get; set; }
    }
}
