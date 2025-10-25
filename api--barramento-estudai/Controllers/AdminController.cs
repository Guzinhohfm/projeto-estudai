using api__barramento_estudai.Domain.Contracts;
using api__barramento_estudai.Domain.Entities;
using Dapper;
using Microsoft.AspNetCore.Mvc;

namespace api__barramento_estudai.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IDbContext _context;

        public AdminController(IDbContext context)
        {
            _context = context;
        }

        [HttpGet("estatisticas-gerais")]
        public async Task<IActionResult> GetEstatisticasGerais()
        {
            try
            {
                using var conn = await _context.ObterConnectionAsync();

                var totalUsuarios = await conn.ExecuteScalarAsync<int>("SELECT COUNT(*) FROM Usuario");
                var totalGrupos = await conn.ExecuteScalarAsync<int>("SELECT COUNT(*) FROM Grupo");
                var totalPostagens = await conn.ExecuteScalarAsync<int>("SELECT COUNT(*) FROM Postagem");
                var totalAmizades = await conn.ExecuteScalarAsync<int>("SELECT COUNT(*) FROM Conexao WHERE Status = 'A'");

               
                // 🔹 Postagens criadas por mês
                var postagensPorMes = await conn.QueryAsync<Quantificador>(@"
                    SELECT 
                        DATE_FORMAT(Data_postagem, '%b') AS Mes,
                        COUNT(*) AS Quantidade
                    FROM Postagem
                    WHERE YEAR(Data_postagem) = YEAR(CURDATE())
                    GROUP BY MONTH(Data_postagem), Mes
                    ORDER BY MONTH(Data_postagem);
                ");

                var resposta = new RespondePainelAdm
                {
                    TotalUsuarios = totalUsuarios,
                    TotalGrupos = totalGrupos,
                    TotalPostagens = totalPostagens,
                    TotalAmizades = totalAmizades,
                    postagensPorMes = postagensPorMes.ToList()
                };

                return Ok(resposta);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao gerar estatísticas do painel: {ex}");
                return StatusCode(500, new { erro = "Erro ao carregar estatísticas do painel." });
            }
        }
    }
}
