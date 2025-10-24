using System.Security.Claims;
using api__barramento_estudai.Application.Dto;
using api__barramento_estudai.Domain.Contracts.Services;
using api__barramento_estudai.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api__barramento_estudai.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PostagemController : ControllerBase
    {
        private readonly IPostagemService _postService;

        public PostagemController(IPostagemService postService)
        {
            _postService = postService;
        }

        [HttpPost("Postar")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Criar([FromForm] CriarPostDto postDto)
        {
            try
            {

                var idUsuario = User.FindFirstValue("id_usuario"); 
                if (idUsuario == null)
                    return Unauthorized(new { Erro = "Token inválido ou usuário não encontrado." });

                int codUsuario = int.Parse(idUsuario);


                if (postDto == null || (string.IsNullOrEmpty(postDto.Texto) && postDto.midia == null))
                    return BadRequest(new { Erro = "Necessário enviar texto ou midia para fazer a postagem" });

                string? caminhoMidia = null;

                var tipoArquivo = "";

                if (postDto.midia != null)
                {
                    tipoArquivo = postDto.midia.ContentType;

                    var pasta = Path.Combine("wwwroot", "uploads", "postagens");
                    if (!Directory.Exists(pasta))
                        Directory.CreateDirectory(pasta);

                    var nomeArquivo = $"{Guid.NewGuid()}_{postDto.midia.FileName}";
                    var caminhoFisico = Path.Combine(pasta, nomeArquivo);

                    using (var stream = new FileStream(caminhoFisico, FileMode.Create))
                    {
                        await postDto.midia.CopyToAsync(stream);
                    }

                    // 🔥 Gera o caminho público (URL acessível)
                    var caminhoRelativo = Path.Combine("uploads", "postagens", nomeArquivo)
                                              .Replace("\\", "/"); // Corrige as barras

                    // 🔗 Monta URL absoluta (ex: https://localhost:7037/uploads/postagens/arquivo.png)
                    var baseUrl = $"{Request.Scheme}://{Request.Host}";
                    caminhoMidia = $"{baseUrl}/{caminhoRelativo}";
                     }


                var postagem = new Postagem
                {
                    Cod_usuario = codUsuario, 
                    Texto = postDto.Texto ?? string.Empty,
                    CaminhoMidia = caminhoMidia,
                    Tipo_postagem = postDto.TipoPostagem,
                    Data_postagem = DateTime.Now,
                    Tipo_midia = tipoArquivo

                };

                var post = await _postService.CriarPostagemAsync(postagem);

                if (post)
                    return Created(string.Empty, new { Sucesso = post, Mensagem = "Postagem criada com sucesso"});

                return BadRequest(new { Erro = "Não foi possível enviar a mensagem" });

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Erro = ex.Message });

            }
        }


        [HttpGet("ListarPublicas")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ListarPublicas()
        {
            try
            {
                var posts = await _postService.ListarPostagensPublicas();

                return Ok(posts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Erro = ex.Message });
            }
            

        }
    }
}
