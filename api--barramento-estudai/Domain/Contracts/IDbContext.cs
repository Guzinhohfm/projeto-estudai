using System.Data;

namespace api__barramento_estudai.Domain.Contracts
{
    public interface IDbContext
    {
        Task<IDbConnection> ObterConnectionAsync();
    }
}
