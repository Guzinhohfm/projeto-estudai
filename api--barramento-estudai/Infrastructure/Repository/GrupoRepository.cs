using api__barramento_estudai.Application.Dto;
using api__barramento_estudai.Domain.Contracts;
using api__barramento_estudai.Domain.Contracts.Repository;
using api__barramento_estudai.Domain.Entities;
using Dapper;
using MySql.Data.MySqlClient;

namespace api__barramento_estudai.Infrastructure.Repository
{
    public class GrupoRepository : IGrupoRepository
    {
        private readonly IDbContext _context;
        private readonly ILogger<GrupoRepository> _logger;


        public GrupoRepository(IDbContext context, ILogger<GrupoRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<bool> AdicionarUsuarioAoGrupoAsync(int codigoUsuario, int codigoGrupo)
        {
            const string sql = @"
            INSERT INTO Usuario_Grupo (Cod_usuario, Cod_grupo, Data_entrada)
            VALUES (@Cod_usuario, @Cod_grupo, @Data_entrada);
             ";

            try
            {
                using var conn = await _context.ObterConnectionAsync();
                var result = await conn.ExecuteAsync(sql, new { Cod_usuario = codigoUsuario, Cod_grupo = codigoGrupo, Data_entrada = DateTime.Now });
                return result > 0;
            }
            catch (MySqlException ex) when (ex.Number == 1062)
            {
                // Já está no grupo (duplicado)
                return false;
            }


        }

        public async Task<int> CriarGrupoAsync(GrupoDto grupoDto)
        {
            try
            {
                _logger.LogInformation("Criando grupo...");

                const string sqlGrupo = @"
                    INSERT INTO Grupo (Nome, Descricao, Data_criacao)
                    VALUES (@Nome, @Descricao, @Data_criacao);
                    SELECT LAST_INSERT_ID();
                ";

                var grupo = new Grupo
                {
                    Nome = grupoDto.Nome,
                    Descricao = grupoDto.Descricao,
                    Data_criacao = DateTime.Now
                };

                using var conn = await _context.ObterConnectionAsync();

                var codGrupo = await conn.QuerySingleAsync<int>(sqlGrupo, grupo);

                // Adiciona o criador como membro
                const string sqlMembro = @"
                    INSERT INTO Usuario_Grupo (Cod_usuario, Cod_grupo, Data_entrada)
                    VALUES (@Cod_usuario, @Cod_grupo, @Data_entrada);
                ";

                await conn.ExecuteAsync(sqlMembro, new { Cod_usuario = grupoDto.Codigo_usuario, Cod_grupo = codGrupo , Data_entrada = DateTime.Now});

                return codGrupo;
            }
            catch (Exception ex)
            {
                _logger.LogError("Não foi possível criar o grupo {@Erro}", ex.Message);
                return 0;
            }
           
        }

        public async Task<IEnumerable<Grupo>> ListarGrupoAsync()
        {
            try
            {
                _logger.LogInformation("Buscando grupos...");

                const string sql = "SELECT * FROM Grupo";

                using var conn = await _context.ObterConnectionAsync();

                return await conn.QueryAsync<Grupo>(sql);
            }
            catch (Exception ex)
            {
                _logger.LogError("Não foi possível listar os grupos {@Erro}", ex.Message);
                return null;
            }
           
        }

        public async Task<IEnumerable<Usuario>> ListarUsuariosDoGrupoAsync(int codigoGrupo)
        {
            try
            {
                using var conn = await _context.ObterConnectionAsync();

                    var query = @"
                SELECT u.Cod_usuario, u.Nome, u.Email
                FROM Usuario u
                INNER JOIN Usuario_Grupo ug ON u.Cod_usuario = ug.Cod_usuario
                WHERE ug.Cod_grupo = @codigoGrupo;";

                return await conn.QueryAsync<Usuario>(query, new { codigoGrupo });

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public async Task<bool> VerificaUsuarioPertenceAoGrupoAsync(int codigoUsuario, int codigoGrupo)
        {
            const string sql = @"
            SELECT COUNT(*) FROM Usuario_Grupo
            WHERE Cod_usuario = @Cod_usuario AND Cod_grupo = @Cod_grupo;
                ";

            using var conn = await _context.ObterConnectionAsync();
            var count = await conn.ExecuteScalarAsync<int>(sql, new { Cod_usuario = codigoUsuario, Cod_grupo = codigoGrupo });
            return count > 0;
        }
    }
}
