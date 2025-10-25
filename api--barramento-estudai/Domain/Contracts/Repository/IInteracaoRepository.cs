using api__barramento_estudai.Application.Dto;
using api__barramento_estudai.Domain.Entities;

namespace api__barramento_estudai.Domain.Contracts.Repository
{
    public interface IInteracaoRepository
    {
        Task<bool> AdicionarAsync(InteracaoDto interacaoDto);

        Task<int> ContarCurtidasAsync(int codPostagem);

        Task<IEnumerable<Interacao>> ListarComentariosAsync(int codigoPostagem);

        Task<bool> UsuarioCurtiuAsync(int codigoUsuario, int codigoPostagem);
    }
}
