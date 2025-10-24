using api__barramento_estudai.Domain.Contracts.Agents;
using api__barramento_estudai.Domain.Contracts.Repository;
using api__barramento_estudai.Domain.Entities;
using api__barramento_estudai.Infrastructure.Repository;
using Microsoft.AspNetCore.SignalR;

namespace api__barramento_estudai.Application.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ISugestaoAgente _agenteIa;
        private readonly IMensagemRepository _mensagemRepo;
        private readonly IUsuarioRepository _usuarioRepo;

        public ChatHub(ISugestaoAgente agenteIa, IMensagemRepository mensagemRepo, IUsuarioRepository usuarioRepo)
        {
            _agenteIa = agenteIa;
            _mensagemRepo = mensagemRepo;
            _usuarioRepo = usuarioRepo;
        }

        public async Task EntrarNoGrupo(int cod_grupo)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, cod_grupo.ToString());
            Console.WriteLine($"Conexão {Context.ConnectionId} entrou no grupo {cod_grupo}");
        }

        public async Task EnviarMensagem(int cod_grupo, string usuario, string mensagem, bool usarIA)
        {
            try
            {
                Console.WriteLine($"[HUB] {usuario} enviou '{mensagem}' no grupo {cod_grupo}");

                var mensagemParaSalvar = new Mensagem()
                {
                    Cod_grupo = cod_grupo,
                    Cod_usuario = await _usuarioRepo.ObterIdUsuarioPorNome(usuario),
                    Conteudo = mensagem,
                    isIa = false

                };

                await _mensagemRepo.EnviarMensagemAsync(mensagemParaSalvar);


                await Clients.Group(cod_grupo.ToString())
                             .SendAsync("ReceberMensagem", usuario, mensagem);

                if (usarIA && _agenteIa != null)
                {
                    var respostaIA = await _agenteIa.GerarSugestaoAsync(mensagem);

                    var mensagemIa = new Mensagem()
                    {
                        Cod_usuario = null, // ou -1 se preferir
                        Cod_grupo = cod_grupo,
                        Conteudo = respostaIA,
                        Data_envio = DateTime.Now,
                        isIa = true
                    };

                    await _mensagemRepo.EnviarMensagemAsync(mensagemIa);

                   
                    await Clients.Group(cod_grupo.ToString())
                                 .SendAsync("ReceberMensagem", "Tutor IA", respostaIA);

                    Console.WriteLine("A resposta da IA foi..." + respostaIA);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ Erro no EnviarMensagem: {ex.Message}");
                throw; 
            }
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var codGrupo = httpContext?.Request.Query["grupoId"];

            if (!string.IsNullOrEmpty(codGrupo))
            {
                await Groups.AddToGroupAsync(Context.ConnectionId, codGrupo);
                Console.WriteLine($"Usuário conectado ao grupo {codGrupo}");
            }

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            Console.WriteLine($"Usuário desconectado: {Context.ConnectionId}");
            await base.OnDisconnectedAsync(exception);
        }

    }
}
