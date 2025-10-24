namespace api__barramento_estudai.Domain.Entities
{
    public class Mensagem
    {
        public int Cod_mensagem { get; set; }
        public int? Cod_usuario { get; set; }
        public int Cod_grupo { get; set; }
        public string Conteudo { get; set; }
        public DateTime Data_envio { get; set; }

        public bool isIa { get; set; }
    }
}
