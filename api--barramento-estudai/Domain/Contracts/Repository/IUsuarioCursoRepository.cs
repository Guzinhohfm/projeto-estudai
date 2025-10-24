using api__barramento_estudai.Domain.Entities;

namespace api__barramento_estudai.Domain.Contracts.Repository
{
    public interface IUsuarioCursoRepository
    {
        Task<bool> IncluirUsuarioCursoAsync(int cod_usuario, int? cod_curso);

       
    }
}
