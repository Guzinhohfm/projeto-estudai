using api__barramento_estudai.Application.Dto;
using System.Security.Claims;
using System.Text;
using api__barramento_estudai.Domain.Entities.Jwt;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using api__barramento_estudai.Domain.Contracts.Services;
using api__barramento_estudai.Domain.Entities;

namespace api__barramento_estudai.Application.Services
{
    public class GeradorTokenJwtService : IGeradorTokenJwtService
    {
        private readonly JwtSettings _jwtSettings;


        public GeradorTokenJwtService(IOptions<JwtSettings> jwtOptions)
        {
            _jwtSettings = jwtOptions.Value;
        }

        public TokenDto GerarTokenJwt(Usuario usuario)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, usuario.Email),
            new Claim("email", usuario.Email),
             new Claim("id_usuario", usuario.Cod_usuario.ToString()),
             new Claim("nome_usuario", usuario.Nome),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddHours(_jwtSettings.ExpiryHours),
                signingCredentials: creds
            );

            var tokenDto = new TokenDto()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                ExpirationTime = DateTime.UtcNow.AddHours(_jwtSettings.ExpiryHours)
            };

            return tokenDto;
        }
    }
}
