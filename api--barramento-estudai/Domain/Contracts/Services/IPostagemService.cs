using api__barramento_estudai.Domain.Entities;

namespace api__barramento_estudai.Domain.Contracts.Services
{
    public interface IPostagemService
    {
        Task<bool> CriarPostagemAsync(Postagem postagem);

        Task<List<ResponsePost>> ListarPostagensPublicas();
    }
}
