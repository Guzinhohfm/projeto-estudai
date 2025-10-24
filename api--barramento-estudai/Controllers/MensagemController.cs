using api__barramento_estudai.Application.Dto;
using api__barramento_estudai.Domain.Contracts.Repository;
using api__barramento_estudai.Domain.Contracts.Services;
using api__barramento_estudai.Infrastructure.Repository;
using Microsoft.AspNetCore.Mvc;

namespace api__barramento_estudai.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MensagemController : ControllerBase
    {
        private readonly IMensagemRepository _mensagemRepository;

        public MensagemController(IMensagemRepository mensagemRepository)
        {
            _mensagemRepository = mensagemRepository;
        }

        [HttpGet("grupo/{cod_grupo}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ListarPorGrupo(int cod_grupo)
        {
            try
            {
                var mensagensGrupo = await _mensagemRepository.ListarMensagemPorGrupo(cod_grupo);

                return Ok(mensagensGrupo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Erro = ex.Message });
            }
        }


    }
}
