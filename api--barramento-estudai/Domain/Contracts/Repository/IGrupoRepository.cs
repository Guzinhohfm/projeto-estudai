using api__barramento_estudai.Application.Dto;
using api__barramento_estudai.Domain.Entities;

namespace api__barramento_estudai.Domain.Contracts.Repository
{
    public interface IGrupoRepository
    {
        Task<int> CriarGrupoAsync(GrupoDto grupoDto);

        Task<IEnumerable<Grupo>> ListarGrupoAsync();

        Task<bool> AdicionarUsuarioAoGrupoAsync(int codigoUsuario, int codigoGrupo);

        Task<bool> VerificaUsuarioPertenceAoGrupoAsync(int codigoUsuario, int codigoGrupo);

        Task<IEnumerable<Usuario>> ListarUsuariosDoGrupoAsync(int codigoGrupo);
    }
}
