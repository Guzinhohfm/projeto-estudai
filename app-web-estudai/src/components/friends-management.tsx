import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import {
  UserPlus,
  Check,
  X,
  Users,
  MessageCircle,
  UserMinus,
  Clock,
  UserCheck,
  PlusCircle,
} from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Badge } from "./ui/badge";

interface Friend {
  cod_conexao?: number;
  cod_usuario?: number;
  cod_usuario2?: number;
  nome?: string;
  email?: string;
  role?: string;
  status?: "P" | "A" | "R";
  data_conexao?: string;
}

export function FriendsManagement() {
  const apiUrl = "http://localhost:8080/api/Amizade";
  const token = localStorage.getItem("jwtToken");
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const codUsuario = payload?.id_usuario;

  const [friends, setFriends] = useState<Friend[]>([]);
  const [pendentes, setPendentes] = useState<Friend[]>([]);
  const [enviadas, setEnviadas] = useState<Friend[]>([]);
  const [sugestoes, setSugestoes] = useState<Friend[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [friendToRemove, setFriendToRemove] = useState<Friend | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [novoAmigoNome, setNovoAmigoNome] = useState(""); // ✅ nome ao invés de e-mail

  // 🔹 Carregar dados iniciais
  const carregarDados = async () => {
    try {
      const [amigosRes, pendentesRes, enviadasRes] = await Promise.all([
        axios.get(`${apiUrl}/amigos/${codUsuario}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${apiUrl}/pendentes/${codUsuario}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${apiUrl}/enviadas/${codUsuario}`, {
        headers: { Authorization: `Bearer ${token}` },
        }),
      ]);


      const normalizar = (dados: any[]) =>
      dados.map((a) => ({
        cod_conexao: a.cod_conexao ?? a.Cod_conexao,
        cod_usuario: a.cod_usuario ?? a.Cod_usuario,
        cod_usuario2: a.cod_usuario2 ?? a.Cod_usuario2,
        status: a.status ?? a.Status,
        data_conexao: a.data_conexao ?? a.Data_conexao,
        nome: a.nome ?? a.Nome,
        email: a.email ?? a.Email,
      }));


     setFriends(normalizar(amigosRes.data));
     setPendentes(normalizar(pendentesRes.data));
      setEnviadas(normalizar(enviadasRes.data));

      // mock sugestões apenas visuais
      setSugestoes([
        { cod_usuario2: 99, nome: "Carlos Eduardo", email: "carlos@dev.com" },
        { cod_usuario2: 100, nome: "Beatriz Souza", email: "bia@data.com" },
      ]);
    } catch (error) {
      console.error("Erro ao carregar conexões:", error);
      toast.error("Erro ao carregar amizades.");
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleCancelRequest = async (codConexao: number) => {
  try {
    await axios.delete(`${apiUrl}/remover/${codConexao}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    toast.info("Solicitação cancelada.");
    carregarDados();
  } catch {
    toast.error("Erro ao cancelar solicitação.");
  }
    };

  // 🔹 Enviar solicitação por nome
  const handleAdicionarAmigo = async () => {
    if (!novoAmigoNome.trim()) {
      toast.warning("Informe o nome do usuário!");
      return;
    }

    try {
      await axios.post(
        `${apiUrl}/solicitar`,
        {
          codUsuario,
          nomeUsuario: novoAmigoNome, // ✅ envia nome ao backend
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`Solicitação enviada para ${novoAmigoNome}!`);
      setShowAddModal(false);
      setNovoAmigoNome("");
      carregarDados();
    } catch (error: any) {
      console.error(error);
      toast.error(
        error.response?.data?.erro ||
          "Não foi possível enviar a solicitação de amizade."
      );
    }
  };

  // 🔹 Aceitar solicitação
  const handleAcceptRequest = async (conexaoId: number) => {
    try {
      await axios.post(`${apiUrl}/aceitar/${conexaoId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Amizade aceita!");
      carregarDados();
    } catch {
      toast.error("Erro ao aceitar solicitação.");
    }
  };

  // 🔹 Recusar solicitação
  const handleRejectRequest = async (conexaoId: number) => {
    try {
      await axios.post(`${apiUrl}/recusar/${conexaoId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.info("Solicitação recusada.");
      carregarDados();
    } catch {
      toast.error("Erro ao recusar solicitação.");
    }
  };

  // 🔹 Remover amizade
  const handleRemoveFriend = async () => {
    if (!friendToRemove?.cod_conexao) return;
    try {
      await axios.delete(`${apiUrl}/remover/${friendToRemove.cod_conexao}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`${friendToRemove.nome} foi removido.`);
      setFriendToRemove(null);
      carregarDados();
    } catch {
      toast.error("Erro ao remover amizade.");
    }
  };

  // 🔍 Filtro
  const filteredFriends = friends.filter((f) =>
    f.nome?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-1">Amizades</h2>
          <p className="text-muted-foreground">
            Gerencie seus amigos e solicitações
          </p>
        </div>

        {/* 🔹 Botão “Adicionar Amigo” */}
        <Button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          <PlusCircle className="h-4 w-4" />
          Adicionar Amigo
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="friends">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="friends">Amigos</TabsTrigger>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="sent">Enviadas</TabsTrigger>
        </TabsList>

        {/* Amigos */}
        <TabsContent value="friends">
          <Input
            placeholder="Buscar amigo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          {filteredFriends.length === 0 ? (
            <p className="text-muted-foreground text-center py-6">
              Nenhum amigo encontrado
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFriends.map((f) => (
                <div
                  key={f.cod_conexao}
                  className="p-4 border rounded-lg hover:shadow-md transition"
                >
                  <h3 className="font-semibold">{f.nome}</h3>
                  <p className="text-sm text-gray-500">{f.email}</p>
                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setFriendToRemove(f)}
                    >
                      <UserMinus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Pendentes */}
        <TabsContent value="pending">
          {pendentes.length === 0 ? (
            <p className="text-muted-foreground text-center py-6">
              Nenhuma solicitação pendente
            </p>
          ) : (
            pendentes.map((p) => (
              <div
                key={p.cod_conexao}
                className="flex justify-between border p-3 rounded-lg mb-2"
              >
                <div>
                  <h3 className="font-semibold">{p.nome}</h3>
                  <p className="text-sm text-gray-500">{p.email}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleAcceptRequest(p.cod_conexao!)}
                  >
                    <Check className="h-4 w-4 mr-1" /> Aceitar
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRejectRequest(p.cod_conexao!)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </TabsContent>

        <TabsContent value="sent">
          {enviadas.length === 0 ? (
            <p className="text-muted-foreground text-center py-6">
              Nenhuma solicitação enviada
            </p>
          ) : (
            enviadas.map((e) => (
              <div
                key={e.cod_conexao}
                className="flex justify-between border p-3 rounded-lg mb-2"
              >
                <div>
                  <h3 className="font-semibold">{e.nome}</h3>
                  <p className="text-sm text-gray-500">{e.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Aguardando</Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCancelRequest(e.cod_conexao!)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>

       


      {/* 🔹 Modal para adicionar amigo */}
      <AlertDialog open={showAddModal} onOpenChange={setShowAddModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Adicionar novo amigo</AlertDialogTitle>
            <AlertDialogDescription>
              Insira o <strong>nome</strong> do usuário que deseja adicionar como amigo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input
            placeholder="Nome do usuário"
            value={novoAmigoNome}
            onChange={(e) => setNovoAmigoNome(e.target.value)}
            className="mt-3"
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleAdicionarAmigo}>
              Enviar Solicitação
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirmar remoção */}
      <AlertDialog
        open={!!friendToRemove}
        onOpenChange={() => setFriendToRemove(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover amigo</AlertDialogTitle>
            <AlertDialogDescription>
              Deseja remover {friendToRemove?.nome}? Essa ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleRemoveFriend}>
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
