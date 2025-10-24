using api__barramento_estudai.Domain.Contracts;
using api__barramento_estudai.Domain.Contracts.Repository;
using api__barramento_estudai.Domain.Entities;
using api__barramento_estudai.Infrastructure.Data;
using Dapper;

namespace api__barramento_estudai.Infrastructure.Repository
{
    public class UsuarioGrupoRepository : IUsuarioGrupoRepository
    {
        private readonly IDbContext _context;

        public UsuarioGrupoRepository(IDbContext context)
        {
            _context = context;
        }

        public async Task<List<Grupo>> ListarGruposPorUsuario(int cod_usuario)
        {
            var sql = @"
                SELECT g.Cod_grupo, g.Nome, g.Descricao, g.Data_criacao
                FROM Usuario_Grupo ug
                INNER JOIN Grupo g ON ug.Cod_grupo = g.Cod_grupo
                WHERE ug.Cod_usuario = @cod_usuario;
            ";

            using var conn = await _context.ObterConnectionAsync();

            try
            {
                var grupos = await conn.QueryAsync<Grupo>(sql, new { cod_usuario });
                return grupos.ToList();
            }
            catch (Exception ex)
            {

                return new List<Grupo>();
            }
        }
    }
}
