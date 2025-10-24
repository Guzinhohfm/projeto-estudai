import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { BookOpen, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Link } from "react-router-dom";

interface LoginScreenProps {
  onLogin: (userData: any) => void;
  goToRegister: () => void;
}

export function LoginScreen({ onLogin, goToRegister }: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const payload = {
      email: formData.email,
      senha: formData.password,
    };

    const response = await fetch("http://localhost:8080/api/Login/logar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message || "Falha ao autenticar");
      setIsLoading(false);
      return;
    }

    const data = await response.json();
    const token = data.token;
    const expirationTime = data.expirationTime
    console.log(data)
    // Salvar token no localStorage
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("tokenExpiration", expirationTime)
    

    console.log("JWT salvo?", localStorage.getItem("jwtToken"));
    console.log("Expiração salva?", localStorage.getItem("tokenExpiration"));
    
    const base64Payload = token.split('.')[1];
    const decoded = JSON.parse(atob(base64Payload));
    console.log(decoded);
    // decoded sub, email, id_usuario etc.
    const userData = {
      email: decoded.email,
      name: decoded.nome_usuario || "Usuário",
      id: decoded.id_usuario || decoded.jti || Date.now().toString(),
      type: "user",
      isNewUser: false,
      token
    };

    onLogin(userData);
    localStorage.setItem("userData", JSON.stringify(userData))
    setIsLoading(false);

  } catch (err) {
    console.error("Erro na requisição:", err);
    alert("Erro ao conectar com o servidor");
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-blue-purple rounded-xl shadow-blue">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-gradient-blue-purple">Estud.AI</h1>
            <p className="text-muted-foreground">Plataforma Educacional Inteligente</p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="shadow-lg border-2">
          <CardHeader>
            <div className="flex items-center justify-center gap-2 mb-2">
              <User className="h-5 w-5 text-primary" />
              <CardTitle className="text-center">Acesse sua conta</CardTitle>
            </div>
            <CardDescription className="text-center">
              Entre com suas credenciais de estudante
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="********"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-blue-purple hover:bg-gradient-purple-blue" 
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>

                <Button type="button" variant="outline" className="w-full" onClick={goToRegister}>
                  Cadastrar
                </Button>

              <div className="text-center">
                <Button variant="link" className="text-sm">
                  Esqueceu sua senha?
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

      
        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2025 Estud.AI - Todos os direitos reservados</p>
          <p className="mt-1 flex items-center justify-center gap-2">
            <Badge variant="outline">Versão Beta</Badge>
          </p>
        </div>
      </div>
    </div>
  );
}
