import { useState } from "react";
import axios from "axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";

interface Job {
  id: number;
  title: string;
  company_name: string;
  candidate_required_location: string;
  category: string;
  url: string;
  description: string;
}

export function JobOpportunities() {
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  const searchJobs = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(query)}`
      );
      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error("Erro ao buscar vagas:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center">💼 Buscar Oportunidades de Trabalho</h1>

      <div className="flex gap-2 w-full">
        <Input
          type="text"
          placeholder="Ex: programador, react, data science..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button onClick={searchJobs} disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {jobs.length === 0 && !loading && (
          <p className="text-gray-500 text-center col-span-full">
            Nenhuma vaga encontrada. Tente outro termo.
          </p>
        )}

        {jobs.map((job) => (
          <Card key={job.id} className="rounded-2xl shadow-md hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-lg">{job.title}</CardTitle>
              <p className="text-sm text-gray-600">
                {job.company_name} • {job.candidate_required_location}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 line-clamp-3">{job.category}</p>
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm font-medium hover:underline mt-2 inline-block"
              >
                Ver vaga completa
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
