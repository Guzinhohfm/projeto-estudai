// Estado da aplicação
let currentUser = null;
let currentPage = 'timeline';
let currentLoginType = 'user';

// Dados mockados
const mockPosts = [
    {
        id: 1,
        author: 'Maria Silva',
        avatar: 'MS',
        role: 'Estudante de Engenharia',
        time: 'há 2 horas',
        content: 'Acabei de terminar meu projeto de Machine Learning! Foi desafiador mas muito gratificante 🚀',
        image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
        likes: 45,
        comments: 12,
        shares: 5
    },
    {
        id: 2,
        author: 'João Pedro',
        avatar: 'JP',
        role: 'Desenvolvedor Full Stack',
        time: 'há 5 horas',
        content: 'Alguém tem dicas de boas práticas em React? Estou começando um novo projeto e queria algumas orientações.',
        likes: 23,
        comments: 18,
        shares: 2
    },
    {
        id: 3,
        author: 'Ana Costa',
        avatar: 'AC',
        role: 'Designer UX/UI',
        time: 'há 1 dia',
        content: 'Compartilhando meu último projeto de design de interface. O que acharam? 🎨',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
        likes: 89,
        comments: 24,
        shares: 15
    }
];

const mockGroups = [
    {
        id: 1,
        name: 'JavaScript Avançado',
        icon: 'JS',
        members: 234,
        category: 'Programação',
        description: 'Grupo para estudar JavaScript em nível avançado',
        color: 'from-yellow-500 to-orange-500',
        image: 'https://images.unsplash.com/photo-1759884247144-53d52c31f859?w=400&h=250&fit=crop',
        membersList: [
            { name: 'Maria Silva', avatar: 'MS', role: 'Admin' },
            { name: 'João Pedro', avatar: 'JP', role: 'Membro' },
            { name: 'Ana Costa', avatar: 'AC', role: 'Moderador' },
            { name: 'Carlos Eduardo', avatar: 'CE', role: 'Membro' }
        ],
        posts: [
            {
                id: 1,
                author: 'Maria Silva',
                avatar: 'MS',
                time: 'há 2 horas',
                content: 'Pessoal, alguém tem dicas de otimização de performance em React?',
                likes: 12,
                comments: 5
            },
            {
                id: 2,
                author: 'João Pedro',
                avatar: 'JP',
                time: 'há 5 horas',
                content: 'Acabei de publicar um artigo sobre async/await. Vou compartilhar aqui!',
                likes: 23,
                comments: 8
            }
        ]
    },
    {
        id: 2,
        name: 'Machine Learning Brasil',
        icon: 'ML',
        members: 567,
        category: 'IA',
        description: 'Discussões sobre ML e Deep Learning',
        color: 'from-blue-500 to-purple-500',
        image: 'https://images.unsplash.com/photo-1697577418970-95d99b5a55cf?w=400&h=250&fit=crop',
        membersList: [
            { name: 'Ana Costa', avatar: 'AC', role: 'Admin' },
            { name: 'Lucas Ferreira', avatar: 'LF', role: 'Moderador' },
            { name: 'Beatriz Santos', avatar: 'BS', role: 'Membro' },
            { name: 'Rafael Oliveira', avatar: 'RO', role: 'Membro' }
        ],
        posts: [
            {
                id: 1,
                author: 'Ana Costa',
                avatar: 'AC',
                time: 'há 1 hora',
                content: 'Implementei minha primeira rede neural! Alguém quer fazer code review?',
                likes: 45,
                comments: 15
            }
        ]
    },
    {
        id: 3,
        name: 'Design Systems',
        icon: 'DS',
        members: 189,
        category: 'Design',
        description: 'Criação e manutenção de design systems',
        color: 'from-pink-500 to-red-500',
        image: 'https://images.unsplash.com/photo-1510832758362-af875829efcf?w=400&h=250&fit=crop',
        membersList: [
            { name: 'Camila Rodrigues', avatar: 'CR', role: 'Admin' },
            { name: 'Rafael Oliveira', avatar: 'RO', role: 'Membro' },
            { name: 'Juliana Costa', avatar: 'JC', role: 'Membro' }
        ],
        posts: [
            {
                id: 1,
                author: 'Camila Rodrigues',
                avatar: 'CR',
                time: 'há 3 horas',
                content: 'Novos componentes adicionados ao nosso design system! Confiram 🎨',
                likes: 34,
                comments: 10
            }
        ]
    }
];

const mockJobs = [
    {
        id: 1,
        company: 'Tech Solutions',
        logo: 'TS',
        title: 'Desenvolvedor React Jr',
        type: 'Estágio',
        location: 'São Paulo, SP',
        salary: 'R$ 2.000 - R$ 3.000',
        tags: ['React', 'JavaScript', 'Git'],
        posted: 'há 2 dias'
    },
    {
        id: 2,
        company: 'Data Corp',
        logo: 'DC',
        title: 'Analista de Dados',
        type: 'CLT',
        location: 'Remoto',
        salary: 'R$ 5.000 - R$ 7.000',
        tags: ['Python', 'SQL', 'Power BI'],
        posted: 'há 1 semana'
    },
    {
        id: 3,
        company: 'Design Studio',
        logo: 'DST',
        title: 'UX Designer Pleno',
        type: 'PJ',
        location: 'Rio de Janeiro, RJ',
        salary: 'R$ 6.000 - R$ 9.000',
        tags: ['Figma', 'UX Research', 'Prototyping'],
        posted: 'há 3 dias'
    }
];

const mockBooks = [
    {
        id: 1,
        title: 'Clean Code',
        author: 'Robert C. Martin',
        cover: 'https://images.unsplash.com/photo-1580121441575-41bcb5c6b47c?w=300&h=400&fit=crop',
        category: 'Programação',
        description: 'Um guia completo sobre como escrever código limpo, legível e manutenível. Aprenda as melhores práticas de programação e técnicas para melhorar a qualidade do seu código.',
        pages: 464,
        year: 2008
    },
    {
        id: 2,
        title: 'Machine Learning Avançado',
        author: 'Andrew Ng',
        cover: 'https://images.unsplash.com/photo-1706469980815-e2c54ace4560?w=300&h=400&fit=crop',
        category: 'IA',
        description: 'Aprenda os conceitos fundamentais e avançados de Machine Learning. Desde algoritmos básicos até redes neurais profundas e aplicações práticas em IA.',
        pages: 532,
        year: 2021
    },
    {
        id: 3,
        title: 'Design Thinking',
        author: 'Tim Brown',
        cover: 'https://images.unsplash.com/photo-1630852722667-ef9764a76b3e?w=300&h=400&fit=crop',
        category: 'Design',
        description: 'Como usar o design thinking para inovar e resolver problemas complexos. Metodologias e frameworks para criar soluções centradas no usuário.',
        pages: 264,
        year: 2019
    },
    {
        id: 4,
        title: 'Python para Data Science',
        author: 'Jake VanderPlas',
        cover: 'https://images.unsplash.com/photo-1706469980815-e2c54ace4560?w=300&h=400&fit=crop&hue=120',
        category: 'Data Science',
        description: 'Guia completo de Python aplicado à análise de dados. Pandas, NumPy, Matplotlib e muito mais para transformar dados em insights valiosos.',
        pages: 541,
        year: 2020
    },
    {
        id: 5,
        title: 'UX Design Essencial',
        author: 'Don Norman',
        cover: 'https://images.unsplash.com/photo-1630852722667-ef9764a76b3e?w=300&h=400&fit=crop&hue=280',
        category: 'Design',
        description: 'Princípios fundamentais de design de experiência do usuário. Aprenda a criar interfaces intuitivas e experiências memoráveis.',
        pages: 368,
        year: 2018
    },
    {
        id: 6,
        title: 'Algoritmos e Estruturas',
        author: 'Thomas Cormen',
        cover: 'https://images.unsplash.com/photo-1580121441575-41bcb5c6b47c?w=300&h=400&fit=crop&hue=180',
        category: 'Programação',
        description: 'O clássico sobre algoritmos e estruturas de dados. Referência essencial para estudantes e profissionais de ciência da computação.',
        pages: 1312,
        year: 2009
    },
    {
        id: 7,
        title: 'Deep Learning',
        author: 'Ian Goodfellow',
        cover: 'https://images.unsplash.com/photo-1706469980815-e2c54ace4560?w=300&h=400&fit=crop&hue=240',
        category: 'IA',
        description: 'Mergulhe profundamente nas redes neurais e arquiteturas modernas de deep learning. Da teoria à prática em projetos reais.',
        pages: 775,
        year: 2016
    },
    {
        id: 8,
        title: 'Análise de Dados com R',
        author: 'Hadley Wickham',
        cover: 'https://images.unsplash.com/photo-1580121441575-41bcb5c6b47c?w=300&h=400&fit=crop&hue=280',
        category: 'Data Science',
        description: 'Aprenda a analisar e visualizar dados usando R e o tidyverse. Técnicas estatísticas e visualizações profissionais.',
        pages: 492,
        year: 2017
    }
];

const mockFriendSuggestions = [
    {
        id: 1,
        name: 'Carlos Eduardo',
        avatar: 'CE',
        role: 'Desenvolvedor Backend',
        mutualFriends: 12,
        image: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?w=200&h=200&fit=crop',
        added: false
    },
    {
        id: 2,
        name: 'Beatriz Santos',
        avatar: 'BS',
        role: 'Data Scientist',
        mutualFriends: 8,
        image: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=200&h=200&fit=crop',
        added: false
    },
    {
        id: 3,
        name: 'Rafael Oliveira',
        avatar: 'RO',
        role: 'UI Designer',
        mutualFriends: 15,
        image: 'https://images.unsplash.com/photo-1708195886023-3ecb00ac7a49?w=200&h=200&fit=crop',
        added: false
    },
    {
        id: 4,
        name: 'Juliana Costa',
        avatar: 'JC',
        role: 'Product Manager',
        mutualFriends: 6,
        image: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=200&h=200&fit=crop&hue=80',
        added: false
    },
    {
        id: 5,
        name: 'Lucas Ferreira',
        avatar: 'LF',
        role: 'Full Stack Developer',
        mutualFriends: 10,
        image: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?w=200&h=200&fit=crop&hue=120',
        added: false
    },
    {
        id: 6,
        name: 'Camila Rodrigues',
        avatar: 'CR',
        role: 'UX Researcher',
        mutualFriends: 9,
        image: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=200&h=200&fit=crop&hue=200',
        added: false
    },
    {
        id: 7,
        name: 'André Silva',
        avatar: 'AS',
        role: 'Engenheiro de ML',
        mutualFriends: 14,
        image: 'https://images.unsplash.com/photo-1708195886023-3ecb00ac7a49?w=200&h=200&fit=crop&hue=60',
        added: false
    },
    {
        id: 8,
        name: 'Mariana Lima',
        avatar: 'ML',
        role: 'Scrum Master',
        mutualFriends: 7,
        image: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=200&h=200&fit=crop&hue=320',
        added: false
    },
    {
        id: 9,
        name: 'Felipe Martins',
        avatar: 'FM',
        role: 'DevOps Engineer',
        mutualFriends: 11,
        image: 'https://images.unsplash.com/photo-1672685667592-0392f458f46f?w=200&h=200&fit=crop&hue=240',
        added: false
    }
];

// Navegação
const navigationConfig = {
    user: [
        { id: 'timeline', label: 'HOME', icon: 'home' },
        { id: 'messages', label: 'Mensagens', icon: 'message-circle' },
        { id: 'ai-support', label: 'Assistente IA', icon: 'bot' },
        { id: 'study-groups', label: 'Grupos de Estudo', icon: 'users' },
        { id: 'digital-library', label: 'Acervo Digital', icon: 'book-open' },
        { id: 'friend-suggestions', label: 'Sugestões de Amizade', icon: 'user-plus' },
        { id: 'recommendations', label: 'Recomendações', icon: 'brain' },
        { id: 'opportunities', label: 'Oportunidades', icon: 'briefcase' },
        { id: 'profile', label: 'Meu Perfil', icon: 'user' },
    ],
    company: [
        { id: 'company-dashboard', label: 'Dashboard', icon: 'building-2' },
        { id: 'opportunities', label: 'Ver Oportunidades', icon: 'briefcase' },
        { id: 'profile', label: 'Meu Perfil', icon: 'user' },
    ],
    admin: [
        { id: 'dashboard', label: 'Dashboard', icon: 'bar-chart-3' },
        { id: 'users', label: 'Usuários', icon: 'users' },
        { id: 'content', label: 'Conteúdo', icon: 'file-text' },
        { id: 'analytics', label: 'Análises', icon: 'trending-up' },
    ]
};

// Login
function setLoginType(type) {
    currentLoginType = type;
    document.querySelectorAll('.login-type-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.type === type) {
            btn.classList.add('active');
        }
    });
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const name = email.split('@')[0];
    
    currentUser = {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email: email,
        type: currentLoginType,
        avatar: name.substring(0, 2).toUpperCase()
    };
    
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('main-app').classList.remove('hidden');
    
    updateUserInfo();
    renderNavigation();
    navigateTo(currentLoginType === 'admin' ? 'dashboard' : currentLoginType === 'company' ? 'company-dashboard' : 'timeline');
    
    lucide.createIcons();
}

function handleLogout() {
    currentUser = null;
    currentPage = 'timeline';
    document.getElementById('main-app').classList.add('hidden');
    document.getElementById('login-screen').classList.remove('hidden');
    lucide.createIcons();
}

function updateUserInfo() {
    const roleNames = {
        user: 'Estudante',
        company: 'Empresa',
        admin: 'Administrador'
    };
    
    document.getElementById('user-avatar').textContent = currentUser.avatar;
    document.getElementById('user-name').textContent = currentUser.name;
    document.getElementById('user-role').textContent = roleNames[currentUser.type];
}

// Navegação
function renderNavigation() {
    const nav = document.getElementById('sidebar-nav');
    const items = navigationConfig[currentUser.type];
    
    nav.innerHTML = `
        <div class="mb-2">
            <p class="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Principal</p>
            ${items.map(item => `
                <div class="nav-item ${currentPage === item.id ? 'active' : ''}" onclick="navigateTo('${item.id}')">
                    <i data-lucide="${item.icon}" class="w-4 h-4"></i>
                    <span>${item.label}</span>
                </div>
            `).join('')}
        </div>
    `;
    
    lucide.createIcons();
}

function navigateTo(page) {
    currentPage = page;
    renderNavigation();
    renderPage(page);
    updatePageHeader(page);
}

function updatePageHeader(page) {
    const pageConfig = {
        timeline: { icon: 'home', title: 'HOME' },
        messages: { icon: 'message-circle', title: 'Mensagens' },
        'ai-support': { icon: 'bot', title: 'Assistente IA' },
        'study-groups': { icon: 'users', title: 'Grupos de Estudo' },
        'digital-library': { icon: 'book-open', title: 'Acervo Digital' },
        'friend-suggestions': { icon: 'user-plus', title: 'Sugestões de Amizade' },
        recommendations: { icon: 'brain', title: 'Recomendações' },
        opportunities: { icon: 'briefcase', title: 'Oportunidades' },
        profile: { icon: 'user', title: 'Meu Perfil' },
        dashboard: { icon: 'bar-chart-3', title: 'Dashboard' },
        'company-dashboard': { icon: 'building-2', title: 'Dashboard Empresarial' },
        users: { icon: 'users', title: 'Gestão de Usuários' },
        content: { icon: 'file-text', title: 'Moderação de Conteúdo' },
        analytics: { icon: 'trending-up', title: 'Análises' },
    };
    
    const config = pageConfig[page] || { icon: 'home', title: 'HOME' };
    document.getElementById('page-icon').setAttribute('data-lucide', config.icon);
    document.getElementById('page-title').textContent = config.title;
    lucide.createIcons();
}

// Renderização de páginas
function renderPage(page) {
    const content = document.getElementById('main-content');
    
    switch(page) {
        case 'timeline':
            renderTimeline(content);
            break;
        case 'messages':
            renderMessages(content);
            break;
        case 'ai-support':
            renderAISupport(content);
            break;
        case 'study-groups':
            renderStudyGroups(content);
            break;
        case 'digital-library':
            renderDigitalLibrary(content);
            break;
        case 'friend-suggestions':
            renderFriendSuggestions(content);
            break;
        case 'recommendations':
            renderRecommendations(content);
            break;
        case 'opportunities':
            renderOpportunities(content);
            break;
        case 'profile':
            renderProfile(content);
            break;
        case 'dashboard':
            renderAdminDashboard(content);
            break;
        case 'company-dashboard':
            renderCompanyDashboard(content);
            break;
        case 'users':
            renderUserManagement(content);
            break;
        case 'content':
            renderContentModeration(content);
            break;
        case 'analytics':
            renderAnalytics(content);
            break;
        default:
            renderTimeline(content);
    }
    
    lucide.createIcons();
}

// Timeline
function renderTimeline(container) {
    container.innerHTML = `
        <div class="max-w-3xl mx-auto p-6 space-y-6">
            <!-- Create Post Card -->
            <div class="card">
                <div class="flex gap-3">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                        ${currentUser.avatar}
                    </div>
                    <button onclick="openCreatePostModal()" class="flex-1 text-left px-4 py-3 bg-muted hover:bg-muted/80 rounded-full text-muted-foreground transition-colors">
                        No que você está pensando, ${currentUser.name}?
                    </button>
                </div>
            </div>
            
            <!-- Posts -->
            ${mockPosts.map(post => `
                <div class="post-card fade-in">
                    <div class="p-6">
                        <div class="flex items-start gap-3 mb-4">
                            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                                ${post.avatar}
                            </div>
                            <div class="flex-1">
                                <h3 class="font-semibold">${post.author}</h3>
                                <p class="text-sm text-muted-foreground">${post.role}</p>
                                <p class="text-xs text-muted-foreground">${post.time}</p>
                            </div>
                            <button class="p-2 hover:bg-muted rounded-lg">
                                <i data-lucide="more-horizontal" class="w-5 h-5"></i>
                            </button>
                        </div>
                        
                        <p class="mb-4">${post.content}</p>
                        
                        ${post.image ? `
                            <img src="${post.image}" alt="Post image" class="w-full rounded-lg mb-4 object-cover" style="max-height: 400px;">
                        ` : ''}
                        
                        <div class="flex items-center gap-6 pt-4 border-t border-border">
                            <button class="flex items-center gap-2 text-muted-foreground hover:text-blue-600 transition-colors">
                                <i data-lucide="heart" class="w-5 h-5"></i>
                                <span class="text-sm font-medium">${post.likes}</span>
                            </button>
                            <button class="flex items-center gap-2 text-muted-foreground hover:text-blue-600 transition-colors">
                                <i data-lucide="message-circle" class="w-5 h-5"></i>
                                <span class="text-sm font-medium">${post.comments}</span>
                            </button>
                            <button class="flex items-center gap-2 text-muted-foreground hover:text-blue-600 transition-colors">
                                <i data-lucide="share-2" class="w-5 h-5"></i>
                                <span class="text-sm font-medium">${post.shares}</span>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <!-- Floating Action Button -->
        <button onclick="openCreatePostModal()" class="fab">
            <i data-lucide="plus" class="w-6 h-6"></i>
        </button>
    `;
}

// Messages
function renderMessages(container) {
    container.innerHTML = `
        <div class="h-full flex">
            <div class="w-80 border-r border-border bg-white dark:bg-gray-900">
                <div class="p-4 border-b border-border">
                    <input type="text" placeholder="Buscar conversas..." class="w-full px-4 py-2 bg-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div class="overflow-y-auto">
                    ${['Maria Silva', 'João Pedro', 'Ana Costa', 'Carlos Santos'].map((name, i) => `
                        <div class="p-4 hover:bg-muted cursor-pointer border-b border-border ${i === 0 ? 'bg-muted' : ''}">
                            <div class="flex items-center gap-3">
                                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                    ${name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h4 class="font-medium truncate">${name}</h4>
                                    <p class="text-sm text-muted-foreground truncate">Última mensagem...</p>
                                </div>
                                ${i === 0 ? '<span class="w-2 h-2 bg-blue-500 rounded-full"></span>' : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="flex-1 flex flex-col">
                <div class="p-4 border-b border-border bg-white dark:bg-gray-900">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                            MS
                        </div>
                        <div>
                            <h4 class="font-medium">Maria Silva</h4>
                            <p class="text-xs text-green-500">Online</p>
                        </div>
                    </div>
                </div>
                <div class="flex-1 p-6 overflow-y-auto space-y-4">
                    <div class="flex justify-start">
                        <div class="bg-muted rounded-2xl rounded-tl-sm px-4 py-2 max-w-sm">
                            <p class="text-sm">Oi! Tudo bem?</p>
                        </div>
                    </div>
                    <div class="flex justify-end">
                        <div class="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-sm">
                            <p class="text-sm">Tudo ótimo! E você?</p>
                        </div>
                    </div>
                    <div class="flex justify-start">
                        <div class="bg-muted rounded-2xl rounded-tl-sm px-4 py-2 max-w-sm">
                            <p class="text-sm">Também! Você viu o novo projeto de IA?</p>
                        </div>
                    </div>
                </div>
                <div class="p-4 border-t border-border bg-white dark:bg-gray-900">
                    <div class="flex gap-2">
                        <input type="text" placeholder="Digite sua mensagem..." class="flex-1 px-4 py-2 bg-muted rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <button class="p-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-all">
                            <i data-lucide="send" class="w-5 h-5"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// AI Support
function renderAISupport(container) {
    container.innerHTML = `
        <div class="max-w-4xl mx-auto p-6">
            <div class="card mb-6 text-center">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <i data-lucide="bot" class="w-8 h-8 text-white"></i>
                </div>
                <h2 class="text-2xl font-bold mb-2 text-gradient">Assistente IA do Estud.AI</h2>
                <p class="text-muted-foreground">Tire suas dúvidas acadêmicas com inteligência artificial avançada</p>
            </div>
            
            <div class="space-y-4 mb-6">
                <div class="flex justify-start">
                    <div class="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-lg shadow-blue">
                        <p class="text-sm">Olá! Sou o assistente IA do Estud.AI. Como posso ajudá-lo hoje?</p>
                    </div>
                </div>
                
                <div class="flex justify-end">
                    <div class="bg-white dark:bg-gray-800 border border-border rounded-2xl rounded-tr-sm px-4 py-3 max-w-lg">
                        <p class="text-sm">Pode me explicar o conceito de Machine Learning?</p>
                    </div>
                </div>
                
                <div class="flex justify-start">
                    <div class="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl rounded-tl-sm px-4 py-3 max-w-lg shadow-blue">
                        <p class="text-sm mb-2">Claro! Machine Learning (Aprendizado de Máquina) é uma área da inteligência artificial que permite que computadores aprendam e melhorem com a experiência sem serem explicitamente programados.</p>
                        <p class="text-sm">Os principais tipos são:</p>
                        <ul class="text-sm mt-2 space-y-1 ml-4">
                            <li>• Aprendizado Supervisionado</li>
                            <li>• Aprendizado Não Supervisionado</li>
                            <li>• Aprendizado por Reforço</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-3 mb-6">
                <button class="card text-left hover:shadow-purple transition-all p-4" onclick="sendPredefinedQuestion('Como funciona React?')">
                    <i data-lucide="code" class="w-5 h-5 text-blue-600 mb-2"></i>
                    <p class="text-sm font-medium">Como funciona React?</p>
                </button>
                <button class="card text-left hover:shadow-purple transition-all p-4" onclick="sendPredefinedQuestion('Explique algoritmos')">
                    <i data-lucide="brain" class="w-5 h-5 text-purple-600 mb-2"></i>
                    <p class="text-sm font-medium">Explique algoritmos</p>
                </button>
                <button class="card text-left hover:shadow-purple transition-all p-4" onclick="sendPredefinedQuestion('O que é UX Design?')">
                    <i data-lucide="palette" class="w-5 h-5 text-blue-600 mb-2"></i>
                    <p class="text-sm font-medium">O que é UX Design?</p>
                </button>
                <button class="card text-left hover:shadow-purple transition-all p-4" onclick="sendPredefinedQuestion('Estrutura de dados')">
                    <i data-lucide="database" class="w-5 h-5 text-purple-600 mb-2"></i>
                    <p class="text-sm font-medium">Estrutura de dados</p>
                </button>
            </div>
            
            <div class="card">
                <div class="flex gap-2">
                    <input type="text" id="ai-input" placeholder="Faça sua pergunta..." class="flex-1 px-4 py-3 bg-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <button onclick="sendAIQuestion()" class="px-6 py-3 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-medium">
                        <i data-lucide="send" class="w-5 h-5 inline"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Study Groups
function renderStudyGroups(container) {
    container.innerHTML = `
        <div class="max-w-6xl mx-auto p-6">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h2 class="text-2xl font-bold mb-2">Grupos de Estudo</h2>
                    <p class="text-muted-foreground">Conecte-se e aprenda colaborativamente</p>
                </div>
                <button onclick="openCreateGroupModal()" class="btn-primary">
                    <i data-lucide="plus" class="w-4 h-4 inline mr-2"></i>
                    Criar Grupo
                </button>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${mockGroups.map(group => `
                    <div onclick="openGroupDetails(${group.id})" class="card hover:shadow-purple cursor-pointer transition-all overflow-hidden p-0">
                        <div class="relative h-40 bg-gradient-to-br ${group.color} overflow-hidden">
                            <img src="${group.image}" alt="${group.name}" class="w-full h-full object-cover opacity-90">
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div class="absolute bottom-3 left-3 right-3">
                                <div class="flex items-center gap-2 text-white">
                                    <div class="w-12 h-12 bg-gradient-to-br ${group.color} rounded-lg flex items-center justify-center text-white font-bold shadow-lg border-2 border-white/50">
                                        ${group.icon}
                                    </div>
                                    <div class="flex-1">
                                        <h3 class="font-semibold">${group.name}</h3>
                                        <p class="text-xs text-white/80">${group.members} membros</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="p-4">
                            <p class="text-sm text-muted-foreground mb-3">${group.description}</p>
                            <div class="flex items-center justify-between">
                                <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-xs font-medium">${group.category}</span>
                                <i data-lucide="chevron-right" class="w-4 h-4 text-muted-foreground"></i>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Recommendations
function renderRecommendations(container) {
    container.innerHTML = `
        <div class="max-w-6xl mx-auto p-6">
            <div class="card mb-6 text-center">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <i data-lucide="brain" class="w-8 h-8 text-white"></i>
                </div>
                <h2 class="text-2xl font-bold mb-2 text-gradient">Recomendações Personalizadas</h2>
                <p class="text-muted-foreground">Conteúdo selecionado especialmente para você com base em IA</p>
            </div>
            
            <div class="mb-8">
                <h3 class="text-lg font-semibold mb-4">Cursos Recomendados</h3>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${[
                        { title: 'React Avançado', platform: 'Udemy', rating: 4.8, students: '12.5k', image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop' },
                        { title: 'Machine Learning A-Z', platform: 'Coursera', rating: 4.9, students: '25.3k', image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=200&fit=crop' },
                        { title: 'UX Design Completo', platform: 'Alura', rating: 4.7, students: '8.2k', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=200&fit=crop' }
                    ].map(course => `
                        <div class="card hover:shadow-purple cursor-pointer overflow-hidden p-0">
                            <img src="${course.image}" alt="${course.title}" class="w-full h-40 object-cover">
                            <div class="p-4">
                                <h4 class="font-semibold mb-2">${course.title}</h4>
                                <p class="text-sm text-muted-foreground mb-3">${course.platform}</p>
                                <div class="flex items-center justify-between text-sm">
                                    <div class="flex items-center gap-1 text-yellow-500">
                                        <i data-lucide="star" class="w-4 h-4 fill-current"></i>
                                        <span class="font-medium">${course.rating}</span>
                                    </div>
                                    <span class="text-muted-foreground">${course.students} alunos</span>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div>
                <h3 class="text-lg font-semibold mb-4">Artigos para Você</h3>
                <div class="space-y-4">
                    ${[
                        { title: '10 Melhores Práticas em React', author: 'Tech Blog', time: '5 min de leitura' },
                        { title: 'Introdução ao Deep Learning', author: 'AI Academy', time: '8 min de leitura' },
                        { title: 'Design Thinking na Prática', author: 'UX Magazine', time: '6 min de leitura' }
                    ].map(article => `
                        <div class="card hover:shadow-blue cursor-pointer">
                            <div class="flex items-center justify-between">
                                <div class="flex-1">
                                    <h4 class="font-semibold mb-1">${article.title}</h4>
                                    <p class="text-sm text-muted-foreground">${article.author} • ${article.time}</p>
                                </div>
                                <i data-lucide="bookmark" class="w-5 h-5 text-muted-foreground"></i>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// Opportunities
function renderOpportunities(container) {
    container.innerHTML = `
        <div class="max-w-6xl mx-auto p-6">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h2 class="text-2xl font-bold mb-2">Oportunidades de Trabalho</h2>
                    <p class="text-muted-foreground">Vagas e estágios recomendados para você</p>
                </div>
                <div class="flex gap-2">
                    <select class="px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Todos os tipos</option>
                        <option>Estágio</option>
                        <option>CLT</option>
                        <option>PJ</option>
                    </select>
                    <select class="px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Todas as áreas</option>
                        <option>Desenvolvimento</option>
                        <option>Design</option>
                        <option>Data Science</option>
                    </select>
                </div>
            </div>
            
            <div class="space-y-4">
                ${mockJobs.map(job => `
                    <div class="card hover:shadow-purple cursor-pointer">
                        <div class="flex items-start gap-4">
                            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-lg font-bold flex-shrink-0 shadow-lg">
                                ${job.logo}
                            </div>
                            <div class="flex-1">
                                <div class="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 class="text-lg font-semibold">${job.title}</h3>
                                        <p class="text-sm text-muted-foreground">${job.company}</p>
                                    </div>
                                    <button class="p-2 hover:bg-muted rounded-lg">
                                        <i data-lucide="bookmark" class="w-5 h-5"></i>
                                    </button>
                                </div>
                                <div class="flex flex-wrap gap-3 mb-3 text-sm text-muted-foreground">
                                    <span class="flex items-center gap-1">
                                        <i data-lucide="briefcase" class="w-4 h-4"></i>
                                        ${job.type}
                                    </span>
                                    <span class="flex items-center gap-1">
                                        <i data-lucide="map-pin" class="w-4 h-4"></i>
                                        ${job.location}
                                    </span>
                                    <span class="flex items-center gap-1">
                                        <i data-lucide="dollar-sign" class="w-4 h-4"></i>
                                        ${job.salary}
                                    </span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <div class="flex flex-wrap gap-2">
                                        ${job.tags.map(tag => `
                                            <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-xs font-medium">${tag}</span>
                                        `).join('')}
                                    </div>
                                    <span class="text-xs text-muted-foreground">${job.posted}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Profile
function renderProfile(container) {
    container.innerHTML = `
        <div class="max-w-4xl mx-auto p-6">
            <div class="card mb-6">
                <div class="h-32 bg-gradient-to-r from-blue-600 to-purple-600 -m-6 mb-0 rounded-t-2xl"></div>
                <div class="pt-4">
                    <div class="flex items-start gap-4 -mt-16 mb-6">
                        <div class="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-xl border-4 border-white dark:border-gray-800">
                            ${currentUser.avatar}
                        </div>
                        <div class="flex-1 pt-16">
                            <h2 class="text-2xl font-bold mb-1">${currentUser.name}</h2>
                            <p class="text-muted-foreground mb-4">${currentUser.email}</p>
                            <div class="flex gap-2">
                                <button class="btn-primary">
                                    <i data-lucide="edit" class="w-4 h-4 inline mr-2"></i>
                                    Editar Perfil
                                </button>
                                <button class="btn-secondary">
                                    <i data-lucide="settings" class="w-4 h-4 inline mr-2"></i>
                                    Configurações
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-3 gap-6 pt-6 border-t border-border">
                        <div class="text-center">
                            <h3 class="text-2xl font-bold text-gradient">156</h3>
                            <p class="text-sm text-muted-foreground">Seguidores</p>
                        </div>
                        <div class="text-center">
                            <h3 class="text-2xl font-bold text-gradient">89</h3>
                            <p class="text-sm text-muted-foreground">Seguindo</p>
                        </div>
                        <div class="text-center">
                            <h3 class="text-2xl font-bold text-gradient">42</h3>
                            <p class="text-sm text-muted-foreground">Publicações</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-6">
                <div class="card">
                    <h3 class="font-semibold mb-4 flex items-center gap-2">
                        <i data-lucide="book-open" class="w-5 h-5 text-blue-600"></i>
                        Cursos em Andamento
                    </h3>
                    <div class="space-y-3">
                        ${['React Avançado', 'Machine Learning', 'UX Design'].map(course => `
                            <div class="flex items-center justify-between p-3 bg-muted rounded-lg">
                                <span class="text-sm font-medium">${course}</span>
                                <span class="text-xs text-muted-foreground">75%</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="card">
                    <h3 class="font-semibold mb-4 flex items-center gap-2">
                        <i data-lucide="award" class="w-5 h-5 text-purple-600"></i>
                        Conquistas
                    </h3>
                    <div class="grid grid-cols-3 gap-3">
                        ${['🏆', '⭐', '🎯', '💡', '🚀', '📚'].map(emoji => `
                            <div class="aspect-square bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-3xl shadow-lg">
                                ${emoji}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Admin Dashboard
function renderAdminDashboard(container) {
    container.innerHTML = `
        <div class="max-w-7xl mx-auto p-6">
            <h2 class="text-2xl font-bold mb-6">Dashboard Administrativo</h2>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                ${[
                    { label: 'Usuários Ativos', value: '2,847', icon: 'users', color: 'blue' },
                    { label: 'Grupos Ativos', value: '23', icon: 'users', color: 'purple' },
                    { label: 'Posts Hoje', value: '156', icon: 'file-text', color: 'blue' },
                    { label: 'Taxa de Engajamento', value: '87%', icon: 'trending-up', color: 'purple' }
                ].map(stat => `
                    <div class="card text-center hover:shadow-${stat.color} transition-all">
                        <i data-lucide="${stat.icon}" class="w-8 h-8 mx-auto mb-3 text-${stat.color}-600"></i>
                        <h3 class="text-3xl font-bold text-gradient mb-2">${stat.value}</h3>
                        <p class="text-sm text-muted-foreground">${stat.label}</p>
                    </div>
                `).join('')}
            </div>
            
            <div class="grid lg:grid-cols-2 gap-6">
                <div class="card">
                    <h3 class="font-semibold mb-4 flex items-center gap-2">
                        <i data-lucide="activity" class="w-5 h-5 text-blue-600"></i>
                        Atividade Recente
                    </h3>
                    <div class="space-y-3">
                        ${[
                            { user: 'Maria Silva', action: 'criou um novo grupo', time: 'há 5 min' },
                            { user: 'João Pedro', action: 'publicou um post', time: 'há 12 min' },
                            { user: 'Ana Costa', action: 'completou um curso', time: 'há 1 hora' }
                        ].map(activity => `
                            <div class="flex items-center justify-between p-3 bg-muted rounded-lg">
                                <div>
                                    <p class="text-sm font-medium">${activity.user}</p>
                                    <p class="text-xs text-muted-foreground">${activity.action}</p>
                                </div>
                                <span class="text-xs text-muted-foreground">${activity.time}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="card">
                    <h3 class="font-semibold mb-4 flex items-center gap-2">
                        <i data-lucide="alert-circle" class="w-5 h-5 text-purple-600"></i>
                        Moderação Pendente
                    </h3>
                    <div class="space-y-3">
                        ${[
                            { type: 'Post reportado', count: 3 },
                            { type: 'Comentário para revisar', count: 7 },
                            { type: 'Usuários suspensos', count: 2 }
                        ].map(item => `
                            <div class="flex items-center justify-between p-3 bg-muted rounded-lg">
                                <span class="text-sm font-medium">${item.type}</span>
                                <span class="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-full text-xs font-medium">${item.count}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Company Dashboard
function renderCompanyDashboard(container) {
    container.innerHTML = `
        <div class="max-w-7xl mx-auto p-6">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h2 class="text-2xl font-bold mb-2">Dashboard Empresarial</h2>
                    <p class="text-muted-foreground">Gerencie suas vagas e candidatos</p>
                </div>
                <button class="btn-primary">
                    <i data-lucide="plus" class="w-4 h-4 inline mr-2"></i>
                    Nova Vaga
                </button>
            </div>
            
            <div class="grid md:grid-cols-3 gap-6 mb-6">
                ${[
                    { label: 'Vagas Ativas', value: '12', icon: 'briefcase', color: 'blue' },
                    { label: 'Candidatos', value: '234', icon: 'users', color: 'purple' },
                    { label: 'Contratações', value: '8', icon: 'check-circle', color: 'blue' }
                ].map(stat => `
                    <div class="card text-center hover:shadow-${stat.color} transition-all">
                        <i data-lucide="${stat.icon}" class="w-8 h-8 mx-auto mb-3 text-${stat.color}-600"></i>
                        <h3 class="text-3xl font-bold text-gradient mb-2">${stat.value}</h3>
                        <p class="text-sm text-muted-foreground">${stat.label}</p>
                    </div>
                `).join('')}
            </div>
            
            <div class="card">
                <h3 class="font-semibold mb-4">Suas Vagas</h3>
                <div class="space-y-3">
                    ${mockJobs.map(job => `
                        <div class="p-4 bg-muted rounded-lg hover:shadow-blue transition-all cursor-pointer">
                            <div class="flex items-center justify-between mb-2">
                                <h4 class="font-semibold">${job.title}</h4>
                                <button class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-xs font-medium">
                                    ${Math.floor(Math.random() * 50) + 10} candidatos
                                </button>
                            </div>
                            <div class="flex gap-4 text-sm text-muted-foreground">
                                <span>${job.type}</span>
                                <span>${job.location}</span>
                                <span>${job.posted}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// User Management
function renderUserManagement(container) {
    container.innerHTML = `
        <div class="max-w-7xl mx-auto p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold">Gestão de Usuários</h2>
                <div class="flex gap-2">
                    <input type="text" placeholder="Buscar usuários..." class="px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <button class="btn-primary">Filtros</button>
                </div>
            </div>
            
            <div class="card overflow-hidden p-0">
                <table class="w-full">
                    <thead class="bg-muted">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Usuário</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-border">
                        ${['Maria Silva', 'João Pedro', 'Ana Costa', 'Carlos Santos'].map((name, i) => `
                            <tr class="hover:bg-muted/50">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                                            ${name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <span class="font-medium">${name}</span>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                                    ${name.toLowerCase().replace(' ', '.')}@email.com
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="px-3 py-1 ${i === 0 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'} rounded-full text-xs font-medium">
                                        ${i === 0 ? 'Ativo' : 'Inativo'}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm">
                                    <button class="text-blue-600 hover:text-blue-800 mr-3">Editar</button>
                                    <button class="text-red-600 hover:text-red-800">Suspender</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Content Moderation
function renderContentModeration(container) {
    container.innerHTML = `
        <div class="max-w-7xl mx-auto p-6">
            <h2 class="text-2xl font-bold mb-6">Moderação de Conteúdo</h2>
            
            <div class="grid md:grid-cols-3 gap-6 mb-6">
                ${[
                    { label: 'Pendentes', value: '23', color: 'yellow' },
                    { label: 'Aprovados Hoje', value: '156', color: 'green' },
                    { label: 'Removidos', value: '8', color: 'red' }
                ].map(stat => `
                    <div class="card text-center">
                        <h3 class="text-3xl font-bold text-${stat.color}-600 mb-2">${stat.value}</h3>
                        <p class="text-sm text-muted-foreground">${stat.label}</p>
                    </div>
                `).join('')}
            </div>
            
            <div class="space-y-4">
                ${mockPosts.slice(0, 2).map(post => `
                    <div class="card">
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex items-start gap-3">
                                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                                    ${post.avatar}
                                </div>
                                <div>
                                    <h4 class="font-semibold">${post.author}</h4>
                                    <p class="text-sm text-muted-foreground">${post.time}</p>
                                </div>
                            </div>
                            <span class="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 rounded-full text-xs font-medium">Pendente</span>
                        </div>
                        <p class="mb-4">${post.content}</p>
                        <div class="flex gap-2">
                            <button class="btn-primary flex-1">
                                <i data-lucide="check" class="w-4 h-4 inline mr-2"></i>
                                Aprovar
                            </button>
                            <button class="btn-secondary">
                                <i data-lucide="x" class="w-4 h-4 inline mr-2"></i>
                                Rejeitar
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Analytics
function renderAnalytics(container) {
    container.innerHTML = `
        <div class="max-w-7xl mx-auto p-6">
            <h2 class="text-2xl font-bold mb-6">Análises e Relatórios</h2>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                ${[
                    { label: 'Usuários Novos (30d)', value: '+234', change: '+12%', icon: 'user-plus' },
                    { label: 'Engajamento', value: '87%', change: '+5%', icon: 'activity' },
                    { label: 'Posts/Dia', value: '156', change: '+23%', icon: 'file-text' },
                    { label: 'Tempo Médio', value: '45min', change: '+8%', icon: 'clock' }
                ].map(stat => `
                    <div class="card">
                        <div class="flex items-center justify-between mb-2">
                            <i data-lucide="${stat.icon}" class="w-5 h-5 text-blue-600"></i>
                            <span class="text-xs text-green-600 font-medium">${stat.change}</span>
                        </div>
                        <h3 class="text-2xl font-bold text-gradient mb-1">${stat.value}</h3>
                        <p class="text-sm text-muted-foreground">${stat.label}</p>
                    </div>
                `).join('')}
            </div>
            
            <div class="grid lg:grid-cols-2 gap-6">
                <div class="card">
                    <h3 class="font-semibold mb-4">Crescimento de Usuários</h3>
                    <div class="h-64 flex items-end justify-around gap-2">
                        ${[40, 65, 45, 80, 60, 90, 100].map((height, i) => `
                            <div class="flex-1 bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg shadow-blue" style="height: ${height}%"></div>
                        `).join('')}
                    </div>
                    <div class="flex justify-around mt-2 text-xs text-muted-foreground">
                        ${['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => `<span>${day}</span>`).join('')}
                    </div>
                </div>
                
                <div class="card">
                    <h3 class="font-semibold mb-4">Categorias Mais Populares</h3>
                    <div class="space-y-3">
                        ${[
                            { name: 'Programação', value: 45, color: 'blue' },
                            { name: 'Design', value: 30, color: 'purple' },
                            { name: 'Data Science', value: 15, color: 'blue' },
                            { name: 'Marketing', value: 10, color: 'purple' }
                        ].map(cat => `
                            <div>
                                <div class="flex items-center justify-between mb-1">
                                    <span class="text-sm font-medium">${cat.name}</span>
                                    <span class="text-sm text-muted-foreground">${cat.value}%</span>
                                </div>
                                <div class="h-2 bg-muted rounded-full overflow-hidden">
                                    <div class="h-full bg-gradient-to-r from-${cat.color}-600 to-purple-600 rounded-full transition-all" style="width: ${cat.value}%"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Group Details (Página Interna do Grupo)
function openGroupDetails(groupId) {
    const group = mockGroups.find(g => g.id === groupId);
    if (!group) return;
    
    currentPage = `group-${groupId}`;
    const content = document.getElementById('main-content');
    
    content.innerHTML = `
        <div class="max-w-6xl mx-auto p-6">
            <!-- Group Header -->
            <div class="card mb-6">
                <div class="relative h-48 -m-6 mb-0 rounded-t-2xl bg-gradient-to-br ${group.color} overflow-hidden">
                    <img src="${group.image}" alt="${group.name}" class="w-full h-full object-cover opacity-80">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <button onclick="navigateTo('study-groups')" class="absolute top-4 left-4 p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-all text-white">
                        <i data-lucide="arrow-left" class="w-5 h-5"></i>
                    </button>
                    <div class="absolute bottom-4 left-4 right-4">
                        <div class="flex items-center gap-3">
                            <div class="w-16 h-16 bg-gradient-to-br ${group.color} rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg border-3 border-white/50">
                                ${group.icon}
                            </div>
                            <div class="text-white flex-1">
                                <h2 class="text-2xl font-bold mb-1">${group.name}</h2>
                                <p class="text-sm text-white/90">${group.members} membros • ${group.category}</p>
                            </div>
                            <button class="px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-white/90 transition-all">
                                <i data-lucide="user-plus" class="w-4 h-4 inline mr-2"></i>
                                Participar
                            </button>
                        </div>
                    </div>
                </div>
                <div class="p-6">
                    <p class="text-muted-foreground">${group.description}</p>
                </div>
            </div>
            
            <div class="grid lg:grid-cols-3 gap-6">
                <!-- Posts Section -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- New Post Card -->
                    <div class="card">
                        <div class="flex gap-3">
                            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                                ${currentUser.avatar}
                            </div>
                            <div class="flex-1">
                                <textarea id="group-post-input-${groupId}" placeholder="Compartilhe algo com o grupo..." class="w-full px-4 py-3 bg-muted rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
                                <div class="flex justify-end mt-2">
                                    <button onclick="sendGroupMessage(${groupId})" class="btn-primary">
                                        <i data-lucide="send" class="w-4 h-4 inline mr-2"></i>
                                        Publicar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Group Posts -->
                    ${group.posts.length > 0 ? group.posts.map(post => `
                        <div class="card">
                            <div class="flex items-start gap-3 mb-4">
                                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                                    ${post.avatar}
                                </div>
                                <div class="flex-1">
                                    <h4 class="font-semibold">${post.author}</h4>
                                    <p class="text-xs text-muted-foreground">${post.time}</p>
                                </div>
                                <button class="p-2 hover:bg-muted rounded-lg">
                                    <i data-lucide="more-horizontal" class="w-5 h-5"></i>
                                </button>
                            </div>
                            <p class="mb-4">${post.content}</p>
                            <div class="flex items-center gap-6 pt-4 border-t border-border">
                                <button class="flex items-center gap-2 text-muted-foreground hover:text-blue-600 transition-colors">
                                    <i data-lucide="heart" class="w-5 h-5"></i>
                                    <span class="text-sm font-medium">${post.likes}</span>
                                </button>
                                <button class="flex items-center gap-2 text-muted-foreground hover:text-blue-600 transition-colors">
                                    <i data-lucide="message-circle" class="w-5 h-5"></i>
                                    <span class="text-sm font-medium">${post.comments}</span>
                                </button>
                                <button class="flex items-center gap-2 text-muted-foreground hover:text-blue-600 transition-colors">
                                    <i data-lucide="share-2" class="w-5 h-5"></i>
                                </button>
                            </div>
                        </div>
                    `).join('') : '<div class="card text-center text-muted-foreground">Nenhuma postagem ainda. Seja o primeiro a compartilhar!</div>'}
                </div>
                
                <!-- Sidebar -->
                <div class="space-y-6">
                    <!-- Members Card -->
                    <div class="card">
                        <h3 class="font-semibold mb-4 flex items-center gap-2">
                            <i data-lucide="users" class="w-5 h-5 text-blue-600"></i>
                            Membros (${group.membersList.length})
                        </h3>
                        <div class="space-y-3">
                            ${group.membersList.map(member => `
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                                        ${member.avatar}
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <p class="font-medium text-sm truncate">${member.name}</p>
                                        <p class="text-xs text-muted-foreground">${member.role}</p>
                                    </div>
                                    <button class="p-1 hover:bg-muted rounded transition-colors">
                                        <i data-lucide="more-vertical" class="w-4 h-4 text-muted-foreground"></i>
                                    </button>
                                </div>
                            `).join('')}
                        </div>
                        <button class="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
                            Ver todos os membros
                        </button>
                    </div>
                    
                    <!-- Quick Actions Card -->
                    <div class="card">
                        <h3 class="font-semibold mb-4">Ações Rápidas</h3>
                        <div class="space-y-2">
                            <button class="w-full flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors text-left">
                                <i data-lucide="bell" class="w-4 h-4 text-blue-600"></i>
                                <span class="text-sm">Notificações</span>
                            </button>
                            <button class="w-full flex items-center gap-3 px-3 py-2 hover:bg-muted rounded-lg transition-colors text-left">
                                <i data-lucide="settings" class="w-4 h-4 text-blue-600"></i>
                                <span class="text-sm">Configurações</span>
                            </button>
                            <button class="w-full flex items-center gap-3 px-3 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-left text-red-600">
                                <i data-lucide="log-out" class="w-4 h-4"></i>
                                <span class="text-sm">Sair do Grupo</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    lucide.createIcons();
}

// Create Group Modal
function openCreateGroupModal() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content p-0 max-w-2xl">
            <div class="p-6 border-b border-border flex items-center justify-between">
                <h2 class="text-xl font-bold">Criar Novo Grupo</h2>
                <button onclick="this.closest('.modal').remove()" class="p-2 hover:bg-muted rounded-lg transition-colors">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>
            <div class="p-6">
                <form onsubmit="createNewGroup(event)" class="space-y-5">
                    <div>
                        <label class="block text-sm font-medium mb-2">Nome do Grupo</label>
                        <input type="text" id="new-group-name" required class="w-full px-4 py-2 bg-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Ex: Python para Iniciantes">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">Descrição</label>
                        <textarea id="new-group-description" required class="w-full px-4 py-2 bg-muted rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3" placeholder="Descreva o propósito do grupo..."></textarea>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">Categoria</label>
                        <select id="new-group-category" required class="w-full px-4 py-2 bg-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Selecione uma categoria</option>
                            <option value="Programação">Programação</option>
                            <option value="IA">IA</option>
                            <option value="Design">Design</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Negócios">Negócios</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">Imagem do Grupo (URL)</label>
                        <input type="url" id="new-group-image" class="w-full px-4 py-2 bg-muted rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://exemplo.com/imagem.jpg">
                        <p class="text-xs text-muted-foreground mt-1">Opcional - Cole a URL de uma imagem</p>
                    </div>
                    <div class="flex gap-3 pt-4">
                        <button type="submit" class="flex-1 btn-primary">
                            <i data-lucide="plus" class="w-4 h-4 inline mr-2"></i>
                            Criar Grupo
                        </button>
                        <button type="button" onclick="this.closest('.modal').remove()" class="btn-secondary px-6">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    lucide.createIcons();
}

function createNewGroup(event) {
    event.preventDefault();
    
    const name = document.getElementById('new-group-name').value;
    const description = document.getElementById('new-group-description').value;
    const category = document.getElementById('new-group-category').value;
    const image = document.getElementById('new-group-image').value || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop';
    
    const colorOptions = [
        'from-blue-500 to-purple-500',
        'from-green-500 to-teal-500',
        'from-orange-500 to-red-500',
        'from-pink-500 to-purple-500',
        'from-indigo-500 to-blue-500'
    ];
    
    const newGroup = {
        id: mockGroups.length + 1,
        name: name,
        icon: name.substring(0, 2).toUpperCase(),
        members: 1,
        category: category,
        description: description,
        color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
        image: image,
        membersList: [
            { name: currentUser.name, avatar: currentUser.avatar, role: 'Admin' }
        ],
        posts: []
    };
    
    mockGroups.push(newGroup);
    
    // Close modal
    document.querySelector('.modal').remove();
    
    // Refresh page
    navigateTo('study-groups');
    
    // Show success message
    setTimeout(() => {
        alert(`Grupo "${name}" criado com sucesso! 🎉`);
    }, 300);
}

function sendGroupMessage(groupId) {
    const input = document.getElementById(`group-post-input-${groupId}`);
    if (input && input.value.trim()) {
        const group = mockGroups.find(g => g.id === groupId);
        if (group) {
            const newPost = {
                id: group.posts.length + 1,
                author: currentUser.name,
                avatar: currentUser.avatar,
                time: 'agora',
                content: input.value,
                likes: 0,
                comments: 0
            };
            group.posts.unshift(newPost);
            openGroupDetails(groupId);
        }
    }
}

// Digital Library (Acervo Digital)
function renderDigitalLibrary(container) {
    const renderBooks = (books = mockBooks) => {
        const booksHtml = books.length > 0 ? books.map(book => `
            <div class="card hover:shadow-purple cursor-pointer p-0 overflow-hidden transition-all group" onclick="showBookDetails(${book.id})">
                <div class="aspect-[3/4] overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
                    <img src="${book.cover}" alt="${book.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                </div>
                <div class="p-4">
                    <h3 class="font-semibold mb-1 line-clamp-2">${book.title}</h3>
                    <p class="text-sm text-muted-foreground mb-3">${book.author}</p>
                    <div class="flex items-center justify-between">
                        <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-xs font-medium">${book.category}</span>
                        <div class="flex items-center gap-1 text-xs text-muted-foreground">
                            <i data-lucide="book-open" class="w-3 h-3"></i>
                            <span>${book.pages}p</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('') : `
            <div class="col-span-full card text-center py-12">
                <i data-lucide="book-x" class="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50"></i>
                <h3 class="font-semibold mb-2 text-muted-foreground">Nenhum livro encontrado</h3>
                <p class="text-sm text-muted-foreground">Tente ajustar os filtros ou buscar por outros termos</p>
            </div>
        `;
        
        const booksGrid = document.getElementById('books-grid');
        if (booksGrid) {
            booksGrid.innerHTML = booksHtml;
            lucide.createIcons();
        }
    };
    
    container.innerHTML = `
        <div class="max-w-7xl mx-auto p-6">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h2 class="text-2xl font-bold mb-2">Acervo Digital</h2>
                    <p class="text-muted-foreground">Explore nossa biblioteca com livros técnicos e acadêmicos</p>
                </div>
            </div>
            
            <div class="mb-6 flex flex-col sm:flex-row gap-3">
                <div class="flex-1">
                    <div class="relative">
                        <input type="text" id="book-search" placeholder="Buscar por título, autor ou categoria..." class="w-full px-4 py-3 pl-12 bg-white dark:bg-gray-800 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <i data-lucide="search" class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"></i>
                    </div>
                </div>
                <select id="book-category" class="px-4 py-3 border border-border rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Todas as Categorias</option>
                    <option value="Programação">Programação</option>
                    <option value="IA">IA</option>
                    <option value="Design">Design</option>
                    <option value="Data Science">Data Science</option>
                </select>
            </div>
            
            <!-- Resultados -->
            <div class="mb-4 flex items-center justify-between">
                <p class="text-sm text-muted-foreground" id="book-count">${mockBooks.length} livros disponíveis</p>
                <button onclick="clearBookFilters()" class="text-sm text-blue-600 hover:text-blue-700 font-medium hidden" id="clear-filters">
                    <i data-lucide="x" class="w-4 h-4 inline mr-1"></i>
                    Limpar filtros
                </button>
            </div>
            
            <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-6" id="books-grid">
                ${mockBooks.map(book => `
                    <div class="card hover:shadow-purple cursor-pointer p-0 overflow-hidden transition-all group" onclick="showBookDetails(${book.id})">
                        <div class="aspect-[3/4] overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
                            <img src="${book.cover}" alt="${book.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                        </div>
                        <div class="p-4">
                            <h3 class="font-semibold mb-1 line-clamp-2">${book.title}</h3>
                            <p class="text-sm text-muted-foreground mb-3">${book.author}</p>
                            <div class="flex items-center justify-between">
                                <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-xs font-medium">${book.category}</span>
                                <div class="flex items-center gap-1 text-xs text-muted-foreground">
                                    <i data-lucide="book-open" class="w-3 h-3"></i>
                                    <span>${book.pages}p</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Add event listeners for search and filter
    setTimeout(() => {
        const searchInput = document.getElementById('book-search');
        const categorySelect = document.getElementById('book-category');
        
        const filterBooks = () => {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedCategory = categorySelect.value;
            
            let filtered = mockBooks.filter(book => {
                const matchesSearch = 
                    book.title.toLowerCase().includes(searchTerm) ||
                    book.author.toLowerCase().includes(searchTerm) ||
                    book.category.toLowerCase().includes(searchTerm);
                
                const matchesCategory = !selectedCategory || book.category === selectedCategory;
                
                return matchesSearch && matchesCategory;
            });
            
            // Update book count
            const bookCount = document.getElementById('book-count');
            if (bookCount) {
                bookCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'livro' : 'livros'} ${filtered.length !== mockBooks.length ? 'encontrado' + (filtered.length === 1 ? '' : 's') : 'disponíveis'}`;
            }
            
            // Show/hide clear filters button
            const clearBtn = document.getElementById('clear-filters');
            if (clearBtn) {
                if (searchTerm || selectedCategory) {
                    clearBtn.classList.remove('hidden');
                } else {
                    clearBtn.classList.add('hidden');
                }
            }
            
            renderBooks(filtered);
        };
        
        if (searchInput) {
            searchInput.addEventListener('input', filterBooks);
        }
        
        if (categorySelect) {
            categorySelect.addEventListener('change', filterBooks);
        }
    }, 100);
}

function clearBookFilters() {
    const searchInput = document.getElementById('book-search');
    const categorySelect = document.getElementById('book-category');
    
    if (searchInput) searchInput.value = '';
    if (categorySelect) categorySelect.value = '';
    
    // Trigger filter update
    if (searchInput) {
        searchInput.dispatchEvent(new Event('input'));
    }
}

// Friend Suggestions (Sugestões de Amizade)
function renderFriendSuggestions(container) {
    container.innerHTML = `
        <div class="max-w-6xl mx-auto p-6">
            <div class="mb-6">
                <h2 class="text-2xl font-bold mb-2">Sugestões de Amizade</h2>
                <p class="text-muted-foreground">Conecte-se com pessoas que compartilham seus interesses</p>
            </div>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6" id="friends-grid">
                ${mockFriendSuggestions.map(friend => `
                    <div class="card hover:shadow-blue transition-all relative overflow-hidden" id="friend-card-${friend.id}">
                        <!-- Header Gradiente -->
                        <div class="absolute top-0 left-0 right-0 h-20 bg-gradient-to-br from-blue-500 to-purple-500 -m-6 mb-0"></div>
                        
                        <!-- Conteúdo -->
                        <div class="relative text-center">
                            <!-- Foto de Perfil -->
                            <div class="w-24 h-24 mx-auto mb-4 mt-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-xl overflow-hidden border-4 border-white dark:border-gray-800">
                                <img src="${friend.image}" alt="${friend.name}" class="w-full h-full object-cover" onerror="this.style.display='none'; this.parentElement.innerHTML='${friend.avatar}';">
                            </div>
                            
                            <!-- Informações -->
                            <h3 class="font-semibold mb-1">${friend.name}</h3>
                            <p class="text-sm text-muted-foreground mb-3">${friend.role}</p>
                            
                            <!-- Badges -->
                            <div class="flex flex-wrap gap-2 justify-center mb-4">
                                <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-xs font-medium flex items-center gap-1">
                                    <i data-lucide="users" class="w-3 h-3"></i>
                                    ${friend.mutualFriends} em comum
                                </span>
                            </div>
                        </div>
                        
                        <!-- Botões de Ação -->
                        <div class="flex gap-2 mt-4">
                            <button 
                                id="add-friend-btn-${friend.id}" 
                                onclick="addFriend(${friend.id})" 
                                class="flex-1 btn-primary py-2 px-4 transition-all"
                            >
                                <i data-lucide="user-plus" class="w-4 h-4 inline mr-2"></i>
                                <span id="add-friend-text-${friend.id}">Adicionar</span>
                            </button>
                            <button onclick="removeFriendSuggestion(${friend.id})" class="btn-secondary py-2 px-4" title="Remover sugestão">
                                <i data-lucide="x" class="w-4 h-4 inline"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Modals e Interações
function showBookDetails(bookId) {
    const book = mockBooks.find(b => b.id === bookId);
    if (!book) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content p-0 max-w-4xl max-h-[90vh] overflow-y-auto">
            <div class="relative">
                <!-- Header com fundo gradiente -->
                <div class="relative h-48 bg-gradient-to-br from-blue-600 to-purple-600 overflow-hidden">
                    <div class="absolute inset-0 bg-black/20"></div>
                    <button onclick="this.closest('.modal').remove()" class="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-all z-10 text-white">
                        <i data-lucide="x" class="w-5 h-5"></i>
                    </button>
                    <div class="absolute bottom-4 left-4 right-4">
                        <span class="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium">${book.category}</span>
                    </div>
                </div>
                
                <div class="p-6">
                    <div class="grid md:grid-cols-5 gap-8">
                        <!-- Capa do livro -->
                        <div class="md:col-span-2">
                            <div class="-mt-32 mb-6">
                                <div class="aspect-[3/4] overflow-hidden rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 shadow-2xl border-4 border-white dark:border-gray-800">
                                    <img src="${book.cover}" alt="${book.title}" class="w-full h-full object-cover">
                                </div>
                            </div>
                            
                            <!-- Estatísticas -->
                            <div class="space-y-3 p-4 bg-muted rounded-lg">
                                <div class="flex items-center justify-between text-sm">
                                    <span class="text-muted-foreground">Páginas</span>
                                    <span class="font-semibold">${book.pages}</span>
                                </div>
                                <div class="flex items-center justify-between text-sm">
                                    <span class="text-muted-foreground">Ano</span>
                                    <span class="font-semibold">${book.year}</span>
                                </div>
                                <div class="flex items-center justify-between text-sm">
                                    <span class="text-muted-foreground">Formato</span>
                                    <span class="font-semibold">PDF</span>
                                </div>
                                <div class="flex items-center justify-between text-sm">
                                    <span class="text-muted-foreground">Idioma</span>
                                    <span class="font-semibold">Português</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Informações do livro -->
                        <div class="md:col-span-3">
                            <h2 class="text-3xl font-bold mb-2">${book.title}</h2>
                            <p class="text-lg text-muted-foreground mb-6">por <span class="text-blue-600 font-medium">${book.author}</span></p>
                            
                            <!-- Avaliação -->
                            <div class="flex items-center gap-4 mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                                <div class="flex gap-1">
                                    ${[1,2,3,4,5].map(i => `
                                        <i data-lucide="star" class="w-5 h-5 ${i <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}"></i>
                                    `).join('')}
                                </div>
                                <span class="font-semibold">4.5</span>
                                <span class="text-sm text-muted-foreground">(234 avaliações)</span>
                            </div>
                            
                            <!-- Descrição -->
                            <div class="mb-6">
                                <h3 class="font-semibold mb-3 flex items-center gap-2">
                                    <i data-lucide="file-text" class="w-5 h-5 text-blue-600"></i>
                                    Sobre o Livro
                                </h3>
                                <p class="text-muted-foreground leading-relaxed">${book.description}</p>
                            </div>
                            
                            <!-- O que você vai aprender -->
                            <div class="mb-6">
                                <h3 class="font-semibold mb-3 flex items-center gap-2">
                                    <i data-lucide="lightbulb" class="w-5 h-5 text-purple-600"></i>
                                    O que você vai aprender
                                </h3>
                                <ul class="space-y-2">
                                    ${['Conceitos fundamentais e práticas avançadas', 'Exemplos práticos e aplicações reais', 'Exercícios e estudos de caso'].map(item => `
                                        <li class="flex items-start gap-2 text-sm text-muted-foreground">
                                            <i data-lucide="check-circle" class="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"></i>
                                            <span>${item}</span>
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                            
                            <!-- Botões de ação -->
                            <div class="flex gap-3 pt-4 border-t border-border">
                                <button onclick="readBook(${book.id})" class="btn-primary flex-1">
                                    <i data-lucide="book-open" class="w-4 h-4 inline mr-2"></i>
                                    Ler Agora
                                </button>
                                <button onclick="downloadBook(${book.id})" class="btn-secondary flex-1">
                                    <i data-lucide="download" class="w-4 h-4 inline mr-2"></i>
                                    Baixar PDF
                                </button>
                                <button class="btn-secondary px-4">
                                    <i data-lucide="bookmark" class="w-4 h-4"></i>
                                </button>
                                <button class="btn-secondary px-4">
                                    <i data-lucide="share-2" class="w-4 h-4"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    lucide.createIcons();
}

function readBook(bookId) {
    const book = mockBooks.find(b => b.id === bookId);
    if (book) {
        alert(`Abrindo "${book.title}" para leitura... 📖`);
        // Aqui você implementaria a lógica real de leitura
    }
}

function downloadBook(bookId) {
    const book = mockBooks.find(b => b.id === bookId);
    if (book) {
        alert(`Download de "${book.title}" iniciado! 📥`);
        // Aqui você implementaria a lógica real de download
    }
}

function addFriend(friendId) {
    const friend = mockFriendSuggestions.find(f => f.id === friendId);
    if (!friend || friend.added) return;
    
    // Marcar como adicionado
    friend.added = true;
    
    // Atualizar o botão
    const btn = document.getElementById(`add-friend-btn-${friendId}`);
    const btnText = document.getElementById(`add-friend-text-${friendId}`);
    
    if (btn && btnText) {
        // Animação de sucesso
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary', 'pointer-events-none');
        btn.disabled = true;
        
        // Atualizar ícone e texto
        const icon = btn.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', 'check-circle');
            lucide.createIcons();
        }
        btnText.textContent = 'Solicitação Enviada';
        
        // Feedback visual adicional
        const card = document.getElementById(`friend-card-${friendId}`);
        if (card) {
            card.classList.add('opacity-75');
        }
        
        // Mostrar toast de sucesso
        showToast(`Solicitação de amizade enviada para ${friend.name}! ✨`, 'success');
    }
}

function removeFriendSuggestion(friendId) {
    const card = document.getElementById(`friend-card-${friendId}`);
    if (card) {
        // Animação de saída
        card.style.transition = 'all 0.3s ease-out';
        card.style.transform = 'scale(0.9)';
        card.style.opacity = '0';
        
        setTimeout(() => {
            card.remove();
            
            // Verificar se ainda há cards
            const grid = document.getElementById('friends-grid');
            if (grid && grid.children.length === 0) {
                grid.innerHTML = `
                    <div class="col-span-full card text-center py-12">
                        <i data-lucide="users" class="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50"></i>
                        <h3 class="font-semibold mb-2 text-muted-foreground">Sem mais sugestões</h3>
                        <p class="text-sm text-muted-foreground">Você revisou todas as sugestões de amizade disponíveis!</p>
                    </div>
                `;
                lucide.createIcons();
            }
        }, 300);
    }
}

function showToast(message, type = 'info') {
    // Criar elemento de toast
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
    
    // Remover após 3 segundos
    setTimeout(() => {
        toast.style.transition = 'all 0.3s ease-out';
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

function openCreatePostModal() {
    alert('Modal de criar post aberto! (Implementação completa em breve)');
}

function sendAIQuestion() {
    const input = document.getElementById('ai-input');
    if (input && input.value.trim()) {
        alert(`Pergunta enviada: ${input.value}`);
        input.value = '';
    }
}

function sendPredefinedQuestion(question) {
    alert(`Pergunta enviada: ${question}`);
}

// Toggle Sidebar (Mobile)
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

// Toggle Theme
function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const icon = document.getElementById('theme-icon');
    const isDark = document.documentElement.classList.contains('dark');
    icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
    lucide.createIcons();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});
