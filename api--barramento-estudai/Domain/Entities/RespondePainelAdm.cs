namespace api__barramento_estudai.Domain.Entities
{
    public class RespondePainelAdm
    {
        public int TotalUsuarios {  get; set; }

        public int TotalGrupos { get; set; }

        public int TotalPostagens { get; set; }

        public int TotalAmizades { get; set; }

        public List<Quantificador> novosUsuariosPorMes {  get; set; }

        public List<Quantificador> postagensPorMes { get; set; }
    }
}
