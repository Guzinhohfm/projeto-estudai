using api__barramento_estudai.Application.Dto;
using api__barramento_estudai.Domain.Contracts.Services;
using api__barramento_estudai.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySqlX.XDevAPI.Common;

namespace api__barramento_estudai.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {

        private readonly IAutenticacaoService _autenticacaoService;

        public LoginController(IAutenticacaoService autenticacaoService)
        {
            _autenticacaoService = autenticacaoService;
        }

        [HttpPost("logar")]
        [ProducesResponseType(typeof(TokenDto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            try
            {
                var token = await _autenticacaoService.AutenticarAsync(dto);

                if (token.Token == null)
                    return BadRequest("Não foi possível autenticar o usuário");

                return Created(string.Empty, token);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Mensagem = "Erro interno no servidor", Erro = ex.Message });
            }
        }

        [HttpPost("registrar")]
        [ProducesResponseType(typeof(Usuario), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CadastrarUsuario([FromBody] CadastroDto cadastrarUsuarioDto)
        {
            try
            {
                var result = await _autenticacaoService.CadastrarUsuarioAsync(cadastrarUsuarioDto);

                if (result != null)
                    return Created(string.Empty, result);

                return BadRequest("Houve falha na requisição");


            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Mensagem = "Erro interno no servidor", Erro = ex.Message });
            }
        }

    }
}
