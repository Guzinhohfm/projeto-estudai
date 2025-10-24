import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as signalR from "@microsoft/signalr";

export function GroupChat() {
  const { id } = useParams();
  const codGrupo = Number(id);

  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [messages, setMessages] = useState<{ usuario: string; mensagem: string }[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [iaAtivada, setIaAtivada] = useState(false);
  const [userData, setUserData] = useState<any>(() => {
  const saved = localStorage.getItem("userData");
  return saved ? JSON.parse(saved) : null;
  });

  // ✅ Carregar dados do usuário ao montar o componente
  useEffect(() => {
    const saved = localStorage.getItem("userData");
    if (saved) {
      setUserData(JSON.parse(saved));
    }
  }, []);

  const usuario = userData.name || "Desconhecido";
  const codUsuario = userData.id || 0;
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

  // ✅ Carregar histórico de mensagens do grupo
  useEffect(() => {
    const carregarMensagens = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/Mensagem/grupo/${codGrupo}`);
        if (!response.ok) throw new Error("Erro ao buscar histórico");
        const data = await response.json();
        
        
        const mensagensFormatadas = data.map((msg: any) => {
          // IA = sem cod_usuario e flag IsIA = true
          if (msg.IsIa || msg.cod_usuario === 0) {
            return { usuario: "Tutor IA", mensagem: msg.conteudo };
          }

          // Usuário atual
          if (msg.cod_usuario === codUsuario) {
            return { usuario, mensagem: msg.conteudo };
          }

          // Outro usuário
          return { usuario: msg.usuario || "Desconhecido", mensagem: msg.conteudo };
        });


        setMessages(mensagensFormatadas);
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
      }
    };

    carregarMensagens();
  }, [codGrupo, codUsuario, usuario]);

  // ✅ Conectar ao SignalR
  useEffect(() => {
    const connect = async () => {
      const conn = new signalR.HubConnectionBuilder()
        .withUrl(`${apiUrl}/chatHub`)
        .withAutomaticReconnect()
        .configureLogging(signalR.LogLevel.Information)
        .build();

      conn.on("ReceberMensagem", (usuario, mensagem) => {
        setMessages((prev) => [...prev, { usuario, mensagem }]);
      });

      try {
        await conn.start();
        console.log("✅ Conectado ao SignalR");
        await conn.invoke("EntrarNoGrupo", codGrupo);
        setConnection(conn);
      } catch (err) {
        console.error("❌ Erro ao conectar SignalR:", err);
      }

      return () => conn.stop();
    };

    connect();
  }, [codGrupo]);

  // ✅ Enviar mensagem
  const sendMessage = async () => {
    if (connection && newMessage.trim()) {
      try {
        await connection.invoke("EnviarMensagem", codGrupo, usuario, newMessage, iaAtivada);
        setNewMessage("");
      } catch (err) {
        console.error("Erro ao enviar mensagem:", err);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="p-4 bg-blue-600 text-white text-center font-semibold text-lg shadow">
        Grupo #{codGrupo}
      </header>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-2">
        {messages.map((msg, i) => {
          // Determina a classe de cor e alinhamento dinamicamente
          const isUser = msg.usuario === usuario;
          const isIA = msg.usuario === "Tutor IA";

          return (
            <div
              key={i}
              className={`max-w-[75%] p-2 rounded-lg break-words ${isUser
                  ? "bg-blue-200 self-end text-right"
                  : isIA
                    ? "bg-green-200 self-start"
                    : "bg-gray-200 self-start"
                }`}
            >
              <strong className="block text-sm text-gray-700 mb-1">
                {msg.usuario}:
              </strong>
              <span className="text-gray-800 whitespace-pre-wrap break-words">{msg.mensagem}</span>
            </div>
          );
        })}
      </div>


      <div className="p-4 border-t flex gap-2 bg-white">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Enviar
        </button>
        <button
          onClick={() => setIaAtivada(!iaAtivada)}
          className={`px-4 py-2 rounded-lg font-semibold ${
            iaAtivada
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-300 hover:bg-gray-400"
          }`}
        >
          🤖 IA
        </button>
      </div>
    </div>
  );
}
