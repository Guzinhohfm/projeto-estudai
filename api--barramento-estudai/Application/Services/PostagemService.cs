using api__barramento_estudai.Domain.Contracts.Repository;
using api__barramento_estudai.Domain.Contracts.Services;
using api__barramento_estudai.Domain.Entities;

namespace api__barramento_estudai.Application.Services
{
    public class PostagemService : IPostagemService
    {
        private readonly IPostagemRepository _postagemRepository;
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly ICursoRepository _cursoRepository;

        public PostagemService(IPostagemRepository postagemRepository, IUsuarioRepository usuarioRepository, ICursoRepository cursoRepository)
        {
            _postagemRepository = postagemRepository;
            _usuarioRepository = usuarioRepository;
            _cursoRepository = cursoRepository;
        }

        public async Task<bool> CriarPostagemAsync(Postagem postagem)
        {
           return await _postagemRepository.CriarPostagemAsync(postagem);
        }

        public async Task<List<ResponsePost>> ListarPostagensPublicas()
        {
            var post =  await _postagemRepository.ListarPostagensPublicas();
            var listaPostagem = new List<ResponsePost>();
            

            foreach(var postagem in post)
            {
                var responsePost = new ResponsePost();
                var usuario = await _usuarioRepository.BuscarUsuarioPorId(postagem.Cod_usuario);
                var nomeCurso = await _cursoRepository.BuscarCursoPorId(usuario.Cod_curso);
                responsePost.Cod_postagem = postagem.Cod_postagem;
                responsePost.NomeUsuario = usuario.Nome;
                responsePost.Tipo_postagem = postagem.Tipo_postagem;
                responsePost.Texto = postagem.Texto;
                responsePost.Tipo_midia = postagem.Tipo_midia;
                responsePost.Data_postagem = postagem.Data_postagem;
                responsePost.CaminhoMidia = postagem.CaminhoMidia;
                responsePost.Curso = nomeCurso;
                listaPostagem.Add(responsePost);
            }

            return listaPostagem;

        }
    }
}
