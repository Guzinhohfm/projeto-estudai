using api__barramento_estudai.Domain.Contracts;
using api__barramento_estudai.Domain.Contracts.Repository;
using api__barramento_estudai.Domain.Entities;
using Dapper;

namespace api__barramento_estudai.Infrastructure.Repository
{
    public class CursoRepository : ICursoRepository
    {
       private readonly IDbContext _context;

        public CursoRepository(IDbContext context)
        {
            _context = context;
        }

        public async Task<string> BuscarCursoPorId(int? id)
        {
            var query = "select Nome_curso from Curso where Cod_curso = @id";

            using (var conn = await _context.ObterConnectionAsync())
            {
                try
                {
                    var result = await conn.QuerySingleOrDefaultAsync<string>(query, new { id });

                    return result;
                }
                catch (Exception ex)
                {
                    return null;
                }
            }
        }

        public async Task<List<Curso>> ListarCursos()
        {
            var sql = @"SELECT * FROM Curso;";

            using var conn = await _context.ObterConnectionAsync();
            var result = await conn.QueryAsync<Curso>(sql);
            return result.ToList();
        }

       
    }
}
