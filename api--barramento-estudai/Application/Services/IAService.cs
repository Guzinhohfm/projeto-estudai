using System.Diagnostics;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace api__barramento_estudai.Application.Services
{
   
    public class IAService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        private readonly string _apiKey;

        public IAService(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _apiKey = _configuration["Cerebras:ApiKey"]!;


        }

        public async Task<string> EnviarPromptAsync(string prompt)
        {
            try
            {
                var url = "https://api.cerebras.ai/v1/chat/completions";

                var requestBody = new
                {
                    model = "llama-3.3-70b",
                    stream = false,  
                    max_tokens = 2048,
                    temperature = 0.2,
                    top_p = 1,
                    messages = new[]
                    {
                    new { role = "system", content = "Você é um assistente acadêmico prestativo e objetivo." },
                    new { role = "user", content = prompt }
                    }
                };

                var json = JsonSerializer.Serialize(requestBody);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                _httpClient.DefaultRequestHeaders.Clear();
                _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_apiKey}");

                var response = await _httpClient.PostAsync(url, content);

                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();
                    throw new Exception($"Erro ao chamar IA: {response.StatusCode} - {error}");
                }

                var result = await response.Content.ReadAsStringAsync();

                using var doc = JsonDocument.Parse(result);
                var resposta = doc.RootElement
                    .GetProperty("choices")[0]
                    .GetProperty("message")
                    .GetProperty("content")
                    .GetString();

                return resposta;
            }
            catch (Exception ex)
            {
                return string.Empty;
            }
            
        }
    }

}
