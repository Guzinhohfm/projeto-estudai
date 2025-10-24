using api__barramento_estudai.Application.Dto;
using api__barramento_estudai.Domain.Contracts.Repository;
using api__barramento_estudai.Domain.Contracts.Services;
using api__barramento_estudai.Domain.Dominios;
using api__barramento_estudai.Domain.Entities;

namespace api__barramento_estudai.Application.Services
{
    public class AutenticacaoService : IAutenticacaoService
    {
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IGeradorTokenJwtService _geradorTokenJwtService;
        private readonly IUsuarioCursoRepository _usuarioCursoRepository;

        public AutenticacaoService(IUsuarioRepository usuarioRepository, IGeradorTokenJwtService geradorTokenJwtService, IUsuarioCursoRepository usuarioCursoRepository)
        {
            _usuarioRepository = usuarioRepository;
            _geradorTokenJwtService = geradorTokenJwtService;
            _usuarioCursoRepository = usuarioCursoRepository;
        }

        public async Task<TokenDto> AutenticarAsync(LoginDto loginDto)
        {
            var loginExistente = await _usuarioRepository.BuscarUsuarioPorEmail(loginDto.email);

            var senhaValida = loginExistente != null && ValidadorSenha.VerificarSenha(loginDto.senha, loginExistente.Senha);

            if (!senhaValida)
                throw new Exception("E-mail ou senha incorretos");

            return _geradorTokenJwtService.GerarTokenJwt(loginExistente!);
        }

        public async Task<Usuario> CadastrarUsuarioAsync(CadastroDto cadastrarUsuarioDto)
        {
            var loginExistente = await _usuarioRepository.BuscarUsuarioPorEmail(cadastrarUsuarioDto.Email);

            if (loginExistente != null)
                throw new Exception("E-mail já cadastrado!");


            var senhaEncriptada = EncriptadorSenha.HashPassword(cadastrarUsuarioDto.Senha);

            var usuario = new Usuario()
            {
                Num_matricula = cadastrarUsuarioDto.Num_matricula,
                Email = cadastrarUsuarioDto.Email,
                CPF = cadastrarUsuarioDto.CPF.Replace(".", "").Replace("-", ""),
                Nome = cadastrarUsuarioDto.Nome,
                Data_nascimento = cadastrarUsuarioDto.Data_nascimento,
                Sexo = cadastrarUsuarioDto.Sexo,
                Tipo_usuario = cadastrarUsuarioDto.Tipo_usuario,
                Senha = senhaEncriptada,
                Semestre = cadastrarUsuarioDto.Semestre,
                Cod_curso = cadastrarUsuarioDto.Cod_curso
            };

            var usuarioInserido = await _usuarioRepository.IncluirUsuarioAsync(usuario);

            if (usuarioInserido.Cod_curso > 0)
            {
               await _usuarioCursoRepository.IncluirUsuarioCursoAsync(usuarioInserido.Cod_usuario, usuarioInserido.Cod_curso);
            }
          
            return usuarioInserido;
        }
    }
}
