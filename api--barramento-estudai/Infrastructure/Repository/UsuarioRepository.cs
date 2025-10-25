using System.Data;
using api__barramento_estudai.Domain.Contracts;
using api__barramento_estudai.Domain.Contracts.Repository;
using api__barramento_estudai.Domain.Entities;
using api__barramento_estudai.Infrastructure.Data;
using Dapper;

namespace api__barramento_estudai.Infrastructure.Repository
{

    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly IDbContext _context;
        private readonly ILogger<UsuarioRepository> _logger;

        public UsuarioRepository(IDbContext context, ILogger<UsuarioRepository> logger)
        {
            _context = context;
            _logger = logger;
        }


        public async Task<Usuario> BuscarUsuarioPorEmail(string email)
        {
            var query = "select * from Usuario where Email = @email";

            using (var conn = await _context.ObterConnectionAsync())
            {
                try
                {
                    var result = await conn.QuerySingleOrDefaultAsync<Usuario>(query, new { email });

                    if (result == null)
                        throw new Exception($"Não foi possível localizar e-mail para: {email}");

                    return result;
                }
                catch (Exception ex)
                {
                    _logger.LogInformation("Não foi possível realizar a busca por email {@Mensagem}", ex.Message);
                    return null;
                }

            }
        }

        public async Task<Usuario> BuscarUsuarioPorId(int id)
        {
            var query = "select * from Usuario where Cod_usuario = @id";

            using (var conn = await _context.ObterConnectionAsync())
            {
                try
                {
                    var result = await conn.QuerySingleOrDefaultAsync<Usuario>(query, new { id });

                    if (result == null)
                        throw new Exception($"Não foi possível localizar usuário para o id: {id}");

                    return result;
                }
                catch (Exception ex)
                {
                    _logger.LogInformation("Não foi possível realizar a busca por id {@Mensagem}", ex.Message);
                    return null;
                }
            }
        }

        public async Task<IEnumerable<Usuario>> BuscarUsuarios()
        {
            try
            {
                _logger.LogInformation("Buscando usuarios...");

                const string sql = "SELECT * FROM Usuarios";

                using var conn = await _context.ObterConnectionAsync();

                return await conn.QueryAsync<Usuario>(sql);
            }
            catch (Exception ex)
            {
                _logger.LogError("Não foi possível listar os usuários {@Erro}", ex.Message);
                return null;
            }
        }

        public async Task<Usuario> IncluirUsuarioAsync(Usuario usuario)
        {
            const string proc = "sp_inserir_usuario";

            using (var conn = await _context.ObterConnectionAsync())
            {

                var parameters = new DynamicParameters();
                parameters.Add("@p_num_matricula", usuario.Num_matricula, DbType.Int32, ParameterDirection.Input);
                parameters.Add("@p_email", usuario.Email, DbType.String, ParameterDirection.Input);
                parameters.Add("@p_cpf", usuario.CPF, DbType.String, ParameterDirection.Input);
                parameters.Add("@p_senha", usuario.Senha, DbType.String, ParameterDirection.Input);
                parameters.Add("@p_nome", usuario.Nome, DbType.String, ParameterDirection.Input);
                parameters.Add("@p_data_nascimento", usuario.Data_nascimento, DbType.Date, ParameterDirection.Input);
                parameters.Add("@p_sexo", usuario.Sexo, DbType.String, ParameterDirection.Input);
                parameters.Add("@p_tipo_usuario", usuario.Tipo_usuario, DbType.String, ParameterDirection.Input);
                parameters.Add("@p_cod_curso", usuario.Cod_curso, DbType.Int32, ParameterDirection.Input);
                parameters.Add("@p_cod_usuario", dbType: DbType.Int32, direction: ParameterDirection.Output);


                await conn.ExecuteAsync(proc, parameters, commandType: CommandType.StoredProcedure);

                usuario.Cod_usuario = parameters.Get<int>("@p_cod_usuario");

                return usuario;
            }
        }

        public async Task<int> ObterIdUsuarioPorNome(string nome)
        {
            var query = "select * from Usuario where Nome = @nome";

            using (var conn = await _context.ObterConnectionAsync())
            {
                try
                {
                    var result = await conn.QuerySingleOrDefaultAsync<int>(query, new { nome });

                    if (result <= 0)
                        throw new Exception($"Não foi possível localizar nome para: {nome}");

                    return result;
                }
                catch (Exception ex)
                {
                    _logger.LogInformation("Não foi possível realizar a busca por email {@Mensagem}", ex.Message);
                    return 0;
                }

            }
        }
    }
}
