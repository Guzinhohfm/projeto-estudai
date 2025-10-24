using System.Security.Claims;
using api__barramento_estudai.Application.Dto;
using api__barramento_estudai.Domain.Contracts.Repository;
using api__barramento_estudai.Domain.Contracts.Services;
using api__barramento_estudai.Domain.Entities;
using api__barramento_estudai.Infrastructure.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api__barramento_estudai.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GrupoController : ControllerBase
    {
        private readonly IChatService _chatService;
        private readonly IUsuarioRepository _usuarioRepository;

        public GrupoController(IChatService chatService, IUsuarioRepository usuarioRepository)
        {
            _chatService = chatService;
            _usuarioRepository = usuarioRepository;
        }

        [HttpPost("Criar")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Criar([FromBody] GrupoDto grupoDto)
        {
            try
            {
                var idUsuario = User.FindFirstValue("id_usuario");
                if (idUsuario == null)
                    return Unauthorized(new { Erro = "Token inválido" });


                if(grupoDto.Codigo_usuario <= 0)
                {
                    grupoDto.Codigo_usuario = int.Parse(idUsuario);
                }

                var codigoGrupo = await _chatService.CriarGrupoAsync(grupoDto);


                if (codigoGrupo > 0)
                    return Created(string.Empty, new { Mensagem = "Grupo criado com sucesso", grupoDto.Nome, CodigoGrupo = codigoGrupo });

                return BadRequest(new { Erro = "Não foi possível criar o grupo" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Erro = ex.Message });

            }

        }

        [HttpPost("{idGrupo}/usuarios/{emailUsuario}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Adicionar(int idGrupo, string emailUsuario)
        {
            try
            {
                await _chatService.AdicionarUsuarioAoGrupoAsync(emailUsuario, idGrupo);
                return Created(string.Empty, new { Mensagem = "Usuário adicionado ao grupo com sucesso!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Erro = ex.Message });

            }
        }

        [HttpGet("{idGrupo}/usuarios")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> ListarUsuariosDoGrupo(int idGrupo)
        {
            try
            {
                var usuarios = await _chatService.ListarUsuariosDoGrupoAsync(idGrupo);
                if (usuarios == null || !usuarios.Any())
                    return NotFound(new { Mensagem = "Nenhum usuário encontrado para este grupo." });

                return Ok(usuarios);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Erro = ex.Message });
            }
        }


    }
}
