using api__barramento_estudai.Domain.Entities;

namespace api__barramento_estudai.Domain.Contracts.Repository
{
    public interface IMensagemRepository
    {
        Task<bool> EnviarMensagemAsync(Mensagem mensagem);

        Task<IEnumerable<MensagemUsuario>> ListarMensagemPorGrupo(int codGrupo);
    }
}
