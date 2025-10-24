using api__barramento_estudai.Application.Dto;
using api__barramento_estudai.Domain.Entities;

namespace api__barramento_estudai.Domain.Contracts.Services
{
    public interface IChatService
    {
        Task<int> CriarGrupoAsync(GrupoDto grupoDto);

        Task<bool> AdicionarUsuarioAoGrupoAsync(string emailUsuario, int codigoGrupo);
         
        Task<IEnumerable<Usuario>> ListarUsuariosDoGrupoAsync(int codigoGrupo);
    }
}
