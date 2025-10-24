import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserPlus, Check, X, Users } from "lucide-react";
import { toast } from "sonner";

interface Friend {
  id: number;
  name: string;
  avatar: string;
  role: string;
  mutualFriends: number;
  image: string;
  added: boolean;
}

const mockFriendSuggestions: Friend[] = [
  {
    id: 1,
    name: "Carlos Eduardo",
    avatar: "CE",
    role: "Desenvolvedor Backend",
    mutualFriends: 12,
    image:
      "https://images.unsplash.com/photo-1672685667592-0392f458f46f?w=200&h=200&fit=crop",
    added: false,
  },
  {
    id: 2,
    name: "Beatriz Santos",
    avatar: "BS",
    role: "Data Scientist",
    mutualFriends: 8,
    image:
      "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=200&h=200&fit=crop",
    added: false,
  },
  {
    id: 3,
    name: "Rafael Oliveira",
    avatar: "RO",
    role: "UI Designer",
    mutualFriends: 15,
    image:
      "https://images.unsplash.com/photo-1708195886023-3ecb00ac7a49?w=200&h=200&fit=crop",
    added: false,
  },
  {
    id: 4,
    name: "Juliana Costa",
    avatar: "JC",
    role: "Product Manager",
    mutualFriends: 6,
    image:
      "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=200&h=200&fit=crop&hue=80",
    added: false,
  },
  {
    id: 5,
    name: "Lucas Ferreira",
    avatar: "LF",
    role: "Full Stack Developer",
    mutualFriends: 10,
    image:
      "https://images.unsplash.com/photo-1672685667592-0392f458f46f?w=200&h=200&fit=crop&hue=120",
    added: false,
  },
  {
    id: 6,
    name: "Camila Rodrigues",
    avatar: "CR",
    role: "UX Researcher",
    mutualFriends: 9,
    image:
      "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=200&h=200&fit=crop&hue=200",
    added: false,
  },
  {
    id: 7,
    name: "André Silva",
    avatar: "AS",
    role: "Engenheiro de ML",
    mutualFriends: 14,
    image:
      "https://images.unsplash.com/photo-1708195886023-3ecb00ac7a49?w=200&h=200&fit=crop&hue=60",
    added: false,
  },
  {
    id: 8,
    name: "Mariana Lima",
    avatar: "ML",
    role: "Scrum Master",
    mutualFriends: 7,
    image:
      "https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=200&h=200&fit=crop&hue=320",
    added: false,
  },
  {
    id: 9,
    name: "Felipe Martins",
    avatar: "FM",
    role: "DevOps Engineer",
    mutualFriends: 11,
    image:
      "https://images.unsplash.com/photo-1672685667592-0392f458f46f?w=200&h=200&fit=crop&hue=240",
    added: false,
  },
];

export function FriendSuggestions() {
  const [friends, setFriends] = useState(mockFriendSuggestions);

  const handleAddFriend = (friendId: number) => {
    setFriends(
      friends.map((f) => (f.id === friendId ? { ...f, added: true } : f))
    );
    const friend = friends.find((f) => f.id === friendId);
    if (friend) {
      toast.success(`Solicitação de amizade enviada para ${friend.name}! ✨`);
    }
  };

  const handleRemoveSuggestion = (friendId: number) => {
    setFriends(friends.filter((f) => f.id !== friendId));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Sugestões de Amizade</h2>
        <p className="text-muted-foreground">
          Conecte-se com pessoas que compartilham seus interesses
        </p>
      </div>

      {/* Friends Grid */}
      {friends.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className={`bg-card rounded-lg border hover:shadow-blue transition-all relative overflow-hidden ${
                friend.added ? "opacity-75" : ""
              }`}
            >
              {/* Header Gradiente */}
              <div className="h-20 bg-gradient-to-br from-blue-500 to-purple-500" />

              {/* Conteúdo */}
              <div className="relative text-center p-6 pt-0">
                {/* Avatar */}
                <div className="-mt-12 mb-4">
                  <Avatar className="h-24 w-24 mx-auto border-4 border-background shadow-xl">
                    <AvatarImage src={friend.image} alt={friend.name} />
                    <AvatarFallback className="bg-gradient-blue-purple text-white text-2xl font-bold">
                      {friend.avatar}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Info */}
                <h3 className="font-semibold mb-1">{friend.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {friend.role}
                </p>

                {/* Badge */}
                <div className="flex justify-center mb-4">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {friend.mutualFriends} em comum
                  </Badge>
                </div>

                {/* Botões */}
                <div className="flex gap-2">
                  <Button
                    className={`flex-1 ${
                      friend.added
                        ? "bg-secondary hover:bg-secondary"
                        : "bg-gradient-blue-purple hover:bg-gradient-purple-blue"
                    }`}
                    onClick={() => handleAddFriend(friend.id)}
                    disabled={friend.added}
                  >
                    {friend.added ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Solicitação Enviada
                      </>
                    ) : (
                      <>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Adicionar
                      </>
                    )}
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
          <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="font-semibold mb-2 text-muted-foreground">
            Sem mais sugestões
          </h3>
          <p className="text-sm text-muted-foreground">
            Você revisou todas as sugestões de amizade disponíveis!
          </p>
        </div>
      )}
    </div>
  );
}
