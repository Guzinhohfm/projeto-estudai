using api__barramento_estudai.Domain.Contracts;
using api__barramento_estudai.Domain.Contracts.Repository;
using api__barramento_estudai.Domain.Entities;
using Dapper;

namespace api__barramento_estudai.Infrastructure.Repository
{
    public class UsuarioCursoRepository : IUsuarioCursoRepository
    {
        private readonly IDbContext _context;

        public UsuarioCursoRepository(IDbContext context)
        {
            _context = context;
        }

        public async Task<bool> IncluirUsuarioCursoAsync(int cod_usuario, int? cod_curso)
        {
            var sql = @"INSERT INTO Usuario_Curso 
                (Cod_usuario, Cod_curso)
                VALUES (@Cod_usuario, @Cod_curso);";

            using var conn = await _context.ObterConnectionAsync();

            var parametros = new
            {
                Cod_usuario = cod_usuario,
                Cod_curso = cod_curso
            };

            var linhasAfetadas = await conn.ExecuteAsync(sql, parametros);

            return linhasAfetadas > 0;
        }

        
    }
}
