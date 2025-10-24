# Guia de Componentes - Estud.AI

## 🎨 Biblioteca de Componentes Reutilizáveis

Este documento cataloga todos os componentes visuais utilizados na plataforma Estud.AI, garantindo consistência em todas as implementações.

---

## 📦 Cards

### Card Básico
```html
<div class="card">
    <h3 class="font-semibold mb-2">Título</h3>
    <p class="text-muted-foreground">Conteúdo do card</p>
</div>
```

**CSS:**
```css
.card {
    background: white;
    border-radius: 1rem;
    border: 1px solid rgba(59, 130, 246, 0.15);
    padding: 1.5rem;
    transition: all 0.3s;
}

.dark .card {
    background: #1e293b;
    border-color: rgba(59, 130, 246, 0.2);
}

.card:hover {
    box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.2);
    transform: translateY(-2px);
}
```

### Card com Header Gradiente
```html
<div class="card relative overflow-hidden">
    <!-- Header -->
    <div class="absolute top-0 left-0 right-0 h-20 bg-gradient-to-br from-blue-500 to-purple-500 -m-6 mb-0"></div>
    
    <!-- Conteúdo -->
    <div class="relative pt-8">
        <h3 class="font-semibold">Título</h3>
        <p class="text-muted-foreground">Conteúdo</p>
    </div>
</div>
```

### Card de Perfil
```html
<div class="card hover:shadow-blue transition-all text-center">
    <!-- Avatar -->
    <div class="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg overflow-hidden">
        <img src="..." alt="..." class="w-full h-full object-cover">
    </div>
    
    <!-- Info -->
    <h3 class="font-semibold mb-1">Nome</h3>
    <p class="text-sm text-muted-foreground">Função</p>
    
    <!-- Action -->
    <button class="btn-primary w-full mt-4">Ação</button>
</div>
```

### Card de Livro
```html
<div class="card hover:shadow-purple cursor-pointer p-0 overflow-hidden transition-all group">
    <!-- Capa -->
    <div class="aspect-[3/4] overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
        <img src="..." alt="..." class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
    </div>
    
    <!-- Info -->
    <div class="p-4">
        <h3 class="font-semibold mb-1 line-clamp-2">Título do Livro</h3>
        <p class="text-sm text-muted-foreground mb-3">Autor</p>
        <div class="flex items-center justify-between">
            <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-xs font-medium">Categoria</span>
            <span class="text-xs text-muted-foreground">464p</span>
        </div>
    </div>
</div>
```

---

## 🔘 Botões

### Botão Primary (Gradiente)
```html
<button class="btn-primary">
    <i data-lucide="plus" class="w-4 h-4 inline mr-2"></i>
    Criar Novo
</button>
```

**CSS:**
```css
.btn-primary {
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    color: white;
    padding: 0.5rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    transition: all 0.3s;
    border: none;
    cursor: pointer;
}

.btn-primary:hover {
    box-shadow: 0 8px 20px 0 rgba(59, 130, 246, 0.4);
    transform: translateY(-2px);
}
```

### Botão Secondary
```html
<button class="btn-secondary">
    <i data-lucide="x" class="w-4 h-4 inline mr-2"></i>
    Cancelar
</button>
```

**CSS:**
```css
.btn-secondary {
    background: white;
    color: #2563eb;
    padding: 0.5rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 500;
    transition: all 0.3s;
    border: 1px solid rgba(59, 130, 246, 0.3);
    cursor: pointer;
}

.dark .btn-secondary {
    background: #1e293b;
    color: #60a5fa;
    border-color: rgba(59, 130, 246, 0.4);
}

.btn-secondary:hover {
    background: rgba(59, 130, 246, 0.1);
    border-color: #3b82f6;
}
```

### Botão Icon-Only
```html
<button class="btn-secondary px-4 py-2">
    <i data-lucide="settings" class="w-4 h-4"></i>
</button>
```

### Botão com Estado
```html
<!-- Estado Normal -->
<button id="add-btn" class="btn-primary">
    <i data-lucide="user-plus" class="w-4 h-4 inline mr-2"></i>
    <span>Adicionar</span>
</button>

<!-- Estado Ativo (via JavaScript) -->
<button id="add-btn" class="btn-secondary pointer-events-none" disabled>
    <i data-lucide="check-circle" class="w-4 h-4 inline mr-2"></i>
    <span>Adicionado</span>
</button>
```

---

## 🏷️ Badges

### Badge de Categoria
```html
<span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-xs font-medium">
    Programação
</span>
```

### Badge com Ícone
```html
<span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-xs font-medium flex items-center gap-1">
    <i data-lucide="users" class="w-3 h-3"></i>
    12 membros
</span>
```

### Badge de Status
```html
<!-- Sucesso -->
<span class="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
    Ativo
</span>

<!-- Aviso -->
<span class="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs font-medium">
    Pendente
</span>

<!-- Erro -->
<span class="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
    Bloqueado
</span>
```

---

## 📝 Formulários

### Input Text
```html
<div>
    <label class="block text-sm font-medium mb-2">Nome do Grupo</label>
    <input 
        type="text" 
        placeholder="Ex: Estudos de JavaScript" 
        class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
</div>
```

### Textarea
```html
<div>
    <label class="block text-sm font-medium mb-2">Descrição</label>
    <textarea 
        rows="4" 
        placeholder="Descreva o propósito do grupo..." 
        class="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    ></textarea>
</div>
```

### Select
```html
<div>
    <label class="block text-sm font-medium mb-2">Categoria</label>
    <select class="w-full px-4 py-3 border border-border rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="">Selecione...</option>
        <option value="prog">Programação</option>
        <option value="ia">IA</option>
        <option value="design">Design</option>
    </select>
</div>
```

### Checkbox
```html
<label class="flex items-center gap-2 cursor-pointer">
    <input type="checkbox" class="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500">
    <span class="text-sm">Tornar grupo privado</span>
</label>
```

### Input de Busca com Ícone
```html
<div class="relative">
    <input 
        type="text" 
        placeholder="Buscar..." 
        class="w-full px-4 py-3 pl-12 bg-white dark:bg-gray-800 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
    <i data-lucide="search" class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"></i>
</div>
```

---

## 🖼️ Avatares

### Avatar Pequeno
```html
<div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
    JD
</div>
```

### Avatar Médio
```html
<div class="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
    JD
</div>
```

### Avatar Grande
```html
<div class="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-xl overflow-hidden">
    <img src="..." alt="..." class="w-full h-full object-cover">
</div>
```

### Avatar com Borda
```html
<div class="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-xl overflow-hidden border-4 border-white dark:border-gray-800">
    <img src="..." alt="..." class="w-full h-full object-cover">
</div>
```

---

## 🔔 Modais

### Modal Básico
```html
<div class="modal active">
    <div class="modal-content p-6 max-w-2xl">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold">Título do Modal</h2>
            <button onclick="this.closest('.modal').remove()" class="p-2 hover:bg-muted rounded-lg">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
        </div>
        
        <!-- Content -->
        <div class="mb-6">
            <p class="text-muted-foreground">Conteúdo do modal...</p>
        </div>
        
        <!-- Footer -->
        <div class="flex justify-end gap-3">
            <button class="btn-secondary">Cancelar</button>
            <button class="btn-primary">Confirmar</button>
        </div>
    </div>
</div>
```

### Modal com Header Gradiente
```html
<div class="modal active">
    <div class="modal-content p-0 max-w-4xl max-h-[90vh] overflow-y-auto">
        <!-- Header Gradiente -->
        <div class="relative h-48 bg-gradient-to-br from-blue-600 to-purple-600 overflow-hidden">
            <div class="absolute inset-0 bg-black/20"></div>
            <button onclick="this.closest('.modal').remove()" class="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-all z-10 text-white">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
        </div>
        
        <!-- Content -->
        <div class="p-6">
            <h2 class="text-3xl font-bold mb-4">Título</h2>
            <p>Conteúdo...</p>
        </div>
    </div>
</div>
```

**CSS:**
```css
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);
}

.modal.active {
    display: flex;
}

.modal-content {
    background: white;
    border-radius: 1rem;
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.dark .modal-content {
    background: #1e293b;
}
```

---

## 📊 Listas

### Lista de Membros
```html
<div class="space-y-3">
    <!-- Item -->
    <div class="flex items-center gap-3 p-3 bg-muted rounded-lg">
        <!-- Avatar -->
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
            JD
        </div>
        
        <!-- Info -->
        <div class="flex-1">
            <h4 class="font-medium">João Silva</h4>
            <p class="text-xs text-muted-foreground">Membro</p>
        </div>
        
        <!-- Badge -->
        <span class="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs">Admin</span>
    </div>
</div>
```

### Lista de Posts
```html
<div class="space-y-4">
    <!-- Post -->
    <div class="card">
        <!-- Header -->
        <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                JD
            </div>
            <div class="flex-1">
                <h4 class="font-medium">João Silva</h4>
                <p class="text-xs text-muted-foreground">há 2 horas</p>
            </div>
        </div>
        
        <!-- Content -->
        <p class="mb-3">Conteúdo do post...</p>
        
        <!-- Actions -->
        <div class="flex gap-4 pt-3 border-t border-border">
            <button class="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-600">
                <i data-lucide="heart" class="w-4 h-4"></i>
                <span>12</span>
            </button>
            <button class="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-600">
                <i data-lucide="message-circle" class="w-4 h-4"></i>
                <span>5</span>
            </button>
        </div>
    </div>
</div>
```

---

## 🌟 Componentes Especiais

### Sistema de Avaliação (Estrelas)
```html
<div class="flex items-center gap-2">
    <div class="flex gap-1">
        <i data-lucide="star" class="w-5 h-5 fill-yellow-400 text-yellow-400"></i>
        <i data-lucide="star" class="w-5 h-5 fill-yellow-400 text-yellow-400"></i>
        <i data-lucide="star" class="w-5 h-5 fill-yellow-400 text-yellow-400"></i>
        <i data-lucide="star" class="w-5 h-5 fill-yellow-400 text-yellow-400"></i>
        <i data-lucide="star" class="w-5 h-5 text-gray-300"></i>
    </div>
    <span class="font-semibold">4.0</span>
    <span class="text-sm text-muted-foreground">(234 avaliações)</span>
</div>
```

### Toast Notification
```html
<div class="fixed bottom-6 right-6 z-50 px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-slide-up bg-green-500 text-white">
    <i data-lucide="check-circle" class="w-5 h-5"></i>
    <span class="font-medium">Operação realizada com sucesso!</span>
</div>
```

**JavaScript:**
```javascript
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-6 right-6 z-50 px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-slide-up ${
        type === 'success' ? 'bg-green-500 text-white' : 
        type === 'error' ? 'bg-red-500 text-white' : 
        'bg-blue-600 text-white'
    }`;
    
    const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info';
    
    toast.innerHTML = `
        <i data-lucide="${icon}" class="w-5 h-5"></i>
        <span class="font-medium">${message}</span>
    `;
    
    document.body.appendChild(toast);
    lucide.createIcons();
    
    setTimeout(() => {
        toast.style.transition = 'all 0.3s ease-out';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
```

### Estado Vazio
```html
<div class="card text-center py-12">
    <i data-lucide="inbox" class="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50"></i>
    <h3 class="font-semibold mb-2 text-muted-foreground">Nenhum item encontrado</h3>
    <p class="text-sm text-muted-foreground mb-6">Tente ajustar os filtros ou adicionar novos itens</p>
    <button class="btn-primary">
        <i data-lucide="plus" class="w-4 h-4 inline mr-2"></i>
        Adicionar Item
    </button>
</div>
```

---

## 🎨 Utilitários de Estilo

### Gradientes
```html
<!-- Background Gradiente -->
<div class="bg-gradient-to-br from-blue-600 to-purple-600">
    Conteúdo
</div>

<!-- Texto com Gradiente -->
<h1 class="text-gradient">
    Título com Gradiente
</h1>
```

**CSS:**
```css
.text-gradient {
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}
```

### Sombras Customizadas
```css
.shadow-blue {
    box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.2);
}

.shadow-purple {
    box-shadow: 0 4px 14px 0 rgba(139, 92, 246, 0.2);
}
```

### Truncate Text
```html
<!-- 1 linha -->
<p class="truncate">Texto muito longo que será cortado...</p>

<!-- 2 linhas -->
<p class="line-clamp-2">Texto muito longo que será limitado a duas linhas...</p>

<!-- 3 linhas -->
<p class="line-clamp-3">Texto muito longo que será limitado a três linhas...</p>
```

---

## 📐 Grids Responsivos

### Grid 3 Colunas
```html
<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- Items -->
</div>
```

### Grid 4 Colunas
```html
<div class="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
    <!-- Items -->
</div>
```

### Grid com Auto-fit
```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <!-- Items -->
</div>
```

---

## 🎯 Ícones (Lucide)

### Ícones Mais Usados

**Navegação:**
- `home` - Home
- `users` - Grupos
- `book-open` - Biblioteca
- `briefcase` - Oportunidades
- `user` - Perfil

**Ações:**
- `plus` - Adicionar
- `edit` - Editar
- `trash-2` - Deletar
- `search` - Buscar
- `filter` - Filtrar
- `x` - Fechar

**Social:**
- `heart` - Curtir
- `message-circle` - Comentar
- `share-2` - Compartilhar
- `user-plus` - Adicionar amigo
- `check-circle` - Confirmado

**Status:**
- `check` - Sucesso
- `alert-circle` - Erro
- `info` - Informação
- `lock` - Privado
- `globe` - Público

**Conteúdo:**
- `file-text` - Documento
- `image` - Imagem
- `download` - Download
- `bookmark` - Salvar
- `star` - Favorito

### Como Usar
```html
<i data-lucide="nome-do-icone" class="w-5 h-5"></i>
```

**Tamanhos:**
- `w-3 h-3` - 12px (pequeno)
- `w-4 h-4` - 16px (médio)
- `w-5 h-5` - 20px (padrão)
- `w-6 h-6` - 24px (grande)
- `w-8 h-8` - 32px (extra grande)

---

## ✅ Checklist de Uso

Ao criar um novo componente, verifique:

- [ ] Usa as classes do Tailwind CSS
- [ ] Aplica o gradiente azul-roxo onde apropriado
- [ ] Possui estado de hover quando clicável
- [ ] Tem transição suave (transition-all 0.3s)
- [ ] É responsivo (funciona em mobile, tablet, desktop)
- [ ] Usa ícones do Lucide
- [ ] Possui dark mode (classes dark:)
- [ ] Segue o espaçamento padrão (p-4, gap-3, etc)
- [ ] Border-radius consistente (rounded-lg, rounded-full)
- [ ] Cores seguem a paleta definida

---

**Desenvolvido para Estud.AI - Design System v1.0**
