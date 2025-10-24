using System.Data.Common;

namespace api__barramento_estudai.Configuration
{
    public class DbProvider
    {
        public void RegistrarProvedorBanco(string nomeInstanciaProvedor)
        {
            DbProviderFactories.RegisterFactory("MySql.Data.MySqlClient", MySql.Data.MySqlClient.MySqlClientFactory.Instance);

        }
    }
}
