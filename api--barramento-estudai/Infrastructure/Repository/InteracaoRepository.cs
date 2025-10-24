using System.Text.Json;
using api__barramento_estudai.Domain.Contracts;
using api__barramento_estudai.Domain.Contracts.Repository;
using api__barramento_estudai.Domain.Entities;
using Dapper;

namespace api__barramento_estudai.Infrastructure.Repository
{
    
    public class InteracaoRepository : IInteracaoRepository
    {
        private readonly IDbContext _context;

        public InteracaoRepository(IDbContext context)
        {
            _context = context;
        }

        public async Task<bool> AdicionarAsync(Interacao interacao)
        {
            try
            {
                Console.WriteLine(JsonSerializer.Serialize(interacao));
                using var conn = await _context.ObterConnectionAsync();
                var query = @"
                INSERT INTO Interacao (Cod_usuario, Cod_postagem, Tipo_interacao, Comentario, Data_interacao)
                VALUES (@Cod_usuario, @Cod_postagem, @Tipo_interacao, @Comentario, @Data_interacao)";
                var result = await conn.ExecuteAsync(query, interacao);

                return result > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return false;
            }
           
        }

        public async Task<int> ContarCurtidasAsync(int codigoPostagem)
        {
            try
            {
                using var conn = await _context.ObterConnectionAsync();
                return await conn.ExecuteScalarAsync<int>(
                    "SELECT COUNT(*) FROM Interacao WHERE Cod_postagem = @codigoPostagem AND Tipo_interacao = 1",
                    new { codigoPostagem });
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return 0;
            }
           
        }

        public async Task<IEnumerable<Interacao>> ListarComentariosAsync(int codigoPostagem)
        {
            try
            {
                using var conn = await _context.ObterConnectionAsync();
                return await conn.QueryAsync<Interacao>(
                    @"SELECT i.*, u.Nome AS Usuario
              FROM Interacao i
              JOIN Usuario u ON i.Cod_usuario = u.Cod_usuario
              WHERE i.Cod_postagem = @codigoPostagem AND i.Tipo_interacao = 2
              ORDER BY i.Data_interacao DESC",
                    new { codigoPostagem });
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return null;
            }
        }

        public async Task<bool> UsuarioCurtiuAsync(int codigoUsuario, int codigoPostagem)
        {
            try
            {
                using var conn = await _context.ObterConnectionAsync();
                var count = await conn.ExecuteScalarAsync<int>(
                    @"SELECT COUNT(*) FROM Interacao 
              WHERE Cod_usuario = @codigoUsuario AND Cod_postagem = @codigoPostagem AND Tipo_interacao = 1",
                    new { codigoUsuario, codigoPostagem });
                return count > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return false;
            }
        }
    }
}
