using System.Text.Json;
using api__barramento_estudai.Application.Dto;
using api__barramento_estudai.Domain.Contracts.Repository;
using api__barramento_estudai.Domain.Entities;
using api__barramento_estudai.Infrastructure.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api__barramento_estudai.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class InteracaoController : ControllerBase
    {
        private readonly IInteracaoRepository _interacaoRepository;

        public InteracaoController(IInteracaoRepository interacaoRepository)
        {
            _interacaoRepository = interacaoRepository;
        }

        [HttpPost("curtir")]
        public async Task<IActionResult> Curtir([FromBody] InteracaoDto model)
        {
            model.Tipo_interacao = 1;
            model.Data_interacao = DateTime.Now;

            Console.WriteLine("interacao: " + JsonSerializer.Serialize(model));

            if (await _interacaoRepository.UsuarioCurtiuAsync(model.Cod_usuario, model.Cod_postagem))
                return BadRequest("Você já curtiu a postagem!!");

            await _interacaoRepository.AdicionarAsync(model);
            return Ok(new { mensagem = "Curtida registrada!" });
        }

        [HttpPost("comentar")]
        public async Task<IActionResult> Comentar([FromBody] InteracaoDto model)
        {
            model.Tipo_interacao = 2;
            model.Data_interacao = DateTime.Now;
            await _interacaoRepository.AdicionarAsync(model);
            return Ok(new { mensagem = "Comentário adicionado!" });
        }

        [HttpGet("{codPostagem}/curtidas")]
        public async Task<IActionResult> ContarCurtidas(int codPostagem)
        {
            var total = await _interacaoRepository.ContarCurtidasAsync(codPostagem);
            return Ok(new { total });
        }

        [HttpGet("{codPostagem}/comentarios")]
        public async Task<IActionResult> ListarComentarios(int codPostagem)
        {
            var comentarios = await _interacaoRepository.ListarComentariosAsync(codPostagem);
            return Ok(comentarios);
        }
    }
}
