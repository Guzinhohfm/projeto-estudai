using api__barramento_estudai.Application.Dto;
using api__barramento_estudai.Domain.Contracts;
using api__barramento_estudai.Domain.Contracts.Repository;
using api__barramento_estudai.Domain.Entities;
using api__barramento_estudai.Domain.Enum;
using Dapper;

namespace api__barramento_estudai.Infrastructure.Repository
{
    public class ConexaoRepository : IConexaoRepository
    {
        private readonly IDbContext _context;

        public ConexaoRepository(IDbContext context)
        {
            _context = context;
        }

        public async Task<bool> EnviarSolicitacaoAsync(int codUsuario, int codUsuario2)
        {
            using var conn = await _context.ObterConnectionAsync();

            var sql = @"INSERT INTO Conexao (Cod_usuario, Cod_usuario2, Status, Data_conexao)
                    VALUES (@codUsuario, @codUsuario2, 'P', NOW())";

            var result = await conn.ExecuteAsync(sql, new { codUsuario, codUsuario2 });

            return result > 0;
        }

        public async Task<IEnumerable<dynamic>> ListarAmigosAsync(int codUsuario)
        {
            using var conn = await _context.ObterConnectionAsync();

            var sql = @"
            SELECT 
                c.Cod_conexao as cod_conexao,
                c.Cod_usuario as cod_usuario,
                c.Cod_usuario2 as cod_usuario2,
                c.Status as status,
                c.Data_conexao as data_conexao,
                CASE 
                    WHEN c.Cod_usuario = @codUsuario THEN u2.Nome
                    ELSE u1.Nome
                END AS nome,
                CASE 
                    WHEN c.Cod_usuario = @codUsuario THEN u2.Email
                    ELSE u1.Email
                END AS email
            FROM Conexao c
            INNER JOIN Usuario u1 ON c.Cod_usuario = u1.Cod_usuario
            INNER JOIN Usuario u2 ON c.Cod_usuario2 = u2.Cod_usuario
            WHERE c.Status = 'A'
              AND (@codUsuario IN (c.Cod_usuario, c.Cod_usuario2));";

            return await conn.QueryAsync(sql, new {  codUsuario });
        }

        public async Task<IEnumerable<AmizadePendenteDto>> ListarAmizadesPendentesAsync(int codUsuario)
        {
            using var conn = await _context.ObterConnectionAsync();

            var sql = @"
                SELECT 
                    c.Cod_conexao,
                    c.Cod_usuario,
                    c.Cod_usuario2,
                    c.Status,
                    c.Data_conexao,
                    u.Nome,
                    u.Email
                FROM Conexao c
                INNER JOIN Usuario u ON u.Cod_usuario = c.Cod_usuario
                WHERE c.Status = 'P' 
                  AND c.Cod_usuario2 = @codUsuario;";

            return await conn.QueryAsync<AmizadePendenteDto>(sql, new { codUsuario });
        }


        public async Task<bool> AtualizarStatusAsync(int codConexao, StatusConexao statusConexao)
        {
            using var conn = await _context.ObterConnectionAsync();

            var statusChar = statusConexao switch
            {
                StatusConexao.Pendente => "P",
                StatusConexao.Aceita => "A",
                StatusConexao.Recusada => "R",
                _ => throw new ArgumentOutOfRangeException(nameof(statusConexao))
            };

            var sql = @"UPDATE Conexao SET Status = @statusChar WHERE Cod_conexao = @codConexao";
            var result = await conn.ExecuteAsync(sql, new { statusChar, codConexao });

            return result > 0;
        }

        public async Task<bool> RemoverAmizadeAsync(int codConexao)
        {
            using var conn = await _context.ObterConnectionAsync();
            var result = await conn.ExecuteAsync("DELETE FROM Conexao WHERE Cod_conexao = @codConexao", new { codConexao });
            return result > 0;
        }

        public async Task<IEnumerable<dynamic>> ListarAmizadesEnviadasAsync(int codigoUsuario)
        {
            using var conn = await _context.ObterConnectionAsync();

                var sql = @"
                SELECT 
                    c.Cod_conexao,
                    c.Cod_usuario,
                    c.Cod_usuario2,
                    c.Status,
                    c.Data_conexao,
                    u2.Nome AS nome,
                    u2.Email AS email
                FROM Conexao c
                INNER JOIN Usuario u2 ON c.Cod_usuario2 = u2.Cod_usuario
                WHERE c.Status = 'P'
                  AND c.Cod_usuario = @codigoUsuario;";

            return await conn.QueryAsync(sql, new { codigoUsuario });
        }
    }
}
