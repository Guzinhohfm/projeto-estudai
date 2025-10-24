import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { LoginScreen } from "./components/login-screen";
import { RegisterScreen } from "./components/cadastro";
import { StudyGroups } from "./components/study-groups";
import { SocialTimeline } from "./components/social-timeline";
import { UserProfile } from "./components/user-profile";
import { DigitalLibrary } from "./components/digital-library";
import { FriendsManagement } from "./components/friends-management";
import { useMobile } from "./components/ui/use-mobile";
import { Toaster } from "./components/ui/sonner";
import { GroupChat } from "./components/group-chat"; // 👈 rota do chat

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "./components/ui/sidebar";

import {
  BookOpen,
  Users,
  Brain,
  Briefcase,
  Target,
  LogOut,
  User,
  Search,
  Bell,
  Plus,
  Home,
  UserPlus,
  Library,
} from "lucide-react";
import { JobOpportunities } from "./components/job-opportunities";

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [activeScreen, setActiveScreen] = useState<"login" | "register" | "home">("login");
  const isMobile = useMobile();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const expiration = localStorage.getItem("tokenExpiration");

    if (token && expiration) {
      const expDate = new Date(expiration);
      if (expDate < new Date()) {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("tokenExpiration");
        return;
      }

      const base64Payload = token.split(".")[1];
      const decoded = JSON.parse(atob(base64Payload));
      setUserData({
        email: decoded.email,
        name: decoded.sub || "Usuário",
        id: decoded.id_usuario || decoded.jti || Date.now().toString(),
        token,
      });
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (data: any) => {
    setUserData({
      email: data.email || "Usuário",
      name: data.name || "Usuário",
      id: data.id || Date.now().toString(),
      token: data.token,
    });
    setIsLoggedIn(true);

    if (data.token && data.expirationTime) {
      localStorage.setItem("jwtToken", data.token);
      localStorage.setItem("tokenExpiration", data.expirationTime);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem("jwtToken");
  };

  if (!isLoggedIn) {
    if (activeScreen === "login") {
      return <LoginScreen onLogin={handleLogin} goToRegister={() => setActiveScreen("register")} />;
    }

    if (activeScreen === "register") {
      return <RegisterScreen goToLogin={() => setActiveScreen("login")} />;
    }
  }

  // 🧭 Navegação principal com path associado
  const navigationItems = [
    { id: "timeline", label: "Home", icon: Home, path: "/" },
    { id: "study-groups", label: "Grupos de Estudo", icon: Users, path: "/grupos" },
    { id: "digital-library", label: "Acervo Digital", icon: Library, path: "/biblioteca" },
    { id: "friends", label: "Amizades", icon: UserPlus, path: "/amigos" },
    { id: "opportunities", label: "Oportunidades", icon: Briefcase, path: "/oportunidades" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          {/* Sidebar Header */}
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <div>
                <h1 className="font-semibold text-blue-700">Estud.AI</h1>
                <p className="text-xs text-muted-foreground">Plataforma Educacional</p>
              </div>
            </div>
          </SidebarHeader>

          {/* Sidebar Content */}
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Principal</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          onClick={() => navigate(item.path)} // 👈 muda URL
                          isActive={location.pathname === item.path} // 👈 destaca o ativo
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          {/* Sidebar Footer */}
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
            <div className="flex h-14 items-center justify-between px-4">
              <SidebarTrigger />
              <Badge variant="outline" className="text-xs">
                Beta
              </Badge>
            </div>
          </header>

          {/* Conteúdo renderizado por rota */}
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <Routes>
              <Route path="/" element={<SocialTimeline />} />
              <Route path="/grupos" element={<StudyGroups />} />
              <Route path="/grupo/:id" element={<GroupChat />} />
              <Route path="/biblioteca" element={<DigitalLibrary />} />
              <Route path="/amigos" element={<FriendsManagement />} />
              <Route path="/oportunidades" element={<JobOpportunities />} />
            </Routes>
          </main>
        </div>
      </div>

      <Toaster />
    </SidebarProvider>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
