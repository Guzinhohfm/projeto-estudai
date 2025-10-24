using System.Data.Common;
using System.Data;
using api__barramento_estudai.Domain.Contracts;

namespace api__barramento_estudai.Infrastructure.Data
{
    public class DbContext : IDbContext
    {
        private readonly IConfiguration _configuration;
        private readonly string _providerName;

        public DbContext(IConfiguration configuration)
        {
            _configuration = configuration;
            _providerName = _configuration.GetValue<string>("ConnectionStrings:ProviderName")!;


        }

        public async Task<IDbConnection> ObterConnectionAsync()
        {
            try
            {
                var factory = DbProviderFactories.GetFactory(_providerName);

                var connection = factory.CreateConnection();

                if (connection == null)
                {
                    throw new InvalidOperationException($"Não foi possivel criar a conexão com o provedor: {_providerName}");
                }

                connection.ConnectionString = _configuration.GetConnectionString("Mysql");
                await connection.OpenAsync();

                return connection;
            }
            catch (Exception ex)
            {
                throw new Exception("Não foi possível obter a conexão com o banco de dados", ex);
            }

        }
    }
}
