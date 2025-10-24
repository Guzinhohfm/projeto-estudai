import { useEffect, useState } from "react";
import axios from "axios";

interface PostProps {
  cod_postagem: number;
  nomeUsuario: string;
  texto?: string;
  caminhoMidia?: string;
  tipoMidia?: string;
  data_postagem: string;
}

interface Comentario {
  usuario: string;
  comentario: string;
  data_interacao: string;
}

export function Post({
  cod_postagem,
  nomeUsuario,
  texto,
  caminhoMidia,
  tipoMidia,
  data_postagem,
}: PostProps) {
  const [likes, setLikes] = useState(0);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [novoComentario, setNovoComentario] = useState("");

  const apiUrl = "http://localhost:8080/api/Interacao";
  const token = localStorage.getItem("jwtToken");
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const cod_usuario = userData?.id;

  const carregarInteracoes = async () => {
    try {
      const [curtidasRes, comentariosRes] = await Promise.all([
        axios.get(`${apiUrl}/${cod_postagem}/curtidas`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${apiUrl}/${cod_postagem}/comentarios`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setLikes(curtidasRes.data.total);
      setComentarios(comentariosRes.data);
    } catch (error) {
      console.error("Erro ao carregar interações:", error);
    }
  };

  useEffect(() => {
    carregarInteracoes();
  }, []);

  const handleCurtir = async () => {
    try {
      await axios.post(
        `${apiUrl}/curtir`,
        { cod_postagem, cod_usuario },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      carregarInteracoes();
    } catch (error) {
      console.error("Erro ao curtir:", error);
    }
  };

  const handleComentar = async () => {
    if (!novoComentario.trim()) return;

    try {
      await axios.post(
        `${apiUrl}/comentar`,
        { cod_postagem, cod_usuario, comentario: novoComentario },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNovoComentario("");
      carregarInteracoes();
    } catch (error) {
      console.error("Erro ao comentar:", error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-4 hover:shadow-md transition">
      <div className="flex items-center mb-2">
        <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-semibold">
          {nomeUsuario?.[0]?.toUpperCase() || "?"}
        </div>
        <div className="ml-3">
          <h3 className="font-semibold text-gray-800">{nomeUsuario}</h3>
          <p className="text-xs text-gray-500">
            {new Date(data_postagem + "Z").toLocaleString("pt-BR")}
          </p>
        </div>
      </div>

      {texto && <p className="text-gray-700 mb-3">{texto}</p>}

      {caminhoMidia && (
        <>
          {tipoMidia === "mp4" || tipoMidia === "mov" || tipoMidia === "avi" ? (
            <video
              src={caminhoMidia}
              controls
              className="w-full rounded-xl mt-2"
            ></video>
          ) : (
            <img
              src={caminhoMidia}
              alt="midia"
              className="w-full rounded-xl object-cover mt-2"
            />
          )}
        </>
      )}

      {/* Botões de interação */}
      <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
        <button
          onClick={handleCurtir}
          className="hover:text-blue-600 transition"
        >
          👍 Curtir ({likes})
        </button>
      </div>

      {/* Seção de comentários */}
      <div className="mt-3 border-t pt-3">
        <input
          type="text"
          placeholder="Comente algo..."
          value={novoComentario}
          onChange={(e) => setNovoComentario(e.target.value)}
          className="w-full border rounded-lg p-2 mb-2 text-sm"
        />
        <button
          onClick={handleComentar}
          className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700"
        >
          Comentar
        </button>

        <div className="mt-3 space-y-2">
          {comentarios.map((c, i) => (
            <div key={i} className="bg-gray-50 p-2 rounded-lg text-sm">
              <strong>{c.usuario}</strong>: {c.comentario}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
