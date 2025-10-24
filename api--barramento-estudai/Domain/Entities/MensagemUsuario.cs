namespace api__barramento_estudai.Domain.Entities
{
    public class MensagemUsuario
    {
        public int Cod_mensagem { get; set; }
        public int Cod_usuario { get; set; }

        public int Cod_grupo { get; set; }

        public string Conteudo { get; set; }

        public DateTime Data_envio { get; set; }

        public bool IsIa { get; set; }

        public string Usuario { get; set; }
        
       
    }
}
