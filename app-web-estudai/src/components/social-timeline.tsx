import React, { useState, useEffect } from "react";
import axios from "axios";
import { Console } from "console";
import { Post } from './post'



interface ResponsePost {
  cod_postagem: number;
  nomeUsuario: string;
  curso?: string,
  texto?: string;
  caminhoMidia?: string;
  data_postagem: string;
  tipo_postagem: number;
  tipo_midia: string;
}

export function SocialTimeline() {
  const [texto, setTexto] = useState("");
  const [tipoPostagem, setTipoPostagem] = useState(1); // 1 = pública
  const [midia, setMidia] = useState<File | null>(null);
  const [postagens, setPostagens] = useState<ResponsePost[]>([]);


  // 📥 Buscar postagens públicas do backend
const carregarPostagens = async () => {
  try {
    const token = localStorage.getItem("jwtToken");
    const response = await axios.get("http://localhost:8080/api/Postagem/ListarPublicas", {
        headers: {
          Authorization: `Bearer ${token}`,
      },
    });
    setPostagens(response.data);
    console.log(response.data)
  } catch (error) {
    console.error("Erro ao buscar postagens:", error);
  }
};
  useEffect(() => {
    carregarPostagens();
  }, []);

  // 🚀 Enviar nova postagem
  const handlePostar = async (e) => {
    e.preventDefault();

     if (!texto.trim() && !midia) {
       alert("Você precisa escrever algo ou anexar uma mídia antes de postar!");
       return;
     }

    const formData = new FormData();
    formData.append("Texto", texto);
    formData.append("TipoPostagem", tipoPostagem.toString());
    if (midia) formData.append("midia", midia);

    try {
        const token = localStorage.getItem("jwtToken");

      await axios.post("http://localhost:8080/api/Postagem/Postar", formData, {
        headers: {
        "Content-Type": "multipart/form-data",
         Authorization: `Bearer ${token}`,
      },
    });

      setTexto("");
      setMidia(null);
      await carregarPostagens(); // Recarrega timeline
    } catch (error) {
      console.error("Erro ao postar:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      {/* 🧾 Caixa de criação de post */}
      <div className="bg-white rounded-2xl shadow-md p-4 mb-6 border border-gray-200">
        <form
          onSubmit={handlePostar}
          className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-4"
        >
          {/* Campo de texto */}
          <textarea
            placeholder="O que você está pensando?"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
          ></textarea>

          {/* Linha com anexo + botão */}
          <div className="flex items-center justify-between mt-3">
            {/* Input escondido */}
            <input
              type="file"
              accept="image/*,video/*"
              id="midiaInput"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setMidia(e.target.files[0]);
                } else {
                  setMidia(null);
                }
              }}
              className="hidden"
            />

            {/* Label estilizado como botão de anexo */}
            <label
              htmlFor="midiaInput"
              className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-800 transition font-medium"
            >
              {/* Ícone de anexo */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.44 11.05l-9.19 9.19a5.5 5.5 0 11-7.78-7.78l9.19-9.19a3.5 3.5 0 114.95 4.95L9.88 16.48a1.5 1.5 0 11-2.12-2.12l8.13-8.13"
                />
              </svg>
              <span>Anexar mídia</span>
            </label>

            {/* Botão de postar */}
            <button
              type="submit"
              className="bg-blue-600 text-black px-4 py-2 rounded-xl hover:bg-blue-700 transition font-semibold shadow-sm"
            >
              Postar
            </button>
          </div>
        </form>

      </div>

      {/* 🧱 Timeline */}
      {postagens.length === 0 ? (
  <p className="text-center text-gray-500">Nenhuma postagem ainda.</p>
) : (
  postagens.map((post, index) => (
    <Post
      key={index}
      cod_postagem={post.cod_postagem}
      nomeUsuario={post.nomeUsuario}
      texto={post.texto}
      caminhoMidia={post.caminhoMidia}
      tipoMidia={post.tipo_midia}
      data_postagem={post.data_postagem}
    />
  ))
)}

    </div>
  );
}
