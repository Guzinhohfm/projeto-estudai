import React, { useState, useEffect } from "react";


interface RegisterProps {
  goToLogin: () => void;
}

interface Curso {
  cod_curso: number;
  nome_curso: string;
}

export function RegisterScreen({ goToLogin }: RegisterProps) {
  const [formData, setFormData] = useState({
    num_matricula: "",
    email: "",
    cpf: "",
    senha: "",
    nome: "",
    data_nascimento: "",
    sexo: "",
    tipo_usuario: "",
    semestre: "",
    curso: ""
  });

  
  const [cursos, setCursos] = useState<Curso[]>([]); 
  const [carregandoCursos, setCarregandoCursos] = useState(true);

  useEffect(() => {
    const carregarCursos = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/curso/listar");
        if (!response.ok) throw new Error("Erro ao buscar cursos");
        const data = await response.json();
        setCursos(data);
      } catch (error) {
        console.error("Erro ao carregar cursos:", error);
      } finally {
        setCarregandoCursos(false);
      }
    };

    carregarCursos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Dados cadastrados:", formData);

     const payload = {
      num_matricula: Number(formData.num_matricula),
      email: formData.email,
      cpf: formData.cpf,
      senha: formData.senha,
      nome: formData.nome,
      data_nascimento: formData.data_nascimento,
      sexo: formData.sexo,
      tipo_usuario: formData.tipo_usuario,
      semestre: formData.semestre ? Number(formData.semestre) : null,
      cod_curso: formData.curso ? Number(formData.curso) : null
    };

    console.log("Payload:", payload);

    try {
    const response = await fetch("http://localhost:8080/api/login/registrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), 

      
    });

     if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro:", errorData);
      alert("Erro ao cadastrar: " + (errorData.erro || "Tente novamente"));
      return;
    }

    const data = await response.json();
    console.log("Cadastro feito com sucesso:", data);
    alert("Cadastro realizado!");
    goToLogin()
     } catch (err) {
    console.error("Erro na requisição:", err);
    alert("Erro na conexão com o servidor");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50">
      <div className="flex flex-col items-center mb-6">
        <div className="bg-blue-600 text-white rounded-2xl p-3 mb-2">
          📘
        </div>
        <h1 className="text-3xl font-semibold text-blue-700">Estud.AI</h1>
        <p className="text-gray-500 text-sm">Plataforma Educacional Inteligente</p>
      </div>

      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
          Crie sua conta
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Número de Matrícula</label>
            <input
              type="number"
              name="num_matricula"
              value={formData.num_matricula}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Nome</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">CPF</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1 focus:ring focus:ring-blue-200"
              required
              placeholder="000.000.000-00"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Data de Nascimento</label>
            <input
              type="date"
              name="data_nascimento"
              value={formData.data_nascimento}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Sexo</label>
            <select
              name="sexo"
              value={formData.sexo}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1 focus:ring focus:ring-blue-200"
              required
            >
              <option value="">Selecione</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Tipo de Usuário</label>
            <select
              name="tipo_usuario"
              value={formData.tipo_usuario}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1 focus:ring focus:ring-blue-200"
              required
            >
              <option value="">Selecione</option>
              <option value="U">Estudante</option>
              <option value="U">Professor</option>
              <option value="A">Administrador</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Semestre (opcional)</label>
            <input
              type="number"
              name="semestre"
              value={formData.semestre}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1 focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Curso (opcional)</label>
            {carregandoCursos ? (
              <p className="text-gray-500 text-sm mt-1">Carregando cursos...</p>
            ) : (
              <select
                name="curso"
                value={formData.curso}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg mt-1 focus:ring focus:ring-blue-200"
              >
                <option value="">Selecione um curso</option>
                {cursos.map((curso) => (
                  <option key={curso.cod_curso} value={curso.cod_curso}>
                    {curso.nome_curso}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600">Senha</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg mt-1 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-500 text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
          >
            Cadastrar
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Já tem uma conta?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Entrar
          </a>
        </p>
      </div>

      <footer className="mt-6 text-gray-400 text-xs text-center">
        © 2025 Estud.AI - Todos os direitos reservados <br />
        <span className="inline-block bg-gray-100 text-gray-500 px-3 py-1 mt-1 rounded-full text-[10px]">
          Versão Beta
        </span>
      </footer>
    </div>
  );
}
