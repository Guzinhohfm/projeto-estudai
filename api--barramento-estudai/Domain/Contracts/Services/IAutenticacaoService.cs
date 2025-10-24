using api__barramento_estudai.Application.Dto;
using api__barramento_estudai.Domain.Entities;

namespace api__barramento_estudai.Domain.Contracts.Services
{
    public interface IAutenticacaoService
    {
        Task<TokenDto> AutenticarAsync(LoginDto loginDto);
        Task<Usuario> CadastrarUsuarioAsync(CadastroDto cadastrarUsuarioDto);
    }
}
