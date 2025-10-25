import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Users,
  BookOpen,
  MessagesSquare,
  Heart,
  GraduationCap,
  Network,
} from "lucide-react";
import { toast } from "sonner";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

interface Estatisticas {
  totalUsuarios: number;
  totalGrupos: number;
  totalPostagens: number;
  totalInteracoes: number;
  totalAmizades: number;
  novosUsuariosPorMes: { mes: string; quantidade: number }[];
  postagensPorMes: { mes: string; quantidade: number }[];
}

export function AdminPanel() {
  const [stats, setStats] = useState<Estatisticas | null>(null);
  const [loading, setLoading] = useState(true);

  const apiUrl = "http://localhost:8080/api/Admin";
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    carregarEstatisticas();
  }, []);

  const carregarEstatisticas = async () => {
    try {
      const response = await axios.get(`${apiUrl}/estatisticas-gerais`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(response.data);
    } catch (error) {
      console.error("Erro ao buscar estatísticas:", error);
      toast.error("Erro ao carregar estatísticas do painel");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-8">Carregando painel...</p>;
  }

  if (!stats) {
    return <p className="text-center text-gray-500 mt-8">Nenhum dado disponível</p>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 mt-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold mb-1 text-blue-700">Painel Administrativo</h2>
        <p className="text-gray-500">
          Visão geral das métricas e atividades do Estud.AI
        </p>
      </div>

      {/* Cards principais */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard
          icon={<Users className="h-6 w-6 text-blue-600" />}
          label="Usuários"
          value={stats.totalUsuarios}
        />
        <StatCard
          icon={<BookOpen className="h-6 w-6 text-purple-600" />}
          label="Grupos"
          value={stats.totalGrupos}
        />
        <StatCard
          icon={<MessagesSquare className="h-6 w-6 text-green-600" />}
          label="Postagens"
          value={stats.totalPostagens}
        />
        <StatCard
          icon={<Heart className="h-6 w-6 text-pink-600" />}
          label="Interações"
          value={stats.totalInteracoes}
        />
        <StatCard
          icon={<Network className="h-6 w-6 text-orange-600" />}
          label="Amizades"
          value={stats.totalAmizades}
        />
      </div>

      {/* Gráficos */}
      <div className="grid md:grid-cols-2 gap-8">
        
        <Card>
          <CardHeader>
            <CardTitle>🧾 Postagens Criadas por Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stats.postagensPorMes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantidade" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Grupos mais ativos */}
      <Card>
        <CardHeader>
          <CardTitle>🔥 Grupos mais ativos</CardTitle>
        </CardHeader>
        <CardContent>
          <TabelaGrupos />
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <Card className="border shadow-sm hover:shadow-md transition">
      <CardContent className="p-4 flex flex-col items-center justify-center">
        {icon}
        <p className="text-lg font-semibold mt-2">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </CardContent>
    </Card>
  );
}

// 🔹 Exemplo de tabela dinâmica (mock)
function TabelaGrupos() {
  const gruposMock = [
    { nome: "Estudos de Java", membros: 45, postagens: 132 },
    { nome: "IA e Machine Learning", membros: 38, postagens: 97 },
    { nome: "Programação Web", membros: 60, postagens: 145 },
  ];

  return (
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b text-gray-600">
          <th className="py-2">Grupo</th>
          <th>Membros</th>
          <th>Postagens</th>
        </tr>
      </thead>
      <tbody>
        {gruposMock.map((g) => (
          <tr key={g.nome} className="border-b hover:bg-gray-50">
            <td className="py-2 font-medium">{g.nome}</td>
            <td>{g.membros}</td>
            <td>{g.postagens}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
