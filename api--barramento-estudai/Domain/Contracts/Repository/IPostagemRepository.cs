using api__barramento_estudai.Domain.Entities;

namespace api__barramento_estudai.Domain.Contracts.Repository
{
    public interface IPostagemRepository
    {
        Task<bool> CriarPostagemAsync(Postagem postagem);

        Task<List<Postagem>> ListarPostagensPublicas();

    }
}
