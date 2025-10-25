using api__barramento_estudai.Application.Dto;
using api__barramento_estudai.Domain.Contracts.Repository;
using api__barramento_estudai.Infrastructure.Repository;
using Microsoft.AspNetCore.Mvc;


namespace api__barramento_estudai.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly ICursoRepository _cursoRepository;

        public UsuarioController(IUsuarioRepository usuarioRepository, ICursoRepository cursoRepository)
        {
            _usuarioRepository = usuarioRepository;
            _cursoRepository = cursoRepository;
        }

        [HttpGet("{codUsuario}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> BuscarPorId(int codUsuario)
        {
            try
            {
                var usuario = await _usuarioRepository.BuscarUsuarioPorId(codUsuario);

                var curso = await _cursoRepository.BuscarCursoPorId(usuario.Cod_curso);

                var usuarioDto = new UsuarioDto()
                {
                    Nome = usuario.Nome,
                    Email = usuario.Email,
                    Data_nascimento = usuario.Data_nascimento.ToString(),
                    Curso = curso
                };

                return Ok(usuarioDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Erro = ex.Message });
            }
        }
    }
}
