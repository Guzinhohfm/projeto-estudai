using api__barramento_estudai.Application.Dto;
using api__barramento_estudai.Domain.Entities;

namespace api__barramento_estudai.Domain.Contracts.Services
{
    public interface IGeradorTokenJwtService
    {
        TokenDto GerarTokenJwt(Usuario usuario);
    }
}
