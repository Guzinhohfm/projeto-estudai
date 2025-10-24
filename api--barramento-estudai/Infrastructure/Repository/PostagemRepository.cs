using api__barramento_estudai.Domain.Contracts;
using api__barramento_estudai.Domain.Contracts.Repository;
using api__barramento_estudai.Domain.Entities;
using Dapper;

namespace api__barramento_estudai.Infrastructure.Repository
{
    public class PostagemRepository : IPostagemRepository
    {
        private readonly IDbContext _context;

        public PostagemRepository(IDbContext context)
        {
            _context = context;
        }

        public async Task<bool> CriarPostagemAsync(Postagem postagem)
        {
            var sql = @"INSERT INTO Postagem 
                (Cod_usuario, Texto, CaminhoMidia, Tipo_midia, Tipo_postagem)
                VALUES (@Cod_usuario, @Texto, @CaminhoMidia, @Tipo_midia, @Tipo_postagem);
                SELECT LAST_INSERT_ID();"
            ;

            using var conn = await _context.ObterConnectionAsync();
            return await conn.ExecuteScalarAsync<int>(sql, postagem) > 0;
        }

       public async Task<List<Postagem>> ListarPostagensPublicas()
        {
            var sql = @"SELECT * FROM Postagem WHERE Tipo_postagem = 1 ORDER BY Data_postagem DESC";

            using var conn = await _context.ObterConnectionAsync();
            var result = await conn.QueryAsync<Postagem>(sql);
            return result.ToList();
        }

    }
}
