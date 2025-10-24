import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import {
  UserPlus,
  Check,
  X,
  Users,
  Search,
  MessageCircle,
  UserMinus,
  Clock,
  UserCheck,
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

interface Friend {
  id: number;
  name: string;
  avatar: string;
  role: string;
  mutualFriends?: number;
  image: string;
  status?: "pending" | "accepted" | "sent";
  since?: string;
}

const mockCurrentFriends: Friend[] = [
  {
    id: 101,
    name: "Ana Silva",
    avatar: "AS",
    role: "Engenheira de Software",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    status: "accepted",
    since: "Janeiro 2024",
  },
  {
    id: 102,
    name: "Pedro Costa",
    avatar: "PC",
    role: "Product Designer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    status: "accepted",
    since: "Fevereiro 2024",
  },
  {
    id: 103,
    name: "Julia Mendes",
    avatar: "JM",
    role: "Data Analyst",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    status: "accepted",
    since: "Março 2024",
  },
  {
    id: 104,
    name: "Roberto Lima",
    avatar: "RL",
    role: "DevOps Engineer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    status: "accepted",
    since: "Abril 2024",
  },
  {
    id: 105,
    name: "Mariana Souza",
    avatar: "MS",
    role: "UX Researcher",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    status: "accepted",
    since: "Maio 2024",
  },
  {
    id: 106,
    name: "Fernando Alves",
    avatar: "FA",
    role: "Tech Lead",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
    status: "accepted",
    since: "Junho 2024",
  },
];

const mockPendingRequests: Friend[] = [
  {
    id: 201,
    name: "Carolina Dias",
    avatar: "CD",
    role: "Frontend Developer",
    mutualFriends: 8,
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop",
    status: "pending",
  },
  {
    id: 202,
    name: "Thiago Santos",
    avatar: "TS",
    role: "Backend Developer",
    mutualFriends: 5,
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop",
    status: "pending",
  },
  {
    id: 203,
    name: "Isabela Rocha",
    avatar: "IR",
    role: "Product Manager",
    mutualFriends: 12,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
    status: "pending",
  },
];

const mockSentRequests: Friend[] = [
  {
    id: 301,
    name: "Gabriel Ferreira",
    avatar: "GF",
    role: "Mobile Developer",
    mutualFriends: 6,
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop",
    status: "sent",
  },
  {
    id: 302,
    name: "Amanda Oliveira",
    avatar: "AO",
    role: "Scrum Master",
    mutualFriends: 4,
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
    status: "sent",
  },
];

const mockSuggestions: Friend[] = [
  {
    id: 1,
    name: "Carlos Eduardo",
    avatar: "CE",
    role: "Desenvolvedor Backend",
    mutualFriends: 12,
    image:
      "https://images.unsplash.com/photo-1672685667592-0392f458f46f?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Beatriz Santos",
    avatar: "BS",
    role: "Data Scientist",
    mutualFriends: 8,
    image:
      "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    name: "Rafael Oliveira",
    avatar: "RO",
    role: "UI Designer",
    mutualFriends: 15,
    image:
      "https://images.unsplash.com/photo-1708195886023-3ecb00ac7a49?w=200&h=200&fit=crop",
  },
  {
    id: 4,
    name: "Juliana Costa",
    avatar: "JC",
    role: "Product Manager",
    mutualFriends: 6,
    image:
      "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=200&h=200&fit=crop&hue=80",
  },
  {
    id: 5,
    name: "Lucas Ferreira",
    avatar: "LF",
    role: "Full Stack Developer",
    mutualFriends: 10,
    image:
      "https://images.unsplash.com/photo-1672685667592-0392f458f46f?w=200&h=200&fit=crop&hue=120",
  },
  {
    id: 6,
    name: "Camila Rodrigues",
    avatar: "CR",
    role: "UX Researcher",
    mutualFriends: 9,
    image:
      "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=200&h=200&fit=crop&hue=200",
  },
];

export function FriendsManagement() {
  const [currentFriends, setCurrentFriends] = useState(mockCurrentFriends);
  const [pendingRequests, setPendingRequests] = useState(mockPendingRequests);
  const [sentRequests, setSentRequests] = useState(mockSentRequests);
  const [suggestions, setSuggestions] = useState(mockSuggestions);
  const [searchTerm, setSearchTerm] = useState("");
  const [friendToRemove, setFriendToRemove] = useState<Friend | null>(null);

  // Aceitar solicitação
  const handleAcceptRequest = (friend: Friend) => {
    setPendingRequests(pendingRequests.filter((f) => f.id !== friend.id));
    setCurrentFriends([
      ...currentFriends,
      { ...friend, status: "accepted", since: "Agora" },
    ]);
    toast.success(`Você e ${friend.name} agora são amigos! 🎉`);
  };

  // Rejeitar solicitação
  const handleRejectRequest = (friendId: number) => {
    const friend = pendingRequests.find((f) => f.id === friendId);
    setPendingRequests(pendingRequests.filter((f) => f.id !== friendId));
    toast.info(`Solicitação de ${friend?.name} rejeitada`);
  };

  // Cancelar solicitação enviada
  const handleCancelRequest = (friendId: number) => {
    const friend = sentRequests.find((f) => f.id === friendId);
    setSentRequests(sentRequests.filter((f) => f.id !== friendId));
    toast.info(`Solicitação para ${friend?.name} cancelada`);
  };

  // Enviar solicitação
  const handleSendRequest = (friend: Friend) => {
    setSuggestions(suggestions.filter((f) => f.id !== friend.id));
    setSentRequests([...sentRequests, { ...friend, status: "sent" }]);
    toast.success(`Solicitação enviada para ${friend.name}! ✨`);
  };

  // Remover sugestão
  const handleRemoveSuggestion = (friendId: number) => {
    setSuggestions(suggestions.filter((f) => f.id !== friendId));
  };

  // Remover amigo
  const handleRemoveFriend = () => {
    if (friendToRemove) {
      setCurrentFriends(currentFriends.filter((f) => f.id !== friendToRemove.id));
      toast.success(`${friendToRemove.name} foi removido dos seus amigos`);
      setFriendToRemove(null);
    }
  };

  // Filtrar amigos
  const filteredFriends = currentFriends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Amizades</h2>
        <p className="text-muted-foreground">
          Gerencie seus amigos e solicitações de amizade
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg p-4 border hover:shadow-blue transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{currentFriends.length}</p>
              <p className="text-xs text-muted-foreground">Amigos</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg p-4 border hover:shadow-purple transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pendingRequests.length}</p>
              <p className="text-xs text-muted-foreground">Pendentes</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg p-4 border hover:shadow-blue transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <UserCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{sentRequests.length}</p>
              <p className="text-xs text-muted-foreground">Enviadas</p>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-lg p-4 border hover:shadow-purple transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <UserPlus className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{suggestions.length}</p>
              <p className="text-xs text-muted-foreground">Sugestões</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="friends" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="friends" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Amigos</span>
            <Badge variant="secondary" className="ml-1">
              {currentFriends.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Pendentes</span>
            {pendingRequests.length > 0 && (
              <Badge className="ml-1 bg-red-500">{pendingRequests.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="sent" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Enviadas</span>
            {sentRequests.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {sentRequests.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="suggestions" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Sugestões</span>
            {suggestions.length > 0 && (
              <Badge variant="secondary" className="ml-1">
                {suggestions.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Amigos Atuais */}
        <TabsContent value="friends" className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar amigos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Friends List */}
          {filteredFriends.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="bg-card rounded-lg border p-4 hover:shadow-blue transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{friend.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {friend.role}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Amigos desde {friend.since}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Mensagem
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setFriendToRemove(friend)}
                    >
                      <UserMinus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-lg p-12 text-center border">
              <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-semibold mb-2 text-muted-foreground">
                {searchTerm ? "Nenhum amigo encontrado" : "Nenhum amigo ainda"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchTerm
                  ? "Tente buscar com outro termo"
                  : "Comece adicionando pessoas das sugestões!"}
              </p>
              {!searchTerm && (
                <Button onClick={() => document.querySelector('[value="suggestions"]')?.click()}>
                  Ver Sugestões
                </Button>
              )}
            </div>
          )}
        </TabsContent>

        {/* Solicitações Pendentes */}
        <TabsContent value="pending" className="space-y-4">
          {pendingRequests.length > 0 ? (
            <div className="space-y-3">
              {pendingRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-card rounded-lg border p-4 hover:shadow-purple transition-all"
                >
                  <div className="flex items-center gap-3">
                   
                    <div className="flex-1">
                      <h3 className="font-semibold">{request.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {request.role}
                      </p>
                      {request.mutualFriends && (
                        <div className="flex items-center gap-1 mt-1">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {request.mutualFriends} em comum
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-gradient-blue-purple hover:bg-gradient-purple-blue"
                        onClick={() => handleAcceptRequest(request)}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Aceitar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRejectRequest(request.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-lg p-12 text-center border">
              <Clock className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-semibold mb-2 text-muted-foreground">
                Nenhuma solicitação pendente
              </h3>
              <p className="text-sm text-muted-foreground">
                Você não tem solicitações de amizade no momento
              </p>
            </div>
          )}
        </TabsContent>

        {/* Solicitações Enviadas */}
        <TabsContent value="sent" className="space-y-4">
          {sentRequests.length > 0 ? (
            <div className="space-y-3">
              {sentRequests.map((request) => (
                <div
                  key={request.id}
                  className="bg-card rounded-lg border p-4 hover:shadow-blue transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold">{request.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {request.role}
                      </p>
                      {request.mutualFriends && (
                        <div className="flex items-center gap-1 mt-1">
                          <Users className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {request.mutualFriends} em comum
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Aguardando
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCancelRequest(request.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-lg p-12 text-center border">
              <UserCheck className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-semibold mb-2 text-muted-foreground">
                Nenhuma solicitação enviada
              </h3>
              <p className="text-sm text-muted-foreground">
                Você não enviou solicitações de amizade recentemente
              </p>
            </div>
          )}
        </TabsContent>

        {/* Sugestões */}
        <TabsContent value="suggestions" className="space-y-4">
          {suggestions.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestions.map((friend) => (
                <div
                  key={friend.id}
                  className="bg-card rounded-lg border hover:shadow-blue transition-all relative overflow-hidden"
                >
                  {/* Header Gradiente */}
                  <div className="h-20 bg-gradient-to-br from-blue-500 to-purple-500" />

                  {/* Conteúdo */}
                  <div className="relative text-center p-6 pt-0">
                    {/* Avatar */}
                    <div className="-mt-12 mb-4">
                    </div>

                    {/* Info */}
                    <h3 className="font-semibold mb-1">{friend.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {friend.role}
                    </p>

                    {/* Badge */}
                    <div className="flex justify-center mb-4">
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <Users className="h-3 w-3" />
                        {friend.mutualFriends} em comum
                      </Badge>
                    </div>

                    {/* Botões */}
                    <div className="flex gap-2">
                      <Button
                        className="flex-1 bg-gradient-blue-purple hover:bg-gradient-purple-blue"
                        onClick={() => handleSendRequest(friend)}
                      >
                        <UserPlus className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveSuggestion(friend.id)}
                        title="Remover sugestão"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card rounded-lg p-12 text-center border">
              <UserPlus className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-semibold mb-2 text-muted-foreground">
                Sem mais sugestões
              </h3>
              <p className="text-sm text-muted-foreground">
                Você revisou todas as sugestões de amizade disponíveis!
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Alert Dialog para remover amigo */}
      <AlertDialog
        open={!!friendToRemove}
        onOpenChange={() => setFriendToRemove(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover amigo</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja remover {friendToRemove?.name} dos seus
              amigos? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemoveFriend}
              className="bg-destructive hover:bg-destructive/90"
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
