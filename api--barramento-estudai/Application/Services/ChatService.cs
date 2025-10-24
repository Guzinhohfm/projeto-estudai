using api__barramento_estudai.Application.Dto;
using api__barramento_estudai.Domain.Contracts.Agents;
using api__barramento_estudai.Domain.Contracts.Repository;
using api__barramento_estudai.Domain.Contracts.Services;
using api__barramento_estudai.Domain.Entities;

namespace api__barramento_estudai.Application.Services
{
    public class ChatService : IChatService
    {
        private readonly IGrupoRepository _grupoRepository;
        private readonly IMensagemRepository _mensagemRepository;
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly ISugestaoAgente _sugestaoAgent;

        public ChatService(IGrupoRepository grupoRepository, IMensagemRepository mensagemRepository, IUsuarioRepository usuarioRepository, ISugestaoAgente sugestaoAgent)
        {
            _grupoRepository = grupoRepository;
            _mensagemRepository = mensagemRepository;
            _usuarioRepository = usuarioRepository;
            _sugestaoAgent = sugestaoAgent;
        }

        public async Task<bool> AdicionarUsuarioAoGrupoAsync(string emailUsuario, int codigoGrupo)
        {
            var usuario = await _usuarioRepository.BuscarUsuarioPorEmail(emailUsuario);

            if (usuario is not null)
            {
                var codigoUsuario = usuario.Cod_usuario;
                var usuarioPertenceAoGrupo = await _grupoRepository.VerificaUsuarioPertenceAoGrupoAsync(codigoUsuario, codigoGrupo);

                if (usuarioPertenceAoGrupo)
                    throw new Exception("Não foi possível incluir o usuário...verifique se ele já não faz parte do grupo");

                return await _grupoRepository.AdicionarUsuarioAoGrupoAsync(codigoUsuario, codigoGrupo);
            }
            else
            {
                throw new Exception("Usuário não localizado!");
            }

          
        }

        public async Task<int> CriarGrupoAsync(GrupoDto grupoDto)
        {
            return await _grupoRepository.CriarGrupoAsync(grupoDto);
        }

        public async Task<IEnumerable<Usuario>> ListarUsuariosDoGrupoAsync(int codigoGrupo)
        {
            return await _grupoRepository.ListarUsuariosDoGrupoAsync(codigoGrupo);
        }
    }
}
