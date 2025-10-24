import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { useMobile } from './ui/use-mobile';
import { Search, Send, Smile, Paperclip, MoreVertical, Phone, Video, Info } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  timestamp: string;
  senderId: string;
  senderName: string;
  isRead: boolean;
}

interface Conversation {
  id: string;
  participant: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    online: boolean;
    lastSeen?: string;
  };
  lastMessage: {
    content: string;
    timestamp: string;
    senderId: string;
  };
  unreadCount: number;
  messages: Message[];
}

export function DirectMessages() {
  const isMobile = useMobile();
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      participant: {
        id: '2',
        name: 'Ana Silva',
        username: 'ana_silva',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
        online: true
      },
      lastMessage: {
        content: 'Oi! Pode me ajudar com o projeto de ML?',
        timestamp: '2024-09-15T14:30:00Z',
        senderId: '2'
      },
      unreadCount: 2,
      messages: [
        {
          id: '1',
          content: 'Oi! Tudo bem?',
          timestamp: '2024-09-15T14:00:00Z',
          senderId: '2',
          senderName: 'Ana Silva',
          isRead: true
        },
        {
          id: '2',
          content: 'Oi Ana! Tudo ótimo, e você?',
          timestamp: '2024-09-15T14:05:00Z',
          senderId: 'current-user',
          senderName: 'Você',
          isRead: true
        },
        {
          id: '3',
          content: 'Pode me ajudar com o projeto de ML?',
          timestamp: '2024-09-15T14:30:00Z',
          senderId: '2',
          senderName: 'Ana Silva',
          isRead: false
        }
      ]
    },
    {
      id: '2',
      participant: {
        id: '3',
        name: 'Carlos Mendes',
        username: 'carlos_dev',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        online: false,
        lastSeen: '2024-09-15T12:00:00Z'
      },
      lastMessage: {
        content: 'Valeu pela ajuda com as estruturas!',
        timestamp: '2024-09-15T12:30:00Z',
        senderId: '3'
      },
      unreadCount: 0,
      messages: [
        {
          id: '1',
          content: 'Conseguiu resolver o problema das árvores AVL?',
          timestamp: '2024-09-15T12:00:00Z',
          senderId: 'current-user',
          senderName: 'Você',
          isRead: true
        },
        {
          id: '2',
          content: 'Sim! Valeu pela ajuda com as estruturas!',
          timestamp: '2024-09-15T12:30:00Z',
          senderId: '3',
          senderName: 'Carlos Mendes',
          isRead: true
        }
      ]
    },
    {
      id: '3',
      participant: {
        id: '4',
        name: 'Mariana Costa',
        username: 'mari_design',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
        online: true
      },
      lastMessage: {
        content: 'O grupo de UX/UI está indo bem!',
        timestamp: '2024-09-15T11:15:00Z',
        senderId: '4'
      },
      unreadCount: 0,
      messages: [
        {
          id: '1',
          content: 'Como está o novo grupo de estudos?',
          timestamp: '2024-09-15T11:00:00Z',
          senderId: 'current-user',
          senderName: 'Você',
          isRead: true
        },
        {
          id: '2',
          content: 'O grupo de UX/UI está indo bem!',
          timestamp: '2024-09-15T11:15:00Z',
          senderId: '4',
          senderName: 'Mariana Costa',
          isRead: true
        }
      ]
    }
  ]);

  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h`;
    } else if (diffInMinutes < 10080) {
      return `${Math.floor(diffInMinutes / 1440)}d`;
    } else {
      return date.toLocaleDateString('pt-BR');
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      content: newMessage,
      timestamp: new Date().toISOString(),
      senderId: 'current-user',
      senderName: 'Você',
      isRead: true
    };

    setConversations(convs => 
      convs.map(conv => 
        conv.id === selectedConversation
          ? {
              ...conv,
              messages: [...conv.messages, newMsg],
              lastMessage: {
                content: newMessage,
                timestamp: newMsg.timestamp,
                senderId: 'current-user'
              }
            }
          : conv
      )
    );

    setNewMessage('');
  };

  const currentConversation = conversations.find(conv => conv.id === selectedConversation);
  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.participant.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isMobile && selectedConversation) {
    // Mobile: Show only conversation view
    return (
      <div className="h-full flex flex-col">
        {/* Mobile Header */}
        <div className="flex items-center gap-3 p-4 border-b bg-background">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSelectedConversation(null)}
          >
            ←
          </Button>
          {currentConversation && (
            <>
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentConversation.participant.avatar} />
                <AvatarFallback>
                  {currentConversation.participant.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium text-sm">{currentConversation.participant.name}</p>
                <p className="text-xs text-muted-foreground">
                  {currentConversation.participant.online ? 'Online' : `Visto ${formatTime(currentConversation.participant.lastSeen || '')}`}
                </p>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {currentConversation?.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-lg ${
                    message.senderId === 'current-user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 opacity-70`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t bg-background">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Paperclip className="h-4 w-4" />
            </Button>
            <div className="flex-1 relative">
              <Input
                placeholder="Escreva uma mensagem..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="pr-10"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2"
              >
                <Smile className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              onClick={handleSendMessage} 
              disabled={!newMessage.trim()}
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex">
      {/* Conversations List */}
      <div className={`${isMobile ? 'w-full' : 'w-80'} border-r flex flex-col`}>
        <div className="p-4 border-b">
          <h2 className="font-semibold mb-3">Mensagens</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar conversas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="divide-y">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                  selectedConversation === conversation.id ? 'bg-muted' : ''
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conversation.participant.avatar} />
                      <AvatarFallback>
                        {conversation.participant.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {conversation.participant.online && (
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{conversation.participant.name}</p>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(conversation.lastMessage.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.lastMessage.senderId === 'current-user' ? 'Você: ' : ''}
                      {conversation.lastMessage.content}
                    </p>
                  </div>
                  
                  {conversation.unreadCount > 0 && (
                    <Badge className="h-5 w-5 p-0 flex items-center justify-center bg-primary text-primary-foreground">
                      {conversation.unreadCount}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Conversation View */}
      {!isMobile && (
        <div className="flex-1 flex flex-col">
          {selectedConversation && currentConversation ? (
            <>
              {/* Conversation Header */}
              <div className="flex items-center gap-3 p-4 border-b bg-background">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={currentConversation.participant.avatar} />
                  <AvatarFallback>
                    {currentConversation.participant.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{currentConversation.participant.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {currentConversation.participant.online ? 'Online' : `Visto ${formatTime(currentConversation.participant.lastSeen || '')}`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {currentConversation.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${
                          message.senderId === 'current-user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className={`text-xs mt-1 opacity-70`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t bg-background">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Escreva uma mensagem..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="pr-12"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2"
                    >
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <p className="text-lg font-medium">Selecione uma conversa</p>
                <p className="text-sm">Escolha uma conversa para começar a trocar mensagens</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}