namespace api__barramento_estudai.Application.Dto
{
    public class CriarPostDto
    {
        public string? Texto { get; set; }

        public int TipoPostagem { get; set; }

        public IFormFile? midia { get; set; }
    }
}
