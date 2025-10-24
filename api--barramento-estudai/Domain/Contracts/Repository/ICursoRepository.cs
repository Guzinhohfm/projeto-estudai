using api__barramento_estudai.Domain.Entities;

namespace api__barramento_estudai.Domain.Contracts.Repository
{
    public interface ICursoRepository
    {
        Task<List<Curso>> ListarCursos();

        Task<string> BuscarCursoPorId(int? id);
    }
}
