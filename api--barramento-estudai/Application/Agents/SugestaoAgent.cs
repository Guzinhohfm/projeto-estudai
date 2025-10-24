using api__barramento_estudai.Application.Services;
using api__barramento_estudai.Domain.Contracts.Agents;

namespace api__barramento_estudai.Application.Agents
{
    public class SugestaoAgente : ISugestaoAgente
    {
        private readonly IAService _iaService;

        public SugestaoAgente(IAService iaService)
        {
            _iaService = iaService;
        }

        public async Task<string> GerarSugestaoAsync(string mensagem)
        {
            var prompt = $@"A mensagem a seguir foi enviada em um grupo de estudos: '{mensagem}' 
            Gere uma resposta curta com:
            - possíveis dúvidas que surgem a partir dessa mensagem
            - ou sugestões de tópicos para continuar a conversa.";
    
            return await _iaService.EnviarPromptAsync(prompt);
        }
    }

}
