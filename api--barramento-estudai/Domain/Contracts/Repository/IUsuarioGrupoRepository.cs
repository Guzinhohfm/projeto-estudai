using api__barramento_estudai.Domain.Entities;

namespace api__barramento_estudai.Domain.Contracts.Repository
{
    public interface IUsuarioGrupoRepository
    {
        Task<List<Grupo>> ListarGruposPorUsuario(int cod_usuario);
    }
}
