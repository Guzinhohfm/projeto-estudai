import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { useMobile } from './ui/use-mobile';
import { Camera, MapPin, Calendar, BookOpen, Trophy, Users, Settings, Edit2, Share2, MessageCircle, Heart } from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  coverImage: string;
  bio: string;
  course: string;
  semester: string;
  university: string;
  location: string;
  joinDate: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
    studyGroups: number;
    achievements: number;
  };
  interests: string[];
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    date: string;
    icon: string;
  }>;
  recentActivity: Array<{
    id: string;
    type: 'post' | 'achievement' | 'group_join';
    content: string;
    date: string;
  }>;
}

export function UserProfile() {
  const isMobile = useMobile();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    name: 'João Silva',
    username: 'joao_dev',
    email: 'joao@exemplo.com',
    avatar: 'https://images.unsplash.com/photo-1600178572204-6ac8886aae63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTg0MzI4NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    coverImage: 'https://images.unsplash.com/photo-1732115234692-3ee71d5363af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTg0MzI4NzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    bio: 'Estudante de Ciência da Computação apaixonado por tecnologia e inovação. Sempre em busca de novos desafios e oportunidades de aprendizado! 🚀',
    course: 'Ciência da Computação',
    semester: '6º semestre',
    university: 'Universidade Federal do Rio de Janeiro',
    location: 'Rio de Janeiro, RJ',
    joinDate: '2023-03-15',
    stats: {
      posts: 42,
      followers: 156,
      following: 89,
      studyGroups: 5,
      achievements: 8
    },
    interests: ['JavaScript', 'React', 'Python', 'Machine Learning', 'UI/UX Design'],
    achievements: [
      {
        id: '1',
        title: 'Primeiro Post',
        description: 'Publicou seu primeiro post na timeline',
        date: '2023-03-16',
        icon: '🎉'
      },
      {
        id: '2',
        title: 'Participativo',
        description: 'Entrou em 5 grupos de estudo',
        date: '2023-04-10',
        icon: '👥'
      },
      {
        id: '3',
        title: 'Mentor',
        description: 'Ajudou 10+ estudantes com dúvidas',
        date: '2023-05-22',
        icon: '🎓'
      },
      {
        id: '4',
        title: 'Streak 30 dias',
        description: 'Ativo na plataforma por 30 dias consecutivos',
        date: '2023-06-01',
        icon: '🔥'
      }
    ],
    recentActivity: [
      {
        id: '1',
        type: 'post',
        content: 'Compartilhou um projeto de React Native',
        date: '2024-01-20'
      },
      {
        id: '2',
        type: 'achievement',
        content: 'Conquistou o badge "Mentor"',
        date: '2024-01-18'
      },
      {
        id: '3',
        type: 'group_join',
        content: 'Entrou no grupo "JavaScript Avançado"',
        date: '2024-01-15'
      }
    ]
  });

  const [editForm, setEditForm] = useState(profile);

  const handleSaveProfile = () => {
    setProfile(editForm);
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'post': return '📝';
      case 'achievement': return '🏆';
      case 'group_join': return '👥';
      default: return '📍';
    }
  };

  return (
    <div className={`${isMobile ? 'space-y-4' : 'max-w-4xl mx-auto space-y-6'}`}>
      {/* Cover Photo and Profile Info */}
      <Card className="overflow-hidden">
        <div className="relative">
          {/* Cover Image */}
          <div 
            className={`${isMobile ? 'h-32' : 'h-48'} bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-cover bg-center relative`}
            style={{ backgroundImage: `url(${profile.coverImage})` }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
            <div className={`absolute ${isMobile ? 'top-2 right-2' : 'top-4 right-4'}`}>
              <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogTrigger asChild>
                  <Button variant="secondary" size={isMobile ? "sm" : "sm"}>
                    <Settings className={`h-4 w-4 ${isMobile ? '' : 'mr-2'}`} />
                    {!isMobile && "Editar Perfil"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Editar Perfil</DialogTitle>
                    <DialogDescription>
                      Atualize suas informações pessoais e acadêmicas
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                          id="name"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Nome de Usuário</Label>
                        <Input
                          id="username"
                          value={editForm.username}
                          onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Biografia</Label>
                      <Textarea
                        id="bio"
                        value={editForm.bio}
                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="course">Curso</Label>
                        <Input
                          id="course"
                          value={editForm.course}
                          onChange={(e) => setEditForm({ ...editForm, course: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="semester">Semestre</Label>
                        <Select value={editForm.semester} onValueChange={(value) => setEditForm({ ...editForm, semester: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1,2,3,4,5,6,7,8,9,10].map((sem) => (
                              <SelectItem key={sem} value={`${sem}º semestre`}>{sem}º semestre</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="university">Universidade</Label>
                        <Input
                          id="university"
                          value={editForm.university}
                          onChange={(e) => setEditForm({ ...editForm, university: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Localização</Label>
                        <Input
                          id="location"
                          value={editForm.location}
                          onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="interests">Interesses (separados por vírgula)</Label>
                      <Input
                        id="interests"
                        value={editForm.interests.join(', ')}
                        onChange={(e) => setEditForm({ ...editForm, interests: e.target.value.split(',').map(i => i.trim()) })}
                      />
                    </div>

                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleSaveProfile}>
                        Salvar Alterações
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Profile Info */}
          <div className={`${isMobile ? 'p-4' : 'p-6'}`}>
            <div className={`flex flex-col items-start gap-4 ${isMobile ? '-mt-8' : '-mt-16'} relative`}>
              
              <div className={`w-full ${isMobile ? 'pt-2' : 'pt-16 sm:pt-0'}`}>
                <div className="flex flex-col gap-4">
                  <div>
                    <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold`}>{profile.name}</h1>
                    <p className="text-muted-foreground">@{profile.username}</p>
                    <div className={`flex items-center gap-2 mt-2 text-sm text-muted-foreground ${isMobile ? 'flex-col items-start' : 'gap-4'}`}>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {profile.course}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {profile.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Desde {formatDate(profile.joinDate)}
                      </div>
                    </div>
                  </div>
                  
                  {!isMobile && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Mensagem
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Compartilhar
                      </Button>
                    </div>
                  )}
                </div>

                <p className={`mt-4 ${isMobile ? 'text-sm' : 'text-sm'} leading-relaxed`}>{profile.bio}</p>

                {/* Badges and Interests */}
                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary">{profile.semester}</Badge>
                    <Badge variant="outline" className={`${isMobile ? 'text-xs' : ''}`}>{profile.university}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {profile.interests.map((interest, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        #{interest}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Mobile Action Buttons */}
                {isMobile && (
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Mensagem
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="h-4 w-4 mr-2" />
                      Compartilhar
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className={`grid ${isMobile ? 'grid-cols-3' : 'grid-cols-2 sm:grid-cols-5'} gap-4`}>
        <Card className="text-center">
          <CardContent className={`${isMobile ? 'p-3' : 'p-4'}`}>
            <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold`}>{profile.stats.posts}</div>
            <div className="text-xs text-muted-foreground">Posts</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className={`${isMobile ? 'p-3' : 'p-4'}`}>
            <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold`}>{profile.stats.followers}</div>
            <div className="text-xs text-muted-foreground">Seguidores</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className={`${isMobile ? 'p-3' : 'p-4'}`}>
            <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold`}>{profile.stats.following}</div>
            <div className="text-xs text-muted-foreground">Seguindo</div>
          </CardContent>
        </Card>
        {!isMobile && (
          <>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{profile.stats.studyGroups}</div>
                <div className="text-sm text-muted-foreground">Grupos</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold">{profile.stats.achievements}</div>
                <div className="text-sm text-muted-foreground">Conquistas</div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'md:grid-cols-3 gap-6'}`}>
        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-base' : ''}`}>
              <Trophy className="h-5 w-5" />
              {isMobile ? "Conquistas" : "Conquistas Recentes"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.achievements.slice(0, isMobile ? 2 : 3).map((achievement) => (
              <div key={achievement.id} className="flex items-start gap-3">
                <div className={`${isMobile ? 'text-xl' : 'text-2xl'}`}>{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className={`font-medium ${isMobile ? 'text-sm' : ''}`}>{achievement.title}</h4>
                  <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>{achievement.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{formatDate(achievement.date)}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" size="sm">
              {isMobile ? "Ver Todas" : "Ver Todas as Conquistas"}
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-base' : ''}`}>
              <Heart className="h-5 w-5" />
              {isMobile ? "Atividade" : "Atividade Recente"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {profile.recentActivity.slice(0, isMobile ? 2 : 3).map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`${isMobile ? 'text-base' : 'text-lg'}`}>{getActivityIcon(activity.type)}</div>
                <div className="flex-1">
                  <p className={`${isMobile ? 'text-xs' : 'text-sm'}`}>{activity.content}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(activity.date)}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" size="sm">
              {isMobile ? "Ver Histórico" : "Ver Histórico Completo"}
            </Button>
          </CardContent>
        </Card>

        {/* Study Groups */}
        <Card>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-base' : ''}`}>
              <Users className="h-5 w-5" />
              {isMobile ? "Grupos" : "Grupos de Estudo"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
              <div className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold`}>
                JS
              </div>
              <div className="flex-1">
                <p className={`font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>JavaScript Avançado</p>
                <p className="text-xs text-muted-foreground">15 membros</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
              <div className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold`}>
                PY
              </div>
              <div className="flex-1">
                <p className={`font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>Python para IA</p>
                <p className="text-xs text-muted-foreground">22 membros</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
              <div className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold`}>
                UX
              </div>
              <div className="flex-1">
                <p className={`font-medium ${isMobile ? 'text-xs' : 'text-sm'}`}>UX/UI Design</p>
                <p className="text-xs text-muted-foreground">8 membros</p>
              </div>
            </div>
            <Button variant="outline" className="w-full" size="sm">
              {isMobile ? "Ver Todos" : "Ver Todos os Grupos"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}