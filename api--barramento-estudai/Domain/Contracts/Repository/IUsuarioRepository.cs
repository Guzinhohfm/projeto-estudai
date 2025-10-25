using api__barramento_estudai.Domain.Entities;

namespace api__barramento_estudai.Domain.Contracts.Repository
{
    public interface IUsuarioRepository
    {

        Task<Usuario> IncluirUsuarioAsync(Usuario usuario);


        Task<Usuario> BuscarUsuarioPorEmail(string email);


        Task<Usuario> BuscarUsuarioPorId(int id);

        Task<int> ObterIdUsuarioPorNome(string nome);

        Task<IEnumerable<Usuario>> BuscarUsuarios();
    }
}
