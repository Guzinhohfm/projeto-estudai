using api__barramento_estudai.Domain.Contracts.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api__barramento_estudai.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsuarioGrupoController : ControllerBase
    {
        private readonly IUsuarioGrupoRepository _usuarioGrupoRepository;

        public UsuarioGrupoController(IUsuarioGrupoRepository usuarioGrupoRepository)
        {
            _usuarioGrupoRepository = usuarioGrupoRepository;
        }

        [HttpGet("listar/{cod_usuario}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ListarPorUsuario(int cod_usuario)
        {
            try
            {
                var grupos = await _usuarioGrupoRepository.ListarGruposPorUsuario(cod_usuario);

                return Ok(grupos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Erro = ex.Message });
            }
        }
    }
}
