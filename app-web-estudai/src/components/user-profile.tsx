import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Users, BookOpen, GraduationCap, Mail, Calendar } from "lucide-react";
import { toast } from "sonner";

interface Usuario {
  cod_usuario: number;
  nome: string;
  email: string;
  curso?: string;
  data_nascimento?: string;
}

interface Grupo {
  cod_grupo: number;
  nome: string;
  descricao: string;
  data_criacao: string;
}

export function UserProfile() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [amizades, setAmizades] = useState<number>(0);

  const token = localStorage.getItem("jwtToken");
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const codUsuario = payload?.id_usuario;

  const apiUrl = "http://localhost:8080/api";

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    try {
      const [usuarioRes, gruposRes, amigosRes] = await Promise.all([
        axios.get(`${apiUrl}/Usuario/${codUsuario}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${apiUrl}/UsuarioGrupo/listar/${codUsuario}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${apiUrl}/Amizade/amigos/${codUsuario}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setUsuario(usuarioRes.data);
      setGrupos(gruposRes.data);
      setAmizades(amigosRes.data.length);
    } catch (error) {
      console.error("Erro ao carregar perfil:", error);
      toast.error("Erro ao carregar perfil do usuário.");
    }
  };

  if (!usuario) {
    return <p className="text-center text-gray-500 mt-10">Carregando perfil...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 mt-8">
      {/* Cabeçalho do perfil */}
      <Card className="shadow-md">
        <CardHeader className="flex items-center justify-between border-b pb-2">
          <div>
            <CardTitle className="text-2xl font-bold text-blue-700">
              {usuario.nome}
            </CardTitle>
            <p className="text-gray-500">{usuario.email}</p>
          </div>
          <Badge variant="outline" className="text-sm px-3 py-1">
            <GraduationCap className="h-4 w-4 mr-1 text-blue-500" />
            {usuario.curso || "Curso não informado"}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-3 mt-3">
          <div className="flex items-center gap-2 text-gray-700">
            <Mail className="h-4 w-4 text-gray-500" />
            <span>{usuario.email}</span>
          </div>

          {usuario.data_nascimento && (
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span>
                Nascimento:{" "}
                {new Date(usuario.data_nascimento + "Z").toLocaleDateString("pt-BR")}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 text-gray-700">
            <Users className="h-4 w-4 text-gray-500" />
            <span>Amigos: {amizades}</span>
          </div>
        </CardContent>
      </Card>

      {/* Grupos */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpen className="h-5 w-5 text-blue-600" /> Grupos que participa
          </CardTitle>
        </CardHeader>
        <CardContent>
          {grupos.length === 0 ? (
            <p className="text-gray-500">Você ainda não participa de nenhum grupo.</p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {grupos.map((g) => (
                <div
                  key={g.cod_grupo}
                  className="border rounded-xl p-4 hover:shadow-lg transition bg-white"
                >
                  <h3 className="font-semibold text-blue-700">{g.nome}</h3>
                  <p className="text-gray-600 text-sm mb-2">{g.descricao}</p>
                  <p className="text-xs text-gray-400">
                    Criado em{" "}
                    {new Date(g.data_criacao + "Z").toLocaleDateString("pt-BR")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
