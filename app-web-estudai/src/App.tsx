import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
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
import { GroupChat } from "./components/group-chat";
import { AdminPanel } from "./components/admin-panel"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./components/ui/avatar";

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
  Briefcase,
  LogOut,
  Home,
  UserPlus,
  Library,
  LayoutDashboard
} from "lucide-react";
import { JobOpportunities } from "./components/job-opportunities";

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [activeScreen, setActiveScreen] = useState<
    "login" | "register" | "home"
  >("login");
  const isMobile = useMobile();

  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Verifica token salvo
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

  // 🔹 Login
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

  // 🔹 Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem("jwtToken");
  };

  // 🔹 Telas de login e cadastro
  if (!isLoggedIn) {
    if (activeScreen === "login") {
      return (
        <LoginScreen
          onLogin={handleLogin}
          goToRegister={() => setActiveScreen("register")}
        />
      );
    }

    if (activeScreen === "register") {
      return <RegisterScreen goToLogin={() => setActiveScreen("login")} />;
    }
  }

  // 🔹 Itens de navegação
  const navigationItems = [
    { id: "timeline", label: "Home", icon: Home, path: "/" },
    {
      id: "study-groups",
      label: "Grupos de Estudo",
      icon: Users,
      path: "/grupos",
    },
    {
      id: "digital-library",
      label: "Acervo Digital",
      icon: Library,
      path: "/biblioteca",
    },
    { id: "friends", label: "Amizades", icon: UserPlus, path: "/amigos" },
    {
      id: "opportunities",
      label: "Oportunidades",
      icon: Briefcase,
      path: "/oportunidades",
    },
    {
      id: "admin",
      label: "Dashboards administrativos",
      icon: LayoutDashboard,
      path: "/admin"
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Sidebar */}
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <div>
                <h1 className="font-semibold text-blue-700">Estud.AI</h1>
                <p className="text-xs text-muted-foreground">
                  Plataforma Educacional
                </p>
              </div>
            </div>
          </SidebarHeader>

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
                          onClick={() => navigate(item.path)}
                          isActive={location.pathname === item.path}
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

              {/* Direita do Header */}
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-xs">
                  Beta
                </Badge>

                {/* Menu do Usuário */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 hover:bg-gray-100 px-2 py-1 rounded-lg transition">
                      <Avatar fallback={userData?.name || "U"} className="h-8 w-8" />
                      <span className="font-medium text-sm text-gray-800">
                        {userData?.name || "Usuário"}
                      </span>
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/perfil")}>
                      Meu Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-red-600"
                    >
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Conteúdo */}
          <main className="flex-1 overflow-auto p-4 md:p-6">
            <Routes>
              <Route path="/" element={<SocialTimeline />} />
              <Route path="/grupos" element={<StudyGroups />} />
              <Route path="/grupo/:id" element={<GroupChat />} />
              <Route path="/biblioteca" element={<DigitalLibrary />} />
              <Route path="/amigos" element={<FriendsManagement />} />
              <Route path="/oportunidades" element={<JobOpportunities />} />
              <Route path="/perfil" element={<UserProfile />} />
              <Route path="/admin" element={<AdminPanel/>} />
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
