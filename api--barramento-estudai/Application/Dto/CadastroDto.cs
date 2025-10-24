namespace api__barramento_estudai.Application.Dto
{
    public class CadastroDto
    {
        public int Num_matricula { get; set; }

        public string Email { get; set; }

        public string CPF { get; set; }

        public string Senha { get; set; }

        public string Nome { get; set; }

        public DateTime Data_nascimento { get; set; }

        public string Sexo { get; set; }
        public string Tipo_usuario { get; set; }

        public int? Semestre { get; set; }

        public int? Cod_curso { get; set; }
    }
}
