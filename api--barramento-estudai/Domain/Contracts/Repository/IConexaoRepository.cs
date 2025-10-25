using api__barramento_estudai.Application.Dto;
using api__barramento_estudai.Domain.Entities;
using api__barramento_estudai.Domain.Enum;

namespace api__barramento_estudai.Domain.Contracts.Repository
{
    public interface IConexaoRepository
    {
        Task<bool> EnviarSolicitacaoAsync(int codigoUsuario, int codigoUsuario2);

        Task<IEnumerable<dynamic>> ListarAmigosAsync(int codigoUsuario);

        Task<IEnumerable<AmizadePendenteDto>> ListarAmizadesPendentesAsync(int codigoUsuario);


        Task<bool> AtualizarStatusAsync(int codConexao, StatusConexao statusConexao);

        Task<bool> RemoverAmizadeAsync(int codConexao);

        Task<IEnumerable<dynamic>> ListarAmizadesEnviadasAsync(int codigoUsuario);


    }
}
