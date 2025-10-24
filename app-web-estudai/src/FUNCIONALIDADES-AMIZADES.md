# Sistema de Amizades - Estud.AI

## 📱 Visão Geral

O sistema de amizades da plataforma Estud.AI é uma funcionalidade completa que permite aos usuários se conectarem, gerenciarem solicitações e expandirem sua rede de contatos educacionais.

---

## ✨ Funcionalidades Principais

### 1. Dashboard de Estatísticas

No topo da página, o usuário visualiza 4 cards com métricas em tempo real:

```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│   Amigos    │  Pendentes  │  Enviadas   │  Sugestões  │
│     6       │      3      │      2      │      6      │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

**Cards incluem:**
- 👥 **Amigos** - Total de amigos conectados
- ⏰ **Pendentes** - Solicitações recebidas aguardando resposta (badge vermelho)
- ✅ **Enviadas** - Solicitações enviadas aguardando aprovação
- ➕ **Sugestões** - Pessoas recomendadas para conexão

---

## 🗂️ Abas de Navegação

### Aba 1: Amigos (Friends)

**Funcionalidades:**
- 🔍 **Busca em tempo real** por nome ou cargo
- Grid responsivo com cards de amigos
- Exibição de informações: nome, cargo, tempo de amizade
- Ações disponíveis:
  - 💬 **Mensagem** - Enviar mensagem direta
  - 👤 **Remover** - Desfazer amizade (com confirmação)

**Layout do Card:**
```
┌─────────────────────────────────┐
│ [Avatar] Ana Silva              │
│          Engenheira de Software │
│          Amigos desde Jan 2024  │
├─────────────────────────────────┤
│ [Mensagem] [Remover]            │
└─────────────────────────────────┘
```

**Estado Vazio:**
- Ícone de pessoas
- Mensagem amigável
- Botão para ir para sugestões

---

### Aba 2: Pendentes (Pending)

Lista de **solicitações recebidas** aguardando sua resposta.

**Informações exibidas:**
- Avatar e nome
- Cargo/função
- Número de amigos em comum

**Ações:**
- ✅ **Aceitar** - Adiciona aos amigos e notifica
- ❌ **Rejeitar** - Remove a solicitação

**Layout:**
```
┌─────────────────────────────────────────────┐
│ [Avatar] Carolina Dias                      │
│          Frontend Developer                 │
│          👥 8 em comum          [Aceitar] [X]│
└─────────────────────────────────────────────┘
```

**Notificações:**
- ✅ Aceitar: "Você e [Nome] agora são amigos! 🎉"
- ❌ Rejeitar: "Solicitação de [Nome] rejeitada"

---

### Aba 3: Enviadas (Sent)

Lista de **solicitações enviadas** que ainda não foram respondidas.

**Funcionalidades:**
- Visualizar status "Aguardando"
- Cancelar solicitação a qualquer momento
- Badge de status com ícone de relógio

**Layout:**
```
┌─────────────────────────────────────────────┐
│ [Avatar] Gabriel Ferreira                   │
│          Mobile Developer                   │
│          👥 6 em comum     [⏰ Aguardando] [X]│
└─────────────────────────────────────────────┘
```

**Ações:**
- ❌ **Cancelar** - Remove a solicitação enviada

---

### Aba 4: Sugestões (Suggestions)

Grid de **perfis recomendados** baseados em amigos em comum e interesses.

**Design do Card:**
- Header com gradiente azul-roxo
- Avatar centralizado (sobrepondo o header)
- Nome e cargo
- Badge de amigos em comum
- Botões de ação

**Layout:**
```
┌─────────────────────────────────┐
│ ╔═══════════════════════════╗   │
│ ║    Gradiente Azul-Roxo    ║   │
│ ╚═══════════════════════════╝   │
│        [  Avatar 24x24  ]        │
│                                  │
│       Carlos Eduardo            │
│    Desenvolvedor Backend        │
│                                  │
│      👥 12 em comum             │
│                                  │
│  [   Adicionar   ] [ X ]        │
└─────────────────────────────────┘
```

**Ações:**
- ➕ **Adicionar** - Envia solicitação e move para aba "Enviadas"
- ❌ **Remover** - Esconde a sugestão

**Notificação:**
- "Solicitação enviada para [Nome]! ✨"

---

## 🎨 Componentes Visuais

### Cores e Gradientes

**Paleta:**
- 🔵 Azul Primary: `#2563eb`
- 🟣 Roxo Secondary: `#8b5cf6`
- 🎨 Gradiente: `linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)`

**Estados de Cards:**
```css
/* Hover States */
.hover:shadow-blue    /* Cards de amigos */
.hover:shadow-purple  /* Cards de sugestões */

/* Transições */
transition-all duration-300
```

### Avatares

**Tipos:**
- Small: 12x12 (h-12 w-12) - Listas
- Large: 24x24 (h-24 w-24) - Sugestões

**Fallback:**
- Gradiente azul-roxo
- Iniciais em branco
- Font bold

### Badges

**Variações:**
```tsx
// Contador (azul)
<Badge variant="secondary">{count}</Badge>

// Alerta (vermelho)
<Badge className="bg-red-500">{count}</Badge>

// Status (com ícone)
<Badge variant="secondary">
  <Clock className="h-3 w-3" />
  Aguardando
</Badge>
```

---

## 🔔 Sistema de Notificações (Toast)

**Tipos implementados:**

### Sucesso ✅
```tsx
toast.success("Você e Ana agora são amigos! 🎉")
```
- Fundo verde
- Ícone check-circle
- Auto-dismiss: 3s

### Info ℹ️
```tsx
toast.info("Solicitação de Pedro rejeitada")
```
- Fundo azul
- Ícone info
- Auto-dismiss: 3s

**Posicionamento:**
- Fixed bottom-right
- Z-index: 50
- Animação: slide-up

---

## 🚀 Interações e Fluxos

### Fluxo 1: Adicionar Amigo
```
Sugestões → Click "Adicionar" → Move para "Enviadas" → 
Aguarda resposta → Aceito → Move para "Amigos"
```

### Fluxo 2: Aceitar Solicitação
```
Notificação → Pendentes → Click "Aceitar" → 
Toast de sucesso → Adiciona aos "Amigos"
```

### Fluxo 3: Remover Amigo
```
Amigos → Click "Remover" → Alert Dialog → 
Confirmar → Remove da lista → Toast de sucesso
```

---

## 📊 Dados Mockados

### Amigos Atuais (6)
- Ana Silva - Engenheira de Software
- Pedro Costa - Product Designer
- Julia Mendes - Data Analyst
- Roberto Lima - DevOps Engineer
- Mariana Souza - UX Researcher
- Fernando Alves - Tech Lead

### Solicitações Pendentes (3)
- Carolina Dias - Frontend (8 em comum)
- Thiago Santos - Backend (5 em comum)
- Isabela Rocha - Product Manager (12 em comum)

### Solicitações Enviadas (2)
- Gabriel Ferreira - Mobile (6 em comum)
- Amanda Oliveira - Scrum Master (4 em comum)

### Sugestões (6)
- Carlos Eduardo - Backend (12 em comum)
- Beatriz Santos - Data Scientist (8 em comum)
- Rafael Oliveira - UI Designer (15 em comum)
- Juliana Costa - Product Manager (6 em comum)
- Lucas Ferreira - Full Stack (10 em comum)
- Camila Rodrigues - UX Researcher (9 em comum)

---

## 💻 Estrutura de Código

### Componente Principal
```tsx
<FriendsManagement />
```

**Localização:** `/components/friends-management.tsx`

### Estados Gerenciados
```tsx
const [currentFriends, setCurrentFriends] = useState([]);
const [pendingRequests, setPendingRequests] = useState([]);
const [sentRequests, setSentRequests] = useState([]);
const [suggestions, setSuggestions] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [friendToRemove, setFriendToRemove] = useState(null);
```

### Handlers Principais
```tsx
handleAcceptRequest()   // Aceitar solicitação
handleRejectRequest()   // Rejeitar solicitação
handleCancelRequest()   // Cancelar enviada
handleSendRequest()     // Enviar nova
handleRemoveFriend()    // Remover amigo
handleRemoveSuggestion() // Remover sugestão
```

---

## 📱 Responsividade

### Breakpoints

**Mobile (< 768px):**
- Grid 1 coluna
- Tabs com ícones apenas
- Cards full-width

**Tablet (768px - 1024px):**
- Grid 2 colunas
- Tabs com ícones + texto abreviado
- Stats 2x2

**Desktop (> 1024px):**
- Grid 3 colunas
- Tabs completos
- Stats 1x4

### Layout Adaptativo
```tsx
// Stats
grid-cols-2 md:grid-cols-4

// Cards de Amigos
grid md:grid-cols-2 lg:grid-cols-3

// Cards de Sugestões
grid md:grid-cols-2 lg:grid-cols-3
```

---

## ♿ Acessibilidade

**Implementado:**
- ✅ Labels em todos os botões
- ✅ Alt text em avatares
- ✅ Títulos descritivos
- ✅ Alert Dialog para ações destrutivas
- ✅ Focus states visíveis
- ✅ Contraste adequado (WCAG AA)

**Atributos ARIA:**
```tsx
<Button aria-label="Remover amigo">
  <UserMinus className="h-4 w-4" />
</Button>
```

---

## 🎯 Melhorias Futuras

### Fase 2
- [ ] Filtros avançados (cargo, localização)
- [ ] Ordenação (alfabética, data, amigos em comum)
- [ ] Paginação/Infinite scroll
- [ ] Importar contatos

### Fase 3
- [ ] Listas de amigos (favoritos, família, trabalho)
- [ ] Bloquear usuários
- [ ] Privacidade (perfil privado, ocultar lista)
- [ ] Recomendações baseadas em IA

### Fase 4
- [ ] Integração com chat em tempo real
- [ ] Notificações push
- [ ] Aniversários e lembretes
- [ ] Análise de rede social (conexões mútuas)

---

## 🔧 Dependências

**Componentes UI:**
- `Button` - Ações primárias e secundárias
- `Badge` - Contadores e status
- `Avatar` - Fotos de perfil
- `Tabs` - Navegação entre seções
- `Input` - Campo de busca
- `AlertDialog` - Confirmações

**Ícones (Lucide):**
- `UserPlus` - Adicionar
- `Users` - Amigos/grupo
- `Check` - Aceitar
- `X` - Rejeitar/remover
- `Clock` - Aguardando
- `UserCheck` - Enviadas
- `UserMinus` - Remover amigo
- `MessageCircle` - Mensagem
- `Search` - Busca

**Notificações:**
- `sonner` - Toast notifications

---

## 📸 Screenshots

### Vista Geral
```
┌─────────────────────────────────────────────────────────┐
│ Amizades                                                │
│ Gerencie seus amigos e solicitações de amizade         │
├─────────────────────────────────────────────────────────┤
│ [6 Amigos] [3 Pendentes] [2 Enviadas] [6 Sugestões]   │
├─────────────────────────────────────────────────────────┤
│ [Amigos·6] [Pendentes·🔴3] [Enviadas·2] [Sugestões·6] │
├─────────────────────────────────────────────────────────┤
│ [🔍 Buscar amigos...]                                  │
│                                                         │
│ ┌───────────┐ ┌───────────┐ ┌───────────┐            │
│ │  Card 1   │ │  Card 2   │ │  Card 3   │            │
│ │  Amigo    │ │  Amigo    │ │  Amigo    │            │
│ └───────────┘ └───────────┘ └───────────┘            │
└─────────────────────────────────────────────────────────┘
```

---

## 🎓 Integração com Plataforma

### Navegação
- Menu lateral: **"Amizades"** com ícone `UserPlus`
- Posição: Entre "Acervo Digital" e "Recomendações"
- Badge de notificação quando há solicitações pendentes

### Sincronização
- Timeline: Mostra atividades de amigos
- Mensagens: Link direto para chat
- Grupos: Sugere amigos para grupos
- Recomendações: Usa rede de amigos para IA

---

## 🏆 Melhores Práticas Seguidas

### UX
✅ Feedback imediato (toast)
✅ Confirmação para ações destrutivas
✅ Estados vazios informativos
✅ Loading states (se necessário)
✅ Erros tratados com mensagens claras

### UI
✅ Consistência visual (paleta Estud.AI)
✅ Hierarquia clara de informação
✅ Espaçamento adequado (16px/24px)
✅ Contraste acessível
✅ Animações suaves (300ms)

### Código
✅ Componentes reutilizáveis
✅ Estados bem definidos
✅ Handlers organizados
✅ TypeScript tipado
✅ Comentários explicativos

---

**Desenvolvido com ❤️ para Estud.AI**
*Sistema de Amizades v1.0*
