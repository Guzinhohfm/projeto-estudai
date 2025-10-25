using System.Text.Json;
using api__barramento_estudai.Application.Dto;
using api__barramento_estudai.Domain.Contracts.Repository;
using api__barramento_estudai.Domain.Enum;
using api__barramento_estudai.Infrastructure.Repository;
using Microsoft.AspNetCore.Mvc;

namespace api__barramento_estudai.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AmizadeController : ControllerBase
    {
        private readonly IConexaoRepository _amizadeRepository;
        private readonly IUsuarioRepository _usuarioRepository;

        public AmizadeController(IConexaoRepository repo, IUsuarioRepository usuarioRepository)
        {
            _amizadeRepository = repo;
            _usuarioRepository = usuarioRepository;
        }

        [HttpPost("solicitar")]
        public async Task<IActionResult> Solicitar([FromBody] SolicitarAmizadeDto dto)
        {
            Console.WriteLine(JsonSerializer.Serialize(dto));


            var codUsuario2 = await _usuarioRepository.ObterIdUsuarioPorNome(dto.NomeUsuario);

            await _amizadeRepository.EnviarSolicitacaoAsync(dto.CodUsuario, codUsuario2);
            return Ok(new { Mensagem = "Solicitação enviada!" });
        }

        [HttpGet("amigos/{id}")]
        public async Task<IActionResult> ListarAmigos(int id)
        {
            var amigos = await _amizadeRepository.ListarAmigosAsync(id);
            return Ok(amigos);
        }

        [HttpGet("pendentes/{id}")]
        public async Task<IActionResult> ListarPendentes(int id)
        {
            var pendentes = await _amizadeRepository.ListarAmizadesPendentesAsync(id);
            return Ok(pendentes);
        }

        [HttpPost("aceitar/{idConexao}")]
        public async Task<IActionResult> Aceitar(int idConexao)
        {
            await _amizadeRepository.AtualizarStatusAsync(idConexao, StatusConexao.Aceita);
            return Ok(new { Mensagem = "Amizade aceita!" });
        }

        [HttpPost("recusar/{idConexao}")]
        public async Task<IActionResult> Recusar(int idConexao)
        {
            await _amizadeRepository.AtualizarStatusAsync(idConexao, StatusConexao.Recusada);
            return Ok(new { Mensagem = "Solicitação recusada!" });
        }

        [HttpDelete("remover/{idConexao}")]
        public async Task<IActionResult> Remover(int idConexao)
        {
            await _amizadeRepository.RemoverAmizadeAsync(idConexao);
            return Ok(new { Mensagem = "Amizade removida!" });
        }

        [HttpGet("enviadas/{codUsuario}")]
        public async Task<IActionResult> ListarEnviadas(int codUsuario)
        {
            var conexoes = await _amizadeRepository.ListarAmizadesEnviadasAsync(codUsuario);
            return Ok(conexoes);
        }

    }

}
