namespace api__barramento_estudai.Domain.Contracts.Agents
{
    public interface ISugestaoAgente
    {
        Task<string> GerarSugestaoAsync(string mensagem);
    }
}
