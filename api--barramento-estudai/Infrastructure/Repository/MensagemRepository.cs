using api__barramento_estudai.Domain.Contracts;
using api__barramento_estudai.Domain.Contracts.Repository;
using api__barramento_estudai.Domain.Entities;
using api__barramento_estudai.Infrastructure.Data;
using Dapper;

namespace api__barramento_estudai.Infrastructure.Repository
{
    public class MensagemRepository : IMensagemRepository
    {
        private readonly IDbContext _context;

        public MensagemRepository(IDbContext context)
        {
            _context = context;
        }

        public async Task<bool> EnviarMensagemAsync(Mensagem mensagem)
        {
            const string sql = @"
            INSERT INTO Mensagem (Cod_usuario, Cod_grupo, Conteudo, Data_envio, IsIA)
            VALUES (@Cod_usuario, @Cod_grupo, @Conteudo, @Data_envio, @IsIa);
            "
            ;

            using var conn = await _context.ObterConnectionAsync();
            var result = await conn.ExecuteAsync(sql, new
            {
                Cod_usuario = mensagem.Cod_usuario,
                Cod_grupo = mensagem.Cod_grupo,
                Conteudo = mensagem.Conteudo,
                Data_envio = DateTime.Now,
                IsIa = mensagem.isIa
            });

            return result > 0;
        }

        public async Task<IEnumerable<MensagemUsuario>> ListarMensagemPorGrupo(int codGrupo)
        {
            try
            {
                using var conn = await _context.ObterConnectionAsync();

                const string query = @"
                SELECT 
                    m.Cod_mensagem, 
                    m.Cod_usuario, 
                    u.Nome AS Usuario, 
                    m.Cod_grupo,
                    m.Conteudo, 
                    m.Data_envio,
                    m.IsIA
                FROM Mensagem m
                LEFT JOIN Usuario u ON m.Cod_usuario = u.Cod_usuario
                WHERE m.Cod_grupo = @codGrupo
                ORDER BY m.cod_mensagem;";

                return await conn.QueryAsync<MensagemUsuario>(query, new { codGrupo });
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao listar mensagens do grupo {codGrupo}: {ex.Message}");
            }
        }

    }
}
