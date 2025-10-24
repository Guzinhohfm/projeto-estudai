import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Grupo {
  cod_grupo: number;
  nome: string;
  descricao: string;
  data_criacao: string;
}

interface Usuario {
  cod_usuario: number;
  nome: string;
  email: string;
}

export function StudyGroups() {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState<null | number>(null);
  const [showMembersModal, setShowMembersModal] = useState<null | number>(null);
  const [novoGrupo, setNovoGrupo] = useState({ nome: "", descricao: "" });
  const [emailNovoMembro, setEmailNovoMembro] = useState("");
  const [membros, setMembros] = useState<Usuario[]>([]);
  const navigate = useNavigate();

  const apiUrl = "http://localhost:8080/api";

  // 🔹 Carregar grupos do usuário logado
  const carregarGrupos = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        console.error("Token não encontrado");
        return;
      }

      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.id_usuario;

      const response = await axios.get(`${apiUrl}/UsuarioGrupo/listar/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setGrupos(response.data);
    } catch (error) {
      console.error("Erro ao buscar grupos:", error);
    }
  };

  useEffect(() => {
    carregarGrupos();
  }, []);

  // 🔹 Criar grupo
  const criarGrupo = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      await axios.post(`${apiUrl}/Grupo/Criar`, novoGrupo, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowModal(false);
      setNovoGrupo({ nome: "", descricao: "" });
      await carregarGrupos();
    } catch (error) {
      console.error("Erro ao criar grupo:", error);
    }
  };

  // 🔹 Adicionar membro
  const adicionarMembro = async (idGrupo: number) => {
    try {
      const token = localStorage.getItem("jwtToken");
      await axios.post(
        `${apiUrl}/Grupo/${idGrupo}/usuarios/${emailNovoMembro}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Usuário adicionado com sucesso!");
      setShowAddModal(null);
      setEmailNovoMembro("");
    } catch (error) {
      console.error("Erro ao adicionar membro:", error);
      alert("Erro ao adicionar membro. Verifique o e-mail informado.");
    }
  };

  // 🔹 Listar membros do grupo
  const carregarMembros = async (idGrupo: number) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.get(`${apiUrl}/Grupo/${idGrupo}/usuarios`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMembros(response.data);
      setShowMembersModal(idGrupo);
    } catch (error) {
      console.error("Erro ao buscar membros:", error);
      setMembros([]);
      setShowMembersModal(idGrupo);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Meus Grupos</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-black font-semibold px-4 py-2 rounded-xl shadow-md border border-blue-500 hover:bg-blue-700 transition-colors"
        >
          + Criar Grupo
        </button>
      </div>

      {/* Listagem dinâmica */}
      {grupos.length === 0 ? (
        <p className="text-gray-500">Você ainda não participa de nenhum grupo.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {grupos.map((g) => (
            <div
              key={g.cod_grupo}
              className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              <h2 className="font-semibold text-lg text-blue-700">{g.nome}</h2>
              <p className="text-gray-600 mb-2">{g.descricao}</p>
              <p className="text-xs text-gray-400">
                Criado em {new Date(g.data_criacao + "Z").toLocaleDateString("pt-BR")}
              </p>

              {/* Botões */}
              <div className="flex items-center gap-2 mt-4">
                <button
                  onClick={() => navigate(`/grupo/${g.cod_grupo}`)}
                  className="flex-1 bg-blue-600 text-white font-medium px-4 py-2 rounded-lg text-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-[0_0_15px_3px_rgba(59,130,246,0.5)]"
                >
                  Entrar
                </button>

                {/* Ver membros */}
                <button
                  onClick={() => carregarMembros(g.cod_grupo)}
                  className="flex items-center justify-center bg-gray-200 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-300 transition"
                  title="Ver membros"
                >
                  👥
                </button>

                {/* Adicionar membro */}
                <button
                  onClick={() => setShowAddModal(g.cod_grupo)}
                  className="flex items-center justify-center bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition"
                  title="Adicionar membro"
                >
                  ➕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de criação de grupo */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-[400px] shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Criar Novo Grupo</h2>

            <input
              type="text"
              placeholder="Nome do grupo"
              value={novoGrupo.nome}
              onChange={(e) => setNovoGrupo({ ...novoGrupo, nome: e.target.value })}
              className="w-full border p-2 rounded-lg mb-3"
            />

            <textarea
              placeholder="Descrição"
              value={novoGrupo.descricao}
              onChange={(e) => setNovoGrupo({ ...novoGrupo, descricao: e.target.value })}
              className="w-full border p-2 rounded-lg mb-3"
              rows={3}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={criarGrupo}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de adicionar membro */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-[400px] shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Adicionar Membro</h2>

            <input
              type="email"
              placeholder="E-mail do usuário"
              value={emailNovoMembro}
              onChange={(e) => setEmailNovoMembro(e.target.value)}
              className="w-full border p-2 rounded-lg mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(null)}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={() => adicionarMembro(showAddModal)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de membros */}
      {showMembersModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 w-[400px] shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Membros do Grupo</h2>

            {membros.length > 0 ? (
              <ul className="max-h-60 overflow-y-auto border rounded-lg">
                {membros.map((m) => (
                  <li key={m.cod_usuario} className="p-2 border-b text-gray-700">
                    <strong>{m.nome}</strong>
                    <p className="text-sm text-gray-500">{m.email}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center">Nenhum membro encontrado.</p>
            )}

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowMembersModal(null)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
