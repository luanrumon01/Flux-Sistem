'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  TrendingUp,
  Search,
  Plus,
  ChevronRight,
  MoreVertical,
  Calendar,
  MessageSquare,
  Sparkles,
  Bot,
  User,
  Settings,
  Mail,
  Phone,
  DollarSign,
  Briefcase,
  AlertCircle,
  Clock,
  Trash2,
  X,
  FileText,
  UserCheck,
  CheckCircle,
  Database,
  ArrowRight,
  Send,
  Building,
  RefreshCw,
  LayoutDashboard,
  Users,
  UserPlus,
  Lock,
  Eye,
  EyeOff,
  LogOut
} from 'lucide-react';

// Core interface definitions
interface Lead {
  id: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  value: number;
  stage: 'Novo' | 'Em Negociação' | 'Proposta Enviada' | 'Fechado';
  priority: 'Normal' | 'Urgente';
  assigned: 'Sarah' | 'Bruno' | 'Fernanda';
  icon: string;
  notes: string;
  date: string;
}

interface Contact {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  role: string;
  notes: string;
  dateAdded: string;
}

interface Activity {
  id: string;
  day: string;
  month: string;
  title: string;
  subtitle: string;
  completed: boolean;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

// Default rich mockup data
const DEFAULT_LEADS: Lead[] = [
  {
    id: 'lead-1',
    company: 'TechFlow Solutions',
    contact: 'Ricardo Almeida',
    email: 'ricardo@techflow.com.br',
    phone: '(11) 98765-4321',
    value: 15000,
    stage: 'Novo',
    priority: 'Normal',
    assigned: 'Bruno',
    icon: 'building',
    notes: 'Interessado em soluções Enterprise de automação e integração de fluxos.',
    date: '2 dias atrás'
  },
  {
    id: 'lead-2',
    company: 'Nova Digital',
    contact: 'Mariana Costa',
    email: 'mariana.costa@novadigital.com',
    phone: '(21) 99123-4567',
    value: 42800,
    stage: 'Em Negociação',
    priority: 'Normal',
    assigned: 'Sarah',
    icon: 'rocket',
    notes: 'Reunião de escopo feita. Solicitou orçamento de migração em nuvem dedicada.',
    date: '1 dia atrás'
  },
  {
    id: 'lead-3',
    company: 'Varejo Plus',
    contact: 'Sérgio Mendes',
    email: 'sergio@varejoplus.tech',
    phone: '(19) 98144-8899',
    value: 8500,
    stage: 'Fechado',
    priority: 'Normal',
    assigned: 'Sarah',
    icon: 'store',
    notes: 'Contrato assinado! Integração de gateways de pagamento iniciada no início desta semana.',
    date: '3 dias atrás'
  },
  {
    id: 'lead-4',
    company: 'BioMed Clinic',
    contact: 'Dr. Fabio Silva',
    email: 'contato@biomedclinic.com.br',
    phone: '(11) 97555-4422',
    value: 22100,
    stage: 'Novo',
    priority: 'Urgente',
    assigned: 'Fernanda',
    icon: 'heart',
    notes: 'Precisa de sistema de agendamento de consultas seguro compatível com a LGPD e HIPAA.',
    date: '5 horas atrás'
  },
  {
    id: 'lead-5',
    company: 'Engenharia Global',
    contact: 'Beatriz Ramos',
    email: 'beatriz.ramos@engglobal.org',
    phone: '(31) 98877-3311',
    value: 115000,
    stage: 'Em Negociação',
    priority: 'Urgente',
    assigned: 'Fernanda',
    icon: 'wrench',
    notes: 'Sócio-administrador sênior demonstrou urgência extrema na assinatura do projeto.',
    date: '6 horas atrás'
  },
  {
    id: 'lead-6',
    company: 'Tech Solutions SA',
    contact: 'Carlos Mendes',
    email: 'carlos@techsolutions.com',
    phone: '(11) 99222-1144',
    value: 45000,
    stage: 'Novo',
    priority: 'Normal',
    assigned: 'Bruno',
    icon: 'building',
    notes: 'Solicitou as informações técnicas de escalabilidade vertical de microsserviços integrados.',
    date: '2 dias atrás'
  },
  {
    id: 'lead-7',
    company: 'BioGrowth Ltd',
    contact: 'Fernanda Lima',
    email: 'fernanda.lima@biogrowth.co.uk',
    phone: '(11) 99311-2244',
    value: 12500,
    stage: 'Novo',
    priority: 'Urgente',
    assigned: 'Sarah',
    icon: 'science',
    notes: 'Pesquisa de mercado e levantamento de infraestrutura farmacêutica regulada em andamento.',
    date: '5 horas atrás'
  },
  {
    id: 'lead-8',
    company: 'LogiTrans Corp',
    contact: 'Roberto Justo',
    email: 'r.justo@logitrans.com',
    phone: '(81) 98122-3344',
    value: 280000,
    stage: 'Em Negociação',
    priority: 'Normal',
    assigned: 'Fernanda',
    icon: 'truck',
    notes: 'Maior lead potencial do quadrimestre. Apresentação customizada agendada com o conselho gestor executivo.',
    date: 'Agendado'
  },
  {
    id: 'lead-9',
    company: 'Global Retail',
    contact: 'Juliana Rocha',
    email: 'juliana@globalretail.com',
    phone: '(11) 99444-5555',
    value: 850000,
    stage: 'Proposta Enviada',
    priority: 'Urgente',
    assigned: 'Bruno',
    icon: 'domain',
    notes: 'Contrato comercial preliminar enviado via DocuSign. Advogados revisando minuta nesta semana.',
    date: 'Aguardando assinatura'
  }
];

const DEFAULT_ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    day: '14',
    month: 'Out',
    title: 'Reunião com Sarah',
    subtitle: 'Follow-up Proposta Tech',
    completed: false
  },
  {
    id: 'act-2',
    day: '15',
    month: 'Out',
    title: 'Demo Flux Pro',
    subtitle: 'Cliente: Grupo Solar',
    completed: false
  },
  {
    id: 'act-3',
    day: '17',
    month: 'Out',
    title: 'Call de Fechamento',
    subtitle: 'Contrato Alpha 2026',
    completed: false
  }
];

const DEFAULT_CONTACTS: Contact[] = [
  { id: 'contact-1', name: 'Ricardo Almeida', company: 'TechFlow Solutions', email: 'ricardo@techflow.com.br', phone: '(11) 98765-4321', role: 'Diretor de Operações', notes: 'Interessado em soluções Enterprise de automação de processos.', dateAdded: '10 de Mai, 2026' },
  { id: 'contact-2', name: 'Mariana Costa', company: 'Nova Digital', email: 'mariana.costa@novadigital.com', phone: '(21) 99123-4567', role: 'Gerente de TI', notes: 'Iniciou conversação sobre migração em nuvem.', dateAdded: '12 de Mai, 2026' },
  { id: 'contact-3', name: 'Sérgio Mendes', company: 'Varejo Plus', email: 'sergio@varejoplus.tech', phone: '(19) 98144-8899', role: 'Sócio-Fundador', notes: 'Contrato assinado recentemente para gateways.', dateAdded: '15 de Mai, 2026' },
  { id: 'contact-4', name: 'Dr. Fabio Silva', company: 'BioMed Clinic', email: 'contato@biomedclinic.com.br', phone: '(11) 97555-4422', role: 'Diretor Clínico', notes: 'Busca conformidade com a LGPD e HIPAA.', dateAdded: '20 de Mai, 2026' },
  { id: 'contact-5', name: 'Beatriz Ramos', company: 'Engenharia Global', email: 'beatriz.ramos@engglobal.org', phone: '(31) 98877-3311', role: 'Diretora Comercial Sênior', notes: 'Solução sob medida para controle de obras.', dateAdded: '21 de Mai, 2026' },
  { id: 'contact-6', name: 'Carlos Mendes', company: 'Tech Solutions SA', email: 'carlos@techsolutions.com', phone: '(11) 99222-1144', role: 'Engenheiro Chefe', notes: 'Foco em escalabilidade técnica de microsserviços.', dateAdded: '22 de Mai, 2026' },
  { id: 'contact-7', name: 'Fernanda Lima', company: 'BioGrowth Ltd', email: 'fernanda.lima@biogrowth.co.uk', phone: '(11) 99311-2244', role: 'Head de Inovação', notes: 'Migrando ecossistema científico legacy.', dateAdded: '24 de Mai, 2026' },
  { id: 'contact-8', name: 'Roberto Justo', company: 'LogiTrans Corp', email: 'r.justo@logitrans.com', phone: '(81) 98122-3344', role: 'Diretor de Logística', notes: 'Lead estratégico com alta probabilidade de fechamento enterprise.', dateAdded: '25 de Mai, 2026' },
  { id: 'contact-9', name: 'Juliana Rocha', company: 'Global Retail', email: 'juliana@globalretail.com', phone: '(11) 99444-5555', role: 'Head de Suprimentos', notes: 'Aguardando revisão jurídica do contrato comercial.', dateAdded: '28 de Mai, 2026' }
];

export default function FluxCrm() {
  // Authentication state & handlers
  const [mounted, setMounted] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [userProfile, setUserProfile] = useState<{name: string, email: string}>({ name: 'Luan Rumon', email: 'luan.rumon@gmail.com' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Por favor preencha todos os campos.');
      return;
    }

    const savedUsers = typeof window !== 'undefined' ? localStorage.getItem('flux_crm_registered_users') : null;
    const users = savedUsers ? JSON.parse(savedUsers) : [];
    const matchedUser = users.find((u: any) => u.email.toLowerCase() === loginEmail.toLowerCase() && u.password === loginPassword);

    if ((loginEmail.toLowerCase() === 'luan.rumon@gmail.com' && loginPassword === '123') || matchedUser) {
      setIsAuthenticated(true);
      localStorage.setItem('flux_crm_authenticated', 'true');
      const profileInfo = matchedUser ? { name: matchedUser.name, email: matchedUser.email } : { name: 'Luan Rumon', email: 'luan.rumon@gmail.com' };
      setUserProfile(profileInfo);
      localStorage.setItem('flux_crm_user_profile', JSON.stringify(profileInfo));
      
      // Update assistant message with user's name
      setChatMessages([
        {
          id: 'welcome',
          role: 'assistant',
          text: `Olá ${profileInfo.name.split(' ')[0]}! Eu sou o assistente inteligente Flux AI. Posso ajudar você a analisar a performance do seu funil, tirar insights sobre os leads ou rascunhar estratégias de vendas. O que deseja analisar hoje?`
        }
      ]);
    } else {
      setLoginError('Usuário ou senha incorretos. Experimente luan.rumon@gmail.com com a senha "123", ou crie uma nova conta.');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setLoginError('Por favor preencha todos os campos para registro.');
      return;
    }

    const savedUsers = typeof window !== 'undefined' ? localStorage.getItem('flux_crm_registered_users') : null;
    const users = savedUsers ? JSON.parse(savedUsers) : [];
    if (regEmail.toLowerCase() === 'luan.rumon@gmail.com' || users.some((u: any) => u.email.toLowerCase() === regEmail.toLowerCase())) {
      setLoginError('Este e-mail já está em uso.');
      return;
    }

    const newUser = { name: regName, email: regEmail, password: regPassword };
    users.push(newUser);
    localStorage.setItem('flux_crm_registered_users', JSON.stringify(users));

    setIsAuthenticated(true);
    localStorage.setItem('flux_crm_authenticated', 'true');
    const profileInfo = { name: regName, email: regEmail };
    setUserProfile(profileInfo);
    localStorage.setItem('flux_crm_user_profile', JSON.stringify(profileInfo));
    
    // Update assistant message with user's name
    setChatMessages([
      {
        id: 'welcome',
        role: 'assistant',
        text: `Olá ${profileInfo.name.split(' ')[0]}! Eu sou o assistente inteligente Flux AI. Posso ajudar você a analisar a performance do seu funil, tirar insights sobre os leads ou rascunhar estratégias de vendas. O que deseja analisar hoje?`
      }
    ]);

    setRegName('');
    setRegEmail('');
    setRegPassword('');
    setIsRegistering(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('flux_crm_authenticated');
    setLoginPassword('');
    setLoginError('');
  };

  // Navigation & States
  const [activeTab, setActiveTab] = useState<'dashboard' | 'leads' | 'pipeline' | 'profile'>('dashboard');
  const [leads, setLeads] = useState<Lead[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('flux_crm_leads_data');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return DEFAULT_LEADS;
        }
      }
    }
    return DEFAULT_LEADS;
  });
  
  const [activities, setActivities] = useState<Activity[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('flux_crm_activities');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return DEFAULT_ACTIVITIES;
        }
      }
    }
    return DEFAULT_ACTIVITIES;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [leadFilter, setLeadFilter] = useState<'Todos' | 'Novo' | 'Em Negociação' | 'Proposta Enviada' | 'Fechado'>('Todos');

  // Lead detailing modals & slide-overs
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isAddingLead, setIsAddingLead] = useState(false);
  const [isEditingLead, setIsEditingLead] = useState(false);

  // subTab inside Leads tab
  const [leadsSubView, setLeadsSubView] = useState<'leads' | 'contacts'>('leads');

  // Contacts States
  const [contacts, setContacts] = useState<Contact[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('flux_crm_contacts_data');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return DEFAULT_CONTACTS;
        }
      }
    }
    return DEFAULT_CONTACTS;
  });

  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);

  // New Contact fields
  const [newContactName, setNewContactName] = useState('');
  const [newContactCompany, setNewContactCompany] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactRole, setNewContactRole] = useState('');
  const [newContactNotes, setNewContactNotes] = useState('');

  // Editing Contact copy helper fields
  const [editContactId, setEditContactId] = useState('');
  const [editContactName, setEditContactName] = useState('');
  const [editContactCompany, setEditContactCompany] = useState('');
  const [editContactEmail, setEditContactEmail] = useState('');
  const [editContactPhone, setEditContactPhone] = useState('');
  const [editContactRole, setEditContactRole] = useState('');
  const [editContactNotes, setEditContactNotes] = useState('');

  // Whether we are using an existing contact in the Lead creation form
  const [useExistingContactInForm, setUseExistingContactInForm] = useState(false);
  const [formSelectedContactId, setFormSelectedContactId] = useState('');

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const handleCopyText = (text: string, id: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    }
  };

  // New Lead inputs
  const [newCompany, setNewCompany] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newStage, setNewStage] = useState<Lead['stage']>('Novo');
  const [newPriority, setNewPriority] = useState<Lead['priority']>('Normal');
  const [newAssigned, setNewAssigned] = useState<Lead['assigned']>('Sarah');
  const [newNotes, setNewNotes] = useState('');

  // AI Service integration state
  const [aiLoading, setAiLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState('');
  const [aiType, setAiType] = useState<'pitch' | 'insights' | null>(null);

  // AI Chat integration inside Profile tab
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome',
      role: 'assistant',
      text: `Olá ${userProfile.name.split(' ')[0]}! Eu sou o assistente inteligente Flux AI. Posso ajudar você a analisar a performance do seu funil, tirar insights sobre os leads ou rascunhar estratégias de vendas. O que deseja analisar hoje?`
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  // Load from local storage / Set fallbacks
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      if (typeof window !== 'undefined') {
        const auth = localStorage.getItem('flux_crm_authenticated') === 'true';
        setIsAuthenticated(auth);

        const savedProfile = localStorage.getItem('flux_crm_user_profile');
        if (savedProfile) {
          try {
            const parsed = JSON.parse(savedProfile);
            setUserProfile(parsed);
            setChatMessages([
              {
                id: 'welcome',
                role: 'assistant',
                text: `Olá ${parsed.name.split(' ')[0]}! Eu sou o assistente inteligente Flux AI. Posso ajudar você a analisar a performance do seu funil, tirar insights sobre os leads ou rascunhar estratégias de vendas. O que deseja analisar hoje?`
              }
            ]);
          } catch (_) {}
        }
      }
    }, 0);

    if (typeof window !== 'undefined') {
      if (!localStorage.getItem('flux_crm_leads_data')) {
        localStorage.setItem('flux_crm_leads_data', JSON.stringify(DEFAULT_LEADS));
      }
      if (!localStorage.getItem('flux_crm_activities')) {
        localStorage.setItem('flux_crm_activities', JSON.stringify(DEFAULT_ACTIVITIES));
      }
      if (!localStorage.getItem('flux_crm_contacts_data')) {
        localStorage.setItem('flux_crm_contacts_data', JSON.stringify(DEFAULT_CONTACTS));
      }
    }

    return () => clearTimeout(timer);
  }, []);

  // Save to local storage helper
  const saveLeadsToStorage = (updatedLeads: Lead[]) => {
    setLeads(updatedLeads);
    localStorage.setItem('flux_crm_leads_data', JSON.stringify(updatedLeads));
  };

  const saveActivitiesToStorage = (updatedActs: Activity[]) => {
    setActivities(updatedActs);
    localStorage.setItem('flux_crm_activities', JSON.stringify(updatedActs));
  };

  const saveContactsToStorage = (updatedContacts: Contact[]) => {
    setContacts(updatedContacts);
    localStorage.setItem('flux_crm_contacts_data', JSON.stringify(updatedContacts));
  };

  // Reset demo database
  const resetDatabase = () => {
    if (window.confirm('Tem certeza de que deseja resetar os dados do CRM para os padrões iniciais? Isso apagará suas modificações recentes.')) {
      saveLeadsToStorage(DEFAULT_LEADS);
      saveActivitiesToStorage(DEFAULT_ACTIVITIES);
      saveContactsToStorage(DEFAULT_CONTACTS);
      setChatMessages([
        {
          id: 'welcome',
          role: 'assistant',
          text: 'Base de dados restaurada com sucesso! O Flux AI está pronto para ajudar novamente.'
        }
      ]);
      alert('CRM sincronizado com sucesso para dados premium originais de demonstração!');
    }
  };

  // Create contact
  const handleAddContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName.trim()) {
      alert('Por favor preencha pelo menos o Nome do Contato.');
      return;
    }

    const item: Contact = {
      id: 'contact-' + Date.now(),
      name: newContactName,
      company: newContactCompany || 'Individual / S/A',
      email: newContactEmail || `${newContactName.toLowerCase().replace(/\s+/g, '')}@${(newContactCompany || 'empresa').toLowerCase().replace(/\s+/g, '')}.com`,
      phone: newContactPhone || '(11) 90000-0000',
      role: newContactRole || 'Contato de Negócios',
      notes: newContactNotes || 'Nenhuma nota registrada.',
      dateAdded: new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    saveContactsToStorage([item, ...contacts]);

    // Reset fields
    setNewContactName('');
    setNewContactCompany('');
    setNewContactEmail('');
    setNewContactPhone('');
    setNewContactRole('');
    setNewContactNotes('');

    setIsAddingContact(false);
  };

  // Update contact
  const handleUpdateContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editContactId) return;

    const updated = contacts.map((c) => {
      if (c.id === editContactId) {
        return {
          ...c,
          name: editContactName,
          company: editContactCompany,
          email: editContactEmail,
          phone: editContactPhone,
          role: editContactRole,
          notes: editContactNotes
        };
      }
      return c;
    });

    saveContactsToStorage(updated);

    // Cascade updates to leads whose contact name matches!
    const oldContact = contacts.find(c => c.id === editContactId);
    if (oldContact) {
      const updatedLeads = leads.map((l) => {
        if (l.contact === oldContact.name) {
          return {
            ...l,
            contact: editContactName,
            email: editContactEmail || l.email,
            phone: editContactPhone || l.phone,
            company: editContactCompany || l.company
          };
        }
        return l;
      });
      saveLeadsToStorage(updatedLeads);
    }

    setIsEditingContact(false);
    setSelectedContact(null);
  };

  // Delete contact
  const handleDeleteContact = (id: string) => {
    const contactToDelete = contacts.find(c => c.id === id);
    if (!contactToDelete) return;

    if (window.confirm(`Tem certeza que deseja remover o contato ${contactToDelete.name}?`)) {
      const updated = contacts.filter((c) => c.id !== id);
      saveContactsToStorage(updated);
      setSelectedContact(null);
    }
  };

  // Metric Calculation
  const totalLeadsCount = leads.length;
  const totalLeadsValue = leads.reduce((sum, lead) => sum + lead.value, 0);

  // Closed Sales metric
  const closedSalesList = leads.filter((l) => l.stage === 'Fechado');
  const closedSalesTotal = closedSalesList.reduce((sum, l) => sum + l.value, 0);

  // Conversion rate (Closed vs Total)
  const conversionRate = totalLeadsCount > 0 ? ((closedSalesList.length / totalLeadsCount) * 100).toFixed(1) : '0';

  // Toggle activity
  const handleToggleActivity = (id: string) => {
    const updated = activities.map((act) => {
      if (act.id === id) return { ...act, completed: !act.completed };
      return act;
    });
    saveActivitiesToStorage(updated);
  };

  // Add brand new activity
  const [newActTitle, setNewActTitle] = useState('');
  const [newActSubtitle, setNewActSubtitle] = useState('');
  const [showAddAct, setShowAddAct] = useState(false);

  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActTitle.trim()) return;

    const newAct: Activity = {
      id: 'act-' + Date.now(),
      day: new Date().getDate().toString(),
      month: new Date().toLocaleString('pt-BR', { month: 'short' }).replace('.', ''),
      title: newActTitle,
      subtitle: newActSubtitle || 'Tarefa inserida hoje',
      completed: false
    };

    saveActivitiesToStorage([...activities, newAct]);
    setNewActTitle('');
    setNewActSubtitle('');
    setShowAddAct(false);
  };

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.assigned.toLowerCase().includes(searchQuery.toLowerCase());

    if (leadFilter === 'Todos') return matchesSearch;
    return lead.stage === leadFilter && matchesSearch;
  });

  // Filtered Contacts
  const filteredContacts = contacts.filter((c) => {
    const query = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(query) ||
      c.company.toLowerCase().includes(query) ||
      c.email.toLowerCase().includes(query) ||
      c.role.toLowerCase().includes(query)
    );
  });

  // Action: Add lead
  const handleAddLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let companyVal = newCompany.trim();
    let contactVal = newContact.trim();
    let emailVal = newEmail.trim();
    let phoneVal = newPhone.trim();

    // If using an existing contact
    if (useExistingContactInForm && formSelectedContactId) {
      const matchC = contacts.find((c) => c.id === formSelectedContactId);
      if (matchC) {
        contactVal = matchC.name;
        companyVal = matchC.company;
        emailVal = matchC.email;
        phoneVal = matchC.phone;
      }
    }

    if (!companyVal || !contactVal || !newValue) {
      alert('Por favor preencha os campos obrigatórios (Empresa, Contato e Valor do Negócio).');
      return;
    }

    const valueNum = parseFloat(newValue.replace(/[^0-9.]/g, '')) || 0;

    const item: Lead = {
      id: 'lead-' + Date.now(),
      company: companyVal,
      contact: contactVal,
      email: emailVal || `${contactVal.toLowerCase().replace(/\s+/g, '')}@${companyVal.toLowerCase().replace(/\s+/g, '')}.com`,
      phone: phoneVal || '(11) 90000-0000',
      value: valueNum,
      stage: newStage,
      priority: newPriority,
      assigned: newAssigned,
      icon: 'building',
      notes: newNotes || 'Sem notas adicionais.',
      date: 'Recém criado'
    };

    saveLeadsToStorage([item, ...leads]);

    // Automatically register as a Contact if they typed it manually and it doesn't already exist by name
    if (!useExistingContactInForm) {
      const exists = contacts.some(c => c.name.toLowerCase() === contactVal.toLowerCase());
      if (!exists) {
        const autoContact: Contact = {
          id: 'contact-' + Date.now(),
          name: contactVal,
          company: companyVal,
          email: emailVal || `${contactVal.toLowerCase().replace(/\s+/g, '')}@${companyVal.toLowerCase().replace(/\s+/g, '')}.com`,
          phone: phoneVal || '(11) 90000-0000',
          role: 'Contato Comercial',
          notes: `Auto-cadastrado ao criar o Lead: ${companyVal}`,
          dateAdded: new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })
        };
        saveContactsToStorage([autoContact, ...contacts]);
      }
    }

    // reset fields
    setNewCompany('');
    setNewContact('');
    setNewEmail('');
    setNewPhone('');
    setNewValue('');
    setNewStage('Novo');
    setNewPriority('Normal');
    setNewAssigned('Sarah');
    setNewNotes('');

    setUseExistingContactInForm(false);
    setFormSelectedContactId('');

    setIsAddingLead(false);
  };

  // Action: Edit complete Lead
  const handleUpdateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;

    const updated = leads.map((l) => {
      if (l.id === selectedLead.id) {
        return selectedLead;
      }
      return l;
    });

    saveLeadsToStorage(updated);
    setIsEditingLead(false);
  };

  // Delete lead
  const handleDeleteLeadOnDetails = (id: string) => {
    if (window.confirm('Gostaria realmente de remover permanentemente este lead de vendas?')) {
      const remaining = leads.filter((l) => l.id !== id);
      saveLeadsToStorage(remaining);
      setSelectedLead(null);
    }
  };

  // Action: Fast stage movement
  const moveLeadToStage = (leadId: string, destStage: Lead['stage']) => {
    const updated = leads.map((l) => {
      if (l.id === leadId) {
        return { ...l, stage: destStage, date: 'Movido agora' };
      }
      return l;
    });
    saveLeadsToStorage(updated);
    // synchronize open detail modal too if matching
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, stage: destStage, date: 'Movido agora' });
    }
  };

  // Gemini AI Calling Integrations
  const triggerAiProposta = async (leadItem: Lead) => {
    setAiLoading(true);
    setAiOutput('');
    setAiType('pitch');

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate-pitch',
          lead: leadItem
        })
      });

      const data = await response.json();
      if (response.ok && data.text) {
        setAiOutput(data.text);
      } else {
        setAiOutput(data.error || 'Não foi possível gerar a proposta comercial neste momento.');
      }
    } catch (err: any) {
      setAiOutput('Ocorreu um erro ao chamar o servidor. Verifique a chave GEMINI_API_KEY.');
    } finally {
      setAiLoading(false);
    }
  };

  const triggerAiInsights = async (leadItem: Lead) => {
    setAiLoading(true);
    setAiOutput('');
    setAiType('insights');

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'lead-insights',
          lead: leadItem
        })
      });

      const data = await response.json();
      if (response.ok && data.text) {
        setAiOutput(data.text);
      } else {
        setAiOutput(data.error || 'Erro ao gerar os conselhos práticos.');
      }
    } catch (err) {
      setAiOutput('Erro ao tentar contatar o serviço de insights. Verifique a configuração.');
    } finally {
      setAiLoading(false);
    }
  };

  // Chat dashboard consulting
  const handleSendChatConsultant = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMsg = chatInput;
    const userMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      text: userMsg
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput('');
    setChatLoading(true);

    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'dashboard-chat',
          lead: userMsg,
          allLeads: leads
        })
      });

      const data = await response.json();
      const assistantMessage: ChatMessage = {
        id: 'msg-reply-' + Date.now(),
        role: 'assistant',
        text: response.ok && data.text ? data.text : (data.error || 'Não consegui formular uma resposta no momento. Configure sua chave API do Gemini.')
      };

      setChatMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: 'error-' + Date.now(),
          role: 'assistant',
          text: 'Falha técnica ao conversar com a inteligência artificial. Verifique se o backend está ativo.'
        }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="bg-[#041329] min-h-screen flex items-center justify-center font-sans text-[#d6e3ff]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#38debb] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-mono text-[#c2c6d6]">Iniciando Flux CRM...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div id="login-screen" className="bg-[#041329] text-[#d6e3ff] min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans transition-all duration-300 relative overflow-hidden">
        {/* Decorative background grid and spheres */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="w-full max-w-md bg-[#0e1c31]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 md:p-8 shadow-2xl relative z-10"
        >
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-tr from-[#38debb] to-[#4d8eff] rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-3">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
              Flux CRM &bull; Portal de Acesso
            </h1>
            <p className="text-xs text-[#c2c6d6] mt-2 max-w-sm leading-relaxed">
              {isRegistering 
                ? 'Inscreva-se na plataforma comercial inteligente' 
                : 'Faça login com seu perfil para gerenciar seus leads e pipeline'}
            </p>
          </div>

          {loginError && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }} 
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-950/40 border border-red-500/20 rounded-xl p-3 mb-4 text-xs text-red-300 flex items-start gap-2"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {!isRegistering ? (
              <motion.form 
                key="login-form"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                onSubmit={handleLogin} 
                className="space-y-4"
              >
                <div>
                  <label className="block text-[10px] text-[#c2c6d6] font-bold uppercase mb-1 tracking-wider">E-mail de Acesso</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c2c6d6]/60" />
                    <input
                      type="email"
                      required
                      placeholder="Ex: luan.rumon@gmail.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full bg-[#112036] border border-white/10 focus:ring-1 focus:ring-[#38debb] focus:border-[#38debb] pl-10 pr-4 py-2.5 text-xs rounded-xl text-white outline-none placeholder:text-white/20 transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-[10px] text-[#c2c6d6] font-bold uppercase tracking-wider">Sua Senha</label>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c2c6d6]/60" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Sua senha secreta (Dica: 123)"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full bg-[#112036] border border-white/10 focus:ring-1 focus:ring-[#38debb] focus:border-[#38debb] pl-10 pr-10 py-2.5 text-xs rounded-xl text-white outline-none placeholder:text-white/20 transition-all font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#c2c6d6]/60 hover:text-white focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#38debb] hover:bg-[#2bc4a5] text-[#002e6a] font-extrabold text-xs rounded-xl active:scale-95 transition-all uppercase tracking-wider font-mono shadow-lg shadow-[#38debb]/15 cursor-pointer mt-2"
                >
                  Entrar no Sistema
                </button>

                <div className="pt-3 text-center border-t border-white/5 mt-4">
                  <p className="text-xs text-[#c2c6d6]/70">
                    Não possui conta ainda?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setIsRegistering(true);
                        setLoginError('');
                      }}
                      className="text-[#38debb] hover:underline font-bold"
                    >
                      Cadastre-se aqui
                    </button>
                  </p>
                </div>
              </motion.form>
            ) : (
              <motion.form 
                key="register-form"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onSubmit={handleRegister} 
                className="space-y-4"
              >
                <div>
                  <label className="block text-[10px] text-[#c2c6d6] font-bold uppercase mb-1 tracking-wider">Nome Completo</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c2c6d6]/60" />
                    <input
                      type="text"
                      required
                      placeholder="Ex: Luan Rumon"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full bg-[#112036] border border-white/10 focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 pl-10 pr-4 py-2.5 text-xs rounded-xl text-white outline-none placeholder:text-white/20 transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-[#c2c6d6] font-bold uppercase mb-1 tracking-wider">E-mail de Cadastro</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c2c6d6]/60" />
                    <input
                      type="email"
                      required
                      placeholder="Ex: luan.rumon@gmail.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full bg-[#112036] border border-white/10 focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 pl-10 pr-4 py-2.5 text-xs rounded-xl text-white outline-none placeholder:text-white/20 transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-[#c2c6d6] font-bold uppercase mb-1 tracking-wider">Escolha uma Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c2c6d6]/60" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Mínimo de 3 caracteres"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full bg-[#112036] border border-white/10 focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 pl-10 pr-10 py-2.5 text-xs rounded-xl text-white outline-none placeholder:text-white/20 transition-all font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#c2c6d6]/60 hover:text-white focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#adc6ff] hover:bg-[#8daeff] text-[#002e6a] font-extrabold text-xs rounded-xl active:scale-95 transition-all uppercase tracking-wider font-mono shadow-lg shadow-blue-500/15 cursor-pointer mt-2"
                >
                  Confirmar Cadastro
                </button>

                <div className="pt-3 text-center border-t border-white/5 mt-4">
                  <p className="text-xs text-[#c2c6d6]/70">
                    Já possui uma conta?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setIsRegistering(false);
                        setLoginError('');
                      }}
                      className="text-[#38debb] hover:underline font-bold"
                    >
                      Faça login aqui
                    </button>
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  return (
    <div id="flux-crm-panel" className="bg-[#041329] text-[#d6e3ff] min-h-screen relative pb-32">
      {/* HEADER SECTION */}
      <header id="crm-header" className="sticky top-0 z-40 bg-[#112036]/85 backdrop-blur-lg border-b border-white/10 flex items-center justify-between px-4 md:px-8 h-16 w-full">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-tr from-[#38debb] to-[#4d8eff] rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/10">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-1.5 font-sans">
              Flux CRM <span className="text-[10px] bg-cyan-400/20 text-[#38debb] px-1.5 py-0.5 rounded font-mono uppercase tracking-widest font-normal">Active</span>
            </h1>
          </div>
        </div>

        {/* User Badge directly from profile requirements */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs text-white font-medium">{userProfile.name}</span>
            <span className="text-[10px] text-[#c2c6d6] opacity-75">{userProfile.email}</span>
          </div>

          <div className="flex items-center gap-2">
            {userProfile.email === 'luan.rumon@gmail.com' ? (
              <div className="w-9 h-9 rounded-full border-2 border-cyan-400/30 overflow-hidden active:scale-95 transition-transform cursor-pointer relative shadow-md shadow-cyan-500/10">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCS6GfRASVpkzDhZM5nuKY6gZbjgYXARm-cP9KBpWB53VD_3jzdGV_MPWcrxcsnzflGlVmeSoVuQThOkASxfKBktcJUtvqAe6O3-c07NFDu8B_L85nyi48UnH9S5oTQJUP1cTVBhNmYVPZy_tUu1P9B99rAuwU8lktV68P67InW9gZbyihz64gEWGQQ8p_oecbq5mLcy3Y9igrV9aU3b-NU93_wYOzxa4Kel1PbLFe-EIUNHtX83mfxxz86VkaYDUiMo_9E_Q4j397"
                  alt="User Avatar"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#adc6ff] to-[#38debb] text-black font-extrabold text-xs flex items-center justify-center shadow-md shadow-cyan-500/10 uppercase">
                {userProfile.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
            )}

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-white/5 hover:bg-red-500/15 text-[#c2c6d6] hover:text-red-400 border border-white/5 hover:border-red-500/20 active:scale-95 transition-all ml-1.5 flex items-center gap-1.5"
              title="Sair da Conta"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline text-[10px] font-bold tracking-wider uppercase font-mono">Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* RENDER ACTIVE SCREEN CONTROLLER */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pt-6">
        <AnimatePresence mode="wait">
          {/* TAB 1: DASHBOARD VIEW */}
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Bento Grid: Key CRM Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Metric 1 */}
                <div className="bg-[#112036]/70 backdrop-blur-md rounded-2xl p-5 border border-white/5 flex flex-col justify-between min-h-[135px] shadow-xl relative overflow-hidden group">
                  <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-[#4d8eff]/10 to-transparent rounded-full blur-xl pointer-events-none" />
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-xs text-[#c2c6d6] uppercase tracking-wider">Leads Ativos</span>
                    <TrendingUp className="w-5 h-5 text-[#adc6ff]" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight leading-none mt-2">
                      {totalLeadsCount}
                    </h2>
                    <p className="text-[#adc6ff] text-xs font-semibold mt-1">
                      Meta de Prospeção: 50 | {((totalLeadsCount / 50) * 100).toFixed(0)}% batido
                    </p>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-[#112036]/70 backdrop-blur-md rounded-2xl p-5 border border-white/5 flex flex-col justify-between min-h-[135px] shadow-xl relative overflow-hidden group">
                  <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-[#38debb]/10 to-transparent rounded-full blur-xl pointer-events-none" />
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-xs text-[#c2c6d6] uppercase tracking-wider">Vendas Fechadas</span>
                    <span className="text-[#38debb] text-xs px-2 py-0.5 rounded bg-[#38debb]/10 font-semibold uppercase tracking-wider font-mono">Realizado</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white tracking-tight leading-none mt-2">
                      R$ {closedSalesTotal.toLocaleString('pt-BR')}
                    </h3>
                    <p className="text-[#38debb] text-xs font-semibold mt-1">
                      Volume sob gestão: R$ {totalLeadsValue.toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-[#112036]/70 backdrop-blur-md rounded-2xl p-5 border border-white/5 flex flex-col justify-between min-h-[135px] shadow-xl relative overflow-hidden group">
                  <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-[#ffb786]/10 to-transparent rounded-full blur-xl pointer-events-none" />
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-xs text-[#c2c6d6] uppercase tracking-wider">Taxa de Conversão</span>
                    <span className="text-xs text-[#ffdcc6] font-semibold">Geral</span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white tracking-tight leading-none mt-2">
                      {conversionRate}%
                    </h3>
                    <div className="w-full bg-[#27354c] h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="bg-[#38debb] h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(parseFloat(conversionRate), 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Chart Section & Tasks */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* SVG Visualized Leads Interactive Graph Card */}
                <div className="lg:col-span-2 bg-[#112036]/70 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-white/5 shadow-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">Evolução do Funil de Leads</h3>
                      <p className="text-xs text-[#c2c6d6] opacity-75">Representação proporcional de valor e interesse de mercado</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#adc6ff]" />
                      <span className="text-xs text-[#c2c6d6] font-mono">Volume R$</span>
                    </div>
                  </div>

                  {/* Interactive SVG Curve chart representing the leads */}
                  <div className="relative h-44 w-full flex items-end">
                    <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                      <path
                        d="M0,130 Q50,110 100,120 T200,60 T300,90 T400,20"
                        fill="none"
                        stroke="#adc6ff"
                        strokeLinecap="round"
                        strokeWidth="3.5"
                        className="chart-line"
                      />
                      <path
                        d="M0,130 Q50,110 100,120 T200,60 T300,90 T400,20 V150 H0 Z"
                        fill="url(#chart-area-gradient)"
                        opacity="0.12"
                      />
                      <defs>
                        <linearGradient id="chart-area-gradient" x1="0%" x2="0%" y1="0%" y2="100%">
                          <stop offset="0%" style={{ stopColor: '#adc6ff', stopOpacity: 1 }} />
                          <stop offset="100%" style={{ stopColor: '#adc6ff', stopOpacity: 0 }} />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <div className="flex justify-between border-t border-white/5 pt-3 mt-2">
                    <div className="text-center">
                      <span className="block text-[10px] text-[#c2c6d6]/60 font-semibold uppercase">Novo</span>
                      <span className="text-xs font-semibold text-white">
                        {leads.filter((l) => l.stage === 'Novo').length} leads
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="block text-[10px] text-[#c2c6d6]/60 font-semibold uppercase">Negociando</span>
                      <span className="text-xs font-semibold text-white">
                        {leads.filter((l) => l.stage === 'Em Negociação').length} leads
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="block text-[10px] text-[#c2c6d6]/60 font-semibold uppercase">Prop. Enviada</span>
                      <span className="text-xs font-semibold text-white">
                        {leads.filter((l) => l.stage === 'Proposta Enviada').length} leads
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="block text-[10px] text-[#c2c6d6]/60 font-semibold uppercase">Fechado</span>
                      <span className="text-[#38debb] text-xs font-semibold">
                        {closedSalesList.length} fechados
                      </span>
                    </div>
                  </div>
                </div>

                {/* Upcoming Tasks block in Bento style */}
                <div className="bg-[#112036]/70 backdrop-blur-md rounded-2xl p-5 border border-white/5 shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-[#adc6ff]" /> Cronograma Recente
                      </h3>
                      <button
                        onClick={() => setShowAddAct(!showAddAct)}
                        className="text-xs text-[#38debb] font-semibold active:scale-95 transition-transform flex items-center gap-0.5"
                      >
                        {showAddAct ? 'Fechar' : '+ Novo'}
                      </button>
                    </div>

                    {showAddAct && (
                      <form onSubmit={handleCreateActivity} className="space-y-2 mb-4 bg-black/20 p-3 rounded-lg border border-white/5">
                        <input
                          type="text"
                          placeholder="Compromisso (ex: Call de fechamento)"
                          required
                          value={newActTitle}
                          onChange={(e) => setNewActTitle(e.target.value)}
                          className="w-full bg-[#0d1c32] text-xs px-2.5 py-1.5 rounded text-white border border-white/10 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                        />
                        <input
                          type="text"
                          placeholder="Subtítulo ou Cliente"
                          value={newActSubtitle}
                          onChange={(e) => setNewActSubtitle(e.target.value)}
                          className="w-full bg-[#0d1c32] text-xs px-2.5 py-1.5 rounded text-white border border-white/10 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                        />
                        <button
                          type="submit"
                          className="w-full bg-[#38debb] hover:bg-emerald-400 text-black text-xs font-bold py-1.5 rounded transition-colors"
                        >
                          Adicionar Compromisso
                        </button>
                      </form>
                    )}

                    <div className="space-y-3">
                      {activities.map((act) => (
                        <div
                          key={act.id}
                          onClick={() => handleToggleActivity(act.id)}
                          className={`p-3 rounded-xl flex items-center justify-between cursor-pointer border hover:border-white/15 transition-all ${
                            act.completed
                              ? 'bg-emerald-950/20 border-emerald-500/20 opacity-60 line-through'
                              : 'bg-[#27354c]/40 border-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-lg flex flex-col items-center justify-center font-bold text-xs ${
                              act.completed ? 'bg-emerald-500/10 text-emerald-400' : 'bg-[#0d1c32] text-white'
                            }`}>
                              <span>{act.day}</span>
                              <span className="text-[8px] uppercase">{act.month}</span>
                            </div>
                            <div>
                              <p className={`text-xs font-bold ${act.completed ? 'text-emerald-400/80' : 'text-white'}`}>
                                {act.title}
                              </p>
                              <p className="text-[10px] text-[#c2c6d6] opacity-75">{act.subtitle}</p>
                            </div>
                          </div>
                          <div>
                            <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              act.completed ? 'border-emerald-400 bg-[#38debb] text-black text-[8px] font-bold' : 'border-white/30'
                            }`}>
                              {act.completed && '✓'}
                            </span>
                          </div>
                        </div>
                      ))}
                      {activities.length === 0 && (
                        <p className="text-xs text-[#c2c6d6] opacity-60 italic text-center py-4">
                          Nenhum compromisso marcado.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4 mt-4">
                    <button
                      onClick={() => setActiveTab('leads')}
                      className="w-full py-2 bg-[#adc6ff] hover:bg-blue-300 text-[#002e6a] rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1"
                    >
                      Ver Todos os Leads <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Immediate action recommendation with Gemini AI teaser */}
              <div className="bg-gradient-to-r from-blue-900/40 via-[#112036]/80 to-[#112036]/80 backdrop-blur-md rounded-2xl p-5 border border-cyan-500/20 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-400/10 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      Consultor Flux AI Integrado
                    </h4>
                    <p className="text-xs text-[#c2c6d6]">
                      Descubra quais leads tem maior sensibilidade a preços e probabilidade de urgência imediata.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('profile');
                    // auto trigger assistance welcome
                  }}
                  className="bg-gradient-to-r from-[#adc6ff] to-[#38debb] text-black font-bold text-xs px-4 py-2.5 rounded-full hover:shadow-cyan-400/20 hover:shadow-lg transition-all active:scale-95 duration-150"
                >
                  Falar com o Assistente
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 2: LEADS VIEW */}
          {activeTab === 'leads' && (
            <motion.div
              key="leads-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Sliding switcher for Oportunidades vs Contatos */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex bg-[#112036]/80 p-1 rounded-xl border border-white/5 gap-1 shadow-inner w-full sm:w-auto">
                  <button
                    id="btn-subtab-leads"
                    onClick={() => setLeadsSubView('leads')}
                    className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                      leadsSubView === 'leads'
                        ? 'bg-[#adc6ff] text-[#002e6a] shadow-sm'
                        : 'text-[#c2c6d6] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    💼 Oportunidades (Leads)
                  </button>
                  <button
                    id="btn-subtab-contacts"
                    onClick={() => setLeadsSubView('contacts')}
                    className={`flex-1 sm:flex-initial px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                      leadsSubView === 'contacts'
                        ? 'bg-[#adc6ff] text-[#002e6a] shadow-sm'
                        : 'text-[#c2c6d6] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    👥 Base de Contatos
                  </button>
                </div>
                
                {leadsSubView === 'leads' ? (
                  <button
                    id="btn-top-add-lead"
                    onClick={() => setIsAddingLead(true)}
                    className="w-full sm:w-auto text-xs bg-[#38debb]/20 hover:bg-[#38debb] text-[#38debb] hover:text-black border border-[#38debb]/30 font-bold px-4 h-10 rounded-xl flex items-center justify-center gap-1.5 active:scale-95 duration-150 transition-all font-mono shadow-lg shadow-cyan-500/5"
                  >
                    <Plus className="w-4 h-4" /> ADICIONAR LEAD
                  </button>
                ) : (
                  <button
                    id="btn-top-add-contact"
                    onClick={() => {
                      setNewContactName('');
                      setNewContactCompany('');
                      setNewContactEmail('');
                      setNewContactPhone('');
                      setNewContactRole('');
                      setNewContactNotes('');
                      setIsAddingContact(true);
                    }}
                    className="w-full sm:w-auto text-xs bg-[#adc6ff]/20 hover:bg-[#adc6ff] text-[#adc6ff] hover:text-[#002e6a] border border-[#adc6ff]/30 font-bold px-4 h-10 rounded-xl flex items-center justify-center gap-1.5 active:scale-95 duration-150 transition-all font-mono shadow-lg"
                  >
                    <UserPlus className="w-4 h-4" /> ADICIONAR CONTATO
                  </button>
                )}
              </div>

              {/* Search, Filter menu & Quick action */}
              <div className="bg-[#112036]/60 backdrop-blur-md p-4 rounded-2xl border border-white/5 space-y-3 shadow-xl">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#c2c6d6] w-4.5 h-4.5 opacity-80" />
                  <input
                    id="leads-search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      leadsSubView === 'leads'
                        ? "Buscar leads por empresa, contato ou responsável..."
                        : "Buscar contatos por nome, cargo, empresa ou e-mail..."
                    }
                    className="w-full h-12 pl-12 pr-4 bg-[#0d1c32]/80 border border-white/5 rounded-xl text-white placeholder:text-[#c2c6d6]/60 focus:ring-2 focus:ring-cyan-500/30 focus:outline-none transition-all font-medium text-sm"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {leadsSubView === 'leads' && (
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                    {(['Todos', 'Novo', 'Em Negociação', 'Proposta Enviada', 'Fechado'] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setLeadFilter(filter)}
                        className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                          leadFilter === filter
                            ? 'bg-[#adc6ff] text-[#002e6a] shadow-md shadow-blue-500/15'
                            : 'bg-[#112036]/80 text-[#c2c6d6] hover:bg-[#27354c] border border-white/5'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Dynamic list rendering */}
              {leadsSubView === 'leads' ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <span id="label-num-leads" className="text-xs text-[#c2c6d6]/60 uppercase tracking-widest font-bold font-mono">
                      Resultados ({filteredLeads.length})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredLeads.map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => {
                          setSelectedLead(lead);
                          setAiOutput('');
                          setAiType(null);
                        }}
                        className="bg-[#112036]/40 hover:bg-[#112036]/80 backdrop-blur-md p-5 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-[#adc6ff]/30 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300 cursor-pointer group"
                      >
                        <div>
                          <div className="flex justify-between items-start">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#adc6ff]/20 to-[#4d8eff]/10 flex items-center justify-center text-[#adc6ff] group-hover:scale-105 transition-transform duration-200">
                              {lead.priority === 'Urgente' ? (
                                <AlertCircle className="w-5 h-5 text-orange-400 animate-pulse" />
                              ) : (
                                <Building className="w-5 h-5" />
                              )}
                            </div>
                            <div className="flex flex-col items-end">
                              <span className={`inline-block px-2.5 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase mb-1 ${
                                lead.stage === 'Novo'
                                  ? 'bg-cyan-500/20 text-cyan-400'
                                  : lead.stage === 'Em Negociação'
                                  ? 'bg-amber-500/20 text-amber-400'
                                  : lead.stage === 'Proposta Enviada'
                                  ? 'bg-[#df7412]/20 text-[#ffb786]'
                                  : 'bg-[#38debb]/20 text-[#38debb]'
                              }`}>
                                {lead.stage}
                              </span>
                              {lead.priority === 'Urgente' && (
                                <span className="bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wide uppercase">
                                  URGENTE
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="mt-3">
                            <h3 className="text-base font-bold text-white tracking-tight">{lead.company}</h3>
                            <p className="text-xs text-[#c2c6d6]">{lead.contact}</p>
                          </div>
                        </div>

                        <div className="border-t border-white/5 pt-3 mt-4 flex items-center justify-between">
                          <div>
                            <span className="block text-[9px] text-[#c2c6d6]/50 uppercase font-semibold">Valor do Negócio</span>
                            <span className="text-sm font-extrabold text-[#38debb]">R$ {lead.value.toLocaleString('pt-BR')}</span>
                          </div>
                          <div className="text-right">
                            <span className="block text-[9px] text-[#c2c6d6]/50 uppercase font-semibold">Responsável</span>
                            <span className="text-xs font-semibold text-white/90">{lead.assigned}</span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {filteredLeads.length === 0 && (
                      <div className="col-span-full py-16 text-center">
                        <Bot className="w-10 h-10 text-cyan-400/30 mx-auto mb-2" />
                        <p className="text-xs text-[#c2c6d6] italic">Nenhum lead correspondente aos critérios de busca.</p>
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setLeadFilter('Todos');
                          }}
                          className="text-xs text-[#38debb] font-bold mt-2"
                        >
                          Limpar filtros de busca
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <span id="label-num-contacts" className="text-xs text-[#c2c6d6]/60 uppercase tracking-widest font-bold font-mono">
                      Contatos Salvos ({filteredContacts.length})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredContacts.map((contact) => {
                      const contactLeads = leads.filter((l) => l.contact.toLowerCase() === contact.name.toLowerCase());
                      const totalCValue = contactLeads.reduce((sum, l) => sum + l.value, 0);

                      return (
                        <div
                          key={contact.id}
                          onClick={() => {
                            setSelectedContact(contact);
                          }}
                          className="bg-[#112036]/40 hover:bg-[#112036]/80 backdrop-blur-md p-5 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-[#adc6ff]/30 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                        >
                          <div>
                            <div className="flex justify-between items-start gap-2">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#adc6ff]/20 to-[#38debb]/10 border border-[#38debb]/20 flex items-center justify-center font-extrabold text-[#3aebc6] text-xs shrink-0">
                                  {contact.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                  <h3 className="text-sm font-bold text-white tracking-tight truncate group-hover:text-[#adc6ff] transition-colors">{contact.name}</h3>
                                  <p className="text-[11px] text-[#c2c6d6]/80 truncate flex items-center gap-1">
                                    <Briefcase className="w-3 h-3 text-cyan-400 shrink-0" />
                                    {contact.role}
                                  </p>
                                </div>
                              </div>
                              
                              <span className="text-[10px] bg-[#1c2a41] text-[#adc6ff] font-bold px-2 py-0.5 rounded-full shrink-0 max-w-[120px] truncate">
                                {contact.company}
                              </span>
                            </div>

                            <p className="text-xs text-[#c2c6d6]/60 italic mt-3 line-clamp-2 leading-relaxed bg-[#0b1424]/40 p-2.5 rounded-xl border border-white/5">
                              &ldquo;{contact.notes}&rdquo;
                            </p>
                          </div>

                          <div className="border-t border-white/5 pt-3 mt-4 flex items-center justify-between text-xs text-[#c2c6d6]" onClick={(e) => e.stopPropagation()}>
                            <div className="flex flex-col">
                              <span className="text-[8px] text-[#c2c6d6]/40 uppercase font-bold tracking-tight">Oportunidades</span>
                              <span className="text-[11px] font-bold text-[#38debb]">
                                {contactLeads.length} negócios ({totalCValue > 0 ? `R$ ${totalCValue.toLocaleString('pt-BR')}` : 'R$ 0'})
                              </span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleCopyText(contact.email, contact.id + '-email')}
                                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-[#c2c6d6] hover:text-white flex items-center justify-center transition-all duration-150 relative border border-white/5"
                                title="Copiar E-mail"
                              >
                                {copiedId === contact.id + '-email' ? (
                                  <span className="text-[8px] text-[#38debb] font-bold">Ok!</span>
                                ) : (
                                  <Mail className="w-3.5 h-3.5" />
                                )}
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedContact(contact);
                                }}
                                className="px-2.5 h-7 rounded-lg bg-[#27354c]/60 hover:bg-[#adc6ff] text-[#adc6ff] hover:text-[#002e6a] font-bold text-[10px] transition-all flex items-center justify-center gap-1 border border-white/5"
                              >
                                Ficha
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {filteredContacts.length === 0 && (
                      <div className="col-span-full py-16 text-center">
                        <Users className="w-10 h-10 text-cyan-400/30 mx-auto mb-2 animate-pulse" />
                        <p className="text-xs text-[#c2c6d6] italic">Nenhum contato encontrado correspondente aos critérios.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: PIPELINE VIEW */}
          {activeTab === 'pipeline' && (
            <motion.div
              key="pipeline-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h2 className="text-lg font-bold text-white">Pipeline de Vendas</h2>
                  <p className="text-xs text-[#c2c6d6]">Monitore e direcione as propostas cruzando os estágios de maturação de venda</p>
                </div>
                <button
                  onClick={() => setIsAddingLead(true)}
                  className="bg-[#adc6ff] hover:bg-blue-300 text-[#002e6a] text-xs font-extrabold px-3.5 py-2 rounded-xl active:scale-95 transition-all flex items-center gap-1 shadow-lg"
                >
                  <Plus className="w-3.5 h-3.5" /> Novo Lead
                </button>
              </div>

              {/* Kanban Horizontal columns */}
              <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-thin snap-x snap-mandatory">
                {(['Novo', 'Em Negociação', 'Proposta Enviada', 'Fechado'] as const).map((stage) => {
                  const stageLeads = leads.filter((l) => l.stage === stage);
                  const columnSumValue = stageLeads.reduce((sum, current) => sum + current.value, 0);

                  return (
                    <div
                      key={stage}
                      className="min-w-[280px] max-w-[280px] w-full bg-[#112036]/30 rounded-2xl p-4 border border-white/5 flex flex-col gap-3 snap-start"
                    >
                      {/* Column Header */}
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${
                            stage === 'Novo'
                              ? 'bg-cyan-400'
                              : stage === 'Em Negociação'
                              ? 'bg-amber-400'
                              : stage === 'Proposta Enviada'
                              ? 'bg-[#df7412]'
                              : 'bg-[#38debb]'
                          }`} />
                          <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                            {stage}
                          </h3>
                        </div>
                        <span className="bg-[#27354c]/60 text-[#adc6ff] text-[10px] px-2 py-0.5 rounded-full font-bold">
                          {stageLeads.length}
                        </span>
                      </div>

                      {/* Summary stage value */}
                      <div className="bg-black/10 px-3 py-1.5 rounded-lg border border-white/5 flex justify-between items-center text-[11px]">
                        <span className="text-[#c2c6d6]/60 uppercase font-mono">Subtotal</span>
                        <span className="font-extrabold text-[#38debb]">R$ {columnSumValue.toLocaleString('pt-BR')}</span>
                      </div>

                      {/* Cards list */}
                      <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
                        {stageLeads.map((item) => (
                          <div
                            key={item.id}
                            className="bg-[#112036]/70 p-4 rounded-xl border border-white/5 flex flex-col gap-3 hover:border-[#adc6ff]/40 transition-colors shadow relative group"
                          >
                            <div className="flex items-start justify-between">
                              <span className="font-bold text-xs text-white tracking-tight break-words pr-1.5">{item.company}</span>
                              
                              {/* Quick Move stage selector */}
                              <div className="relative group/menu">
                                <button className="text-[#c2c6d6]/60 hover:text-white p-1 rounded-md hover:bg-white/5">
                                  <MoreVertical className="w-3.5 h-3.5" />
                                </button>
                                <div className="absolute right-0 top-6 hidden group-hover/menu:block bg-[#1c2a41] border border-white/10 p-1.5 rounded-lg shadow-2xl z-20 min-w-[150px]">
                                  <span className="text-[9px] text-[#c2c6d6]/60 block px-2 py-1 uppercase font-semibold">Mover para:</span>
                                  {(['Novo', 'Em Negociação', 'Proposta Enviada', 'Fechado'] as const)
                                    .filter((s) => s !== item.stage)
                                    .map((dest) => (
                                      <button
                                        key={dest}
                                        onClick={() => moveLeadToStage(item.id, dest)}
                                        className="w-full text-left text-[11px] px-2 py-1 text-white hover:bg-cyan-500/20 hover:text-[#adc6ff] rounded transition-colors"
                                      >
                                        ➔ {dest}
                                      </button>
                                    ))}
                                  <div className="border-t border-white/5 my-1" />
                                  <button
                                    onClick={() => handleDeleteLeadOnDetails(item.id)}
                                    className="w-full text-left text-[11px] px-2 py-1 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                                  >
                                    Excluir Lead
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <p className="text-[11px] text-[#c2c6d6] opacity-80">{item.contact}</p>
                              <p className="text-sm font-semibold text-[#38debb]">R$ {item.value.toLocaleString('pt-BR')}</p>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-1 text-[10px]">
                              <span className="text-[#c2c6d6] italic text-[9px]">Ass: {item.assigned}</span>
                              <button
                                onClick={() => {
                                  setSelectedLead(item);
                                  setAiOutput('');
                                  setAiType(null);
                                }}
                                className="text-cyan-400 hover:underline flex items-center font-bold"
                              >
                                Detalhes
                              </button>
                            </div>
                          </div>
                        ))}

                        {stageLeads.length === 0 && (
                          <div className="py-8 border-2 border-dashed border-white/5 rounded-xl flex items-center justify-center">
                            <span className="text-[11px] text-[#c2c6d6]/40 italic">Sem negócios aqui</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* TAB 4: PROFILE VIEW WITH INTEGRATED GEMINI CHATBOT CONSULTING */}
          {activeTab === 'profile' && (
            <motion.div
              key="profile-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Profile card metadata */}
              <div className="bg-[#112036]/70 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-xl flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
                <div className="absolute right-0 bottom-0 pointer-events-none opacity-10">
                  <Bot className="w-48 h-48 text-[#adc6ff]" />
                </div>

                <div className="relative w-20 h-20 rounded-full border-4 border-cyan-400/40 shadow-inner overflow-hidden">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCS6GfRASVpkzDhZM5nuKY6gZbjgYXARm-cP9KBpWB53VD_3jzdGV_MPWcrxcsnzflGlVmeSoVuQThOkASxfKBktcJUtvqAe6O3-c07NFDu8B_L85nyi48UnH9S5oTQJUP1cTVBhNmYVPZy_tUu1P9B99rAuwU8lktV68P67InW9gZbyihz64gEWGQQ8p_oecbq5mLcy3Y9igrV9aU3b-NU93_wYOzxa4Kel1PbLFe-EIUNHtX83mfxxz86VkaYDUiMo_9E_Q4j397"
                    alt="Luan Rumon"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 text-center md:text-left space-y-1">
                  <span className="text-[10px] bg-cyan-400/20 text-[#38debb] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    Administrador CRM
                  </span>
                  <h3 className="text-xl font-bold text-white">Luan Rumon</h3>
                  <p className="text-xs text-[#c2c6d6]">E-mail de Trabalho: luan.rumon@gmail.com</p>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#c2c6d6] pt-1.5 justify-center md:justify-start">
                    <span className="flex items-center gap-1">✅ {activities.filter((a) => a.completed).length} Tarefas Feitas</span>
                    <span className="flex items-center gap-1">💼 {leads.length} Leads Ativos</span>
                    <span className="flex items-center gap-1">🏦 R$ {totalLeadsValue.toLocaleString('pt-BR')} sob gestão</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 min-w-[155px] w-full md:w-auto">
                  <button
                    onClick={resetDatabase}
                    className="py-2.5 bg-[#27354c] hover:bg-slate-700 rounded-xl text-xs font-bold text-white tracking-wide active:scale-95 transition-all text-center flex items-center justify-center gap-1.5 border border-white/15"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Restaurar CRM
                  </button>
                </div>
              </div>

              {/* Chatbot consulting container */}
              <div className="bg-[#112036]/40 backdrop-blur-md rounded-2xl border border-white/5 shadow-xl flex flex-col h-[400px] overflow-hidden">
                {/* Chat header */}
                <div className="bg-[#1d2a41] px-4 py-3 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-cyan-400/20 flex items-center justify-center text-cyan-400">
                      <Bot className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Chat do Consultor Flux AI</h4>
                      <p className="text-[9px] text-[#c2c6d6]">Geração baseada nos leads reais e fechamentos do CRM</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-[#38debb] px-1 rounded uppercase font-bold font-mono">Conectado</span>
                </div>

                {/* Messages dynamic listing */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3" id="chatbot-messages-container">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="w-7 h-7 rounded-full bg-cyan-400/10 flex items-center justify-center text-cyan-300 self-end">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}
                      <div className={`p-3 rounded-2xl max-w-[85%] text-xs ${
                        msg.role === 'user'
                          ? 'bg-[#adc6ff] text-[#002e6a] rounded-tr-none'
                          : 'bg-[#112036]/95 text-white border border-white/5 rounded-tl-none whitespace-pre-wrap'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {chatLoading && (
                    <div className="flex gap-2.5 justify-start">
                      <div className="w-7 h-7 rounded-full bg-cyan-400/10 flex items-center justify-center text-cyan-300 self-end">
                        <Bot className="w-4 h-4 animate-spin" />
                      </div>
                      <div className="p-3 bg-[#112036] rounded-2xl rounded-tl-none text-xs border border-white/5 italic text-[#c2c6d6]">
                        Analisando leads, taxas e formulando resposta...
                      </div>
                    </div>
                  )}
                </div>

                {/* Message send form */}
                <form onSubmit={handleSendChatConsultant} className="p-3 bg-black/10 border-t border-white/5 flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Pergunte ex: 'Qual lead tem maior valor?' ou 'Dicas de abordagem'"
                    className="flex-1 bg-[#0d1c32] text-xs px-3.5 py-2 rounded-xl text-white border border-white/10 focus:outline-none focus:ring-1 focus:ring-cyan-500 font-medium"
                  />
                  <button
                    type="submit"
                    disabled={chatLoading}
                    className="bg-[#38debb] hover:bg-emerald-400 disabled:opacity-50 text-black px-3.5 rounded-xl font-bold text-xs flex items-center justify-center duration-150 active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* CORE DETAILS DRAWER / MODAL FOR SELECTED LEAD */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-end">
            <div
              onClick={() => setSelectedLead(null)}
              className="absolute inset-0 cursor-pointer"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg bg-[#0e1c31] border-l border-white/10 h-full overflow-y-auto p-5 md:p-6"
            >
              {/* Drawer Top toolbar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-base font-bold text-white uppercase tracking-wider">Ficha do Lead</h3>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="rounded-full bg-white/5 hover:bg-white/10 p-2 text-[#c2c6d6] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {isEditingLead ? (
                /* Edit Lead form block */
                <form
                  onSubmit={(e) => {
                    handleUpdateLead(e);
                    setIsEditingLead(false);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-[11px] text-[#c2c6d6] font-extrabold uppercase mb-1">Empresa</label>
                    <input
                      type="text"
                      value={selectedLead.company}
                      onChange={(e) => setSelectedLead({ ...selectedLead, company: e.target.value })}
                      className="w-full bg-[#112036] border border-white/15 px-3.5 py-2 rounded-xl text-white text-xs"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#c2c6d6] font-extrabold uppercase mb-1">Contato Principal</label>
                    <input
                      type="text"
                      value={selectedLead.contact}
                      onChange={(e) => setSelectedLead({ ...selectedLead, contact: e.target.value })}
                      className="w-full bg-[#112036] border border-white/15 px-3.5 py-2 rounded-xl text-white text-xs"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-[#c2c6d6] font-extrabold uppercase mb-1">E-mail</label>
                      <input
                        type="email"
                        value={selectedLead.email}
                        onChange={(e) => setSelectedLead({ ...selectedLead, email: e.target.value })}
                        className="w-full bg-[#112036] border border-white/15 px-3.5 py-2 rounded-xl text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#c2c6d6] font-extrabold uppercase mb-1">Telefone</label>
                      <input
                        type="text"
                        value={selectedLead.phone}
                        onChange={(e) => setSelectedLead({ ...selectedLead, phone: e.target.value })}
                        className="w-full bg-[#112036] border border-white/15 px-3.5 py-2 rounded-xl text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-[#c2c6d6] font-extrabold uppercase mb-1">Valor do negócio (R$)</label>
                      <input
                        type="number"
                        value={selectedLead.value}
                        onChange={(e) => setSelectedLead({ ...selectedLead, value: parseFloat(e.target.value) || 0 })}
                        className="w-full bg-[#112036] border border-white/15 px-3.5 py-2 rounded-xl text-white text-xs"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#c2c6d6] font-extrabold uppercase mb-1">Estágio Comercial</label>
                      <select
                        value={selectedLead.stage}
                        onChange={(e) => setSelectedLead({ ...selectedLead, stage: e.target.value as Lead['stage'] })}
                        className="w-full bg-[#112036] border border-white/15 px-3.5 py-2 rounded-xl text-white text-xs"
                      >
                        <option value="Novo">Novo</option>
                        <option value="Em Negociação">Em Negociação</option>
                        <option value="Proposta Enviada">Proposta Enviada</option>
                        <option value="Fechado">Fechado</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-[#c2c6d6] font-extrabold uppercase mb-1">Prioridade</label>
                      <select
                        value={selectedLead.priority}
                        onChange={(e) => setSelectedLead({ ...selectedLead, priority: e.target.value as Lead['priority'] })}
                        className="w-full bg-[#112036] border border-white/15 px-3.5 py-2 rounded-xl text-white text-xs"
                      >
                        <option value="Normal">Normal</option>
                        <option value="Urgente">Urgente</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#c2c6d6] font-extrabold uppercase mb-1">Assinado à</label>
                      <select
                        value={selectedLead.assigned}
                        onChange={(e) => setSelectedLead({ ...selectedLead, assigned: e.target.value as Lead['assigned'] })}
                        className="w-full bg-[#112036] border border-white/15 px-3.5 py-2 rounded-xl text-white text-xs"
                      >
                        <option value="Sarah">Sarah</option>
                        <option value="Bruno">Bruno</option>
                        <option value="Fernanda">Fernanda</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#c2c6d6] font-extrabold uppercase mb-1">Notas do Negócio</label>
                    <textarea
                      value={selectedLead.notes}
                      onChange={(e) => setSelectedLead({ ...selectedLead, notes: e.target.value })}
                      className="w-full bg-[#112036] border border-white/15 px-3.5 py-2 rounded-xl text-white text-xs h-24"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-[#38debb] hover:bg-emerald-400 text-black font-bold text-xs rounded-xl"
                    >
                      Salvar Alterações
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingLead(false)}
                      className="px-4 py-2 bg-[#27354c] text-white text-xs rounded-xl"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              ) : (
                /* Detail showcase block */
                <div className="space-y-6">
                  <div className="bg-[#112036] p-4 rounded-2xl border border-white/5 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-bold text-white">{selectedLead.company}</h4>
                        <p className="text-xs text-[#c2c6d6]">{selectedLead.contact}</p>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        selectedLead.stage === 'Novo'
                          ? 'bg-cyan-500/20 text-cyan-400'
                          : selectedLead.stage === 'Em Negociação'
                          ? 'bg-amber-500/20 text-amber-400'
                          : selectedLead.stage === 'Proposta Enviada'
                          ? 'bg-[#df7412]/20 text-[#ffb786]'
                          : 'bg-[#38debb]/20 text-[#38debb]'
                      }`}>
                        {selectedLead.stage}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5 text-xs">
                      <div>
                        <span className="text-[#c2c6d6]/60 block text-[9px] uppercase font-bold">Valor Negociado</span>
                        <span className="font-extrabold text-base text-[#38debb]">
                          R$ {selectedLead.value.toLocaleString('pt-BR')}
                        </span>
                      </div>
                      <div>
                        <span className="text-[#c2c6d6]/60 block text-[9px] uppercase font-bold">Responsável</span>
                        <span className="font-semibold text-white/95">{selectedLead.assigned}</span>
                      </div>
                    </div>
                  </div>

                  {/* Core info bullet list details */}
                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center gap-2.5 text-[#c2c6d6]">
                      <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{selectedLead.email}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[#c2c6d6]">
                      <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{selectedLead.phone}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[#c2c6d6]">
                      <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span className="italic">Cadastrado há: {selectedLead.date}</span>
                    </div>
                    <div className="bg-[#0b1424] p-3 rounded-xl border border-white/5 text-[#c2c6d6] italic mt-2">
                      <strong>Histórico:</strong> {selectedLead.notes}
                    </div>
                  </div>

                  {/* Operational action bar for managing lead */}
                  <div className="flex gap-2 border-t border-white/5 pt-4">
                    <button
                      onClick={() => setIsEditingLead(true)}
                      className="flex-1 py-2 bg-[#adc6ff] hover:bg-blue-300 text-[#002e6a] font-bold text-xs rounded-xl"
                    >
                      Editar Dados
                    </button>
                    <button
                      onClick={() => handleDeleteLeadOnDetails(selectedLead.id)}
                      className="px-3 py-2 bg-red-950/40 text-red-400 hover:text-red-300 border border-red-500/10 rounded-xl text-xs"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Magnificent GEMINI AI Powered Action Sandbox */}
                  <div className="bg-gradient-to-tr from-[#112036] via-[#112036] to-[#041329] p-5 rounded-2xl border border-cyan-500/20 shadow-xl space-y-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-cyan-400/10 flex items-center justify-center text-cyan-400">
                        <Sparkles className="w-4.5 h-4.5 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">Ações Inteligentes (Flux AI)</h4>
                        <p className="text-[10px] text-[#c2c6d6] opacity-75">Sincronizado automaticamente com o perfil do lead</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => triggerAiProposta(selectedLead)}
                        disabled={aiLoading}
                        className="flex-1 py-2 bg-[#38debb] hover:bg-emerald-400 text-black font-extrabold text-xs rounded-xl active:scale-95 duration-150 transition-all flex items-center justify-center gap-1 shrink-0"
                      >
                        <Mail className="w-3.5 h-3.5" /> E-mail de Vendas
                      </button>
                      <button
                        onClick={() => triggerAiInsights(selectedLead)}
                        disabled={aiLoading}
                        className="flex-1 py-2 bg-[#27354c] hover:bg-slate-700 text-white font-extrabold text-xs rounded-xl active:scale-95 duration-150 transition-all flex items-center justify-center gap-1 border border-white/5 shrink-0"
                      >
                        <Bot className="w-3.5 h-3.5" /> Recomendações
                      </button>
                    </div>

                    {/* AI output visualization container */}
                    {(aiLoading || aiOutput) && (
                      <div className="bg-black/30 p-4 rounded-xl border border-white/10 text-xs text-[#d6e3ff] space-y-2 relative max-h-[300px] overflow-y-auto">
                        <span className="text-[9px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded font-mono uppercase">
                          {aiType === 'pitch' ? 'Rascunho Comercial Inteligente' : 'Análise de Próximos Passos'}
                        </span>

                        {aiLoading ? (
                          <div className="py-4 text-center text-[#c2c6d6] italic text-xs animate-pulse flex items-center justify-center gap-2">
                            <Bot className="w-4 h-4 animate-spin text-cyan-400" />
                            O Flux AI está analisando o lead e escrevendo...
                          </div>
                        ) : (
                          <div className="whitespace-pre-line leading-relaxed font-sans pt-1">
                            {aiOutput}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* DIALOG SHEET FOR ADDING BRAND NEW LEAD */}
      <AnimatePresence>
        {isAddingLead && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0e1c31] border border-white/10 rounded-2xl w-full max-w-lg p-5 md:p-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-1.5 font-sans">
                  <Plus className="w-5 h-5 text-[#38debb]" /> Inserir Novo Lead Comercial
                </h3>
                <button
                  onClick={() => setIsAddingLead(false)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddLeadSubmit} className="space-y-4">
                {/* Contact Picker Option Toggler */}
                <div className="p-3 bg-[#112036] rounded-xl border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-white font-bold uppercase tracking-wide">Origem do Contato</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={useExistingContactInForm}
                        onChange={(e) => setUseExistingContactInForm(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-[#27354c] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500"></div>
                      <span className="ml-2 text-[10px] text-[#c2c6d6] font-bold">Contato Registrado</span>
                    </label>
                  </div>

                  {useExistingContactInForm ? (
                    <div>
                      <label className="block text-[9px] text-[#c2c6d6]/80 font-bold uppercase mb-1">Selecione o Contato *</label>
                      <select
                        value={formSelectedContactId}
                        onChange={(e) => setFormSelectedContactId(e.target.value)}
                        className="w-full bg-[#0d1c32] border border-white/10 focus:ring-1 focus:ring-cyan-500 px-3 py-2 text-xs rounded-xl text-white font-medium"
                        required={useExistingContactInForm}
                      >
                        <option value="">-- Escolha um Contato --</option>
                        {contacts.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name} ({c.company} - {c.role})
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <p className="text-[9px] text-[#c2c6d6]/60">Se digitados manualmente abaixo, criaremos um contato na base automaticamente.</p>
                  )}
                </div>

                {!useExistingContactInForm && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-[#c2c6d6] font-bold uppercase mb-1">Nome da Empresa *</label>
                        <input
                          type="text"
                          placeholder="Ex: Tech Solutions Corp"
                          required={!useExistingContactInForm}
                          value={newCompany}
                          onChange={(e) => setNewCompany(e.target.value)}
                          className="w-full bg-[#112036] border border-white/10 focus:ring-1 focus:ring-cyan-500 px-3 py-2 text-xs rounded-xl text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-[#c2c6d6] font-bold uppercase mb-1">Contato Principal *</label>
                        <input
                          type="text"
                          placeholder="Ex: Fabiana Rocha"
                          required={!useExistingContactInForm}
                          value={newContact}
                          onChange={(e) => setNewContact(e.target.value)}
                          className="w-full bg-[#112036] border border-white/10 focus:ring-1 focus:ring-cyan-500 px-3 py-2 text-xs rounded-xl text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-[#c2c6d6] font-bold uppercase mb-1">E-mail</label>
                        <input
                          type="email"
                          placeholder="ex: contato@empresa.com"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                          className="w-full bg-[#112036] border border-white/10 focus:ring-1 focus:ring-cyan-500 px-3 py-2 text-xs rounded-xl text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-[#c2c6d6] font-bold uppercase mb-1">Telefone</label>
                        <input
                          type="text"
                          placeholder="ex: (11) 98877-6655"
                          value={newPhone}
                          onChange={(e) => setNewPhone(e.target.value)}
                          className="w-full bg-[#112036] border border-white/10 focus:ring-1 focus:ring-cyan-500 px-3 py-2 text-xs rounded-xl text-white"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-[#c2c6d6] font-bold uppercase mb-1">Valor Estimado (R$) *</label>
                    <input
                      type="number"
                      placeholder="ex: 15000"
                      required
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      className="w-full bg-[#112036] border border-white/10 focus:ring-1 focus:ring-cyan-500 px-3 py-2 text-xs rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#c2c6d6] font-bold uppercase mb-1">Estágio Inicial</label>
                    <select
                      value={newStage}
                      onChange={(e) => setNewStage(e.target.value as Lead['stage'])}
                      className="w-full bg-[#112036] border border-white/10 focus:ring-1 focus:ring-cyan-500 px-3 py-2 text-xs rounded-xl text-white font-medium"
                    >
                      <option value="Novo">Novo</option>
                      <option value="Em Negociação">Em Negociação</option>
                      <option value="Proposta Enviada">Proposta Enviada</option>
                      <option value="Fechado">Fechado</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-[#c2c6d6] font-bold uppercase mb-1">Prioridade</label>
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value as Lead['priority'])}
                      className="w-full bg-[#112036] border border-white/10 focus:ring-1 focus:ring-cyan-500 px-3 py-2 text-xs rounded-xl text-white font-medium"
                    >
                      <option value="Normal">Normal</option>
                      <option value="Urgente">Urgente</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#c2c6d6] font-bold uppercase mb-1">Atribuído à</label>
                    <select
                      value={newAssigned}
                      onChange={(e) => setNewAssigned(e.target.value as Lead['assigned'])}
                      className="w-full bg-[#112036] border border-white/10 focus:ring-1 focus:ring-cyan-500 px-3 py-2 text-xs rounded-xl text-white font-medium"
                    >
                      <option value="Sarah">Sarah</option>
                      <option value="Bruno font-medium">Bruno</option>
                      <option value="Fernanda">Fernanda</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-[#c2c6d6] font-bold uppercase mb-1">Notas Iniciais do Negócio</label>
                  <textarea
                    placeholder="Descrição do projeto, necessidades levantadas..."
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    className="w-full bg-[#112036] border border-white/10 focus:ring-1 focus:ring-cyan-500 px-3 py-2 text-xs rounded-xl text-white h-20 placeholder:text-white/20"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#38debb] hover:bg-emerald-400 text-black font-extrabold text-[#002e6a] font-bold text-xs rounded-xl active:scale-95 duration-100 uppercase tracking-widest font-mono"
                  >
                    Ativar Lead Comercial
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingLead(false)}
                    className="px-4 py-2.5 bg-[#27354c] text-white text-xs font-bold rounded-xl"
                  >
                    Voltar
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DETAILED SHEET FOR SELECTED CONTACT */}
      <AnimatePresence>
        {selectedContact && !isEditingContact && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-end">
            <div
              onClick={() => setSelectedContact(null)}
              className="absolute inset-0 cursor-pointer"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg bg-[#0e1c31] border-l border-white/10 h-full overflow-y-auto p-5 md:p-6 text-white"
            >
              {/* Drawer Top Toolbar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#38debb]" />
                  <h3 className="text-base font-bold uppercase tracking-wider">Ficha do Contato</h3>
                </div>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="rounded-full bg-white/5 hover:bg-white/10 p-2 text-[#c2c6d6] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Showcase block */}
              <div className="space-y-6">
                <div className="bg-[#112036] p-5 rounded-2xl border border-white/5 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#adc6ff] to-[#38debb] text-black font-black text-lg flex items-center justify-center shadow-lg uppercase">
                      {selectedContact.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white tracking-tight">{selectedContact.name}</h4>
                      <p className="text-xs text-[#38debb] font-mono">{selectedContact.role}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/5 text-xs">
                    <div>
                      <span className="text-[#c2c6d6]/60 block text-[9.5px] uppercase font-mono font-bold">Empresa / Cliente</span>
                      <span className="font-extrabold text-white text-sm">
                        {selectedContact.company}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#c2c6d6]/60 block text-[9.5px] uppercase font-mono font-bold">Cadastrado em</span>
                      <span className="font-semibold text-white/90">{selectedContact.dateAdded}</span>
                    </div>
                  </div>
                </div>

                {/* Info contact items with easy click copy triggers! */}
                <div className="space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-widest text-[#c2c6d6]/70 mb-1">Informações de Contato</h5>
                  
                  <div className="bg-[#112036]/50 p-4 rounded-xl border border-white/5 space-y-3 text-xs">
                    <div className="flex items-center justify-between gap-2.5 text-[#c2c6d6]">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="truncate">{selectedContact.email}</span>
                      </div>
                      <button
                        onClick={() => handleCopyText(selectedContact.email, 'drawer-mail')}
                        className="text-[10px] text-[#3aebc6] hover:underline font-mono font-bold shrink-0 bg-white/5 px-2 py-0.5 rounded cursor-pointer"
                      >
                        {copiedId === 'drawer-mail' ? 'Copiado!' : 'Copiar'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between gap-2.5 text-[#c2c6d6] pt-1.5 border-t border-white/5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{selectedContact.phone}</span>
                      </div>
                      <button
                        onClick={() => handleCopyText(selectedContact.phone, 'drawer-phone')}
                        className="text-[10px] text-[#3aebc6] hover:underline font-mono font-bold shrink-0 bg-white/5 px-2 py-0.5 rounded cursor-pointer"
                      >
                        {copiedId === 'drawer-phone' ? 'Copiado!' : 'Copiar'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Additional Notes info */}
                <div className="space-y-2">
                  <h5 className="text-xs font-bold uppercase tracking-widest text-[#c2c6d6]/70">Notas e Histórico</h5>
                  <div className="bg-[#0b1424] p-3 rounded-xl border border-white/5 text-xs text-[#c2c6d6] leading-relaxed italic">
                    &ldquo;{selectedContact.notes}&rdquo;
                  </div>
                </div>

                {/* CRM Lead Matches relation */}
                <div className="space-y-3 pt-1">
                  <h5 className="text-xs font-bold uppercase tracking-widest text-[#c2c6d6]/80 font-mono">Oportunidades de Negócios</h5>
                  
                  <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                    {leads.filter((l) => l.contact.toLowerCase() === selectedContact.name.toLowerCase()).length > 0 ? (
                      leads.filter((l) => l.contact.toLowerCase() === selectedContact.name.toLowerCase()).map((lead) => (
                        <div
                          key={lead.id}
                          className="p-3 bg-[#112036]/60 rounded-xl border border-white/5 flex items-center justify-between text-xs"
                        >
                          <div>
                            <span className="font-bold text-white block">{lead.company}</span>
                            <span className="text-[10px] text-[#c2c6d6]/60">R$ {lead.value.toLocaleString('pt-BR')}</span>
                          </div>
                          
                          <span className={`px-2 py-0.5 rounded text-[8.5px] font-bold ${
                            lead.stage === 'Novo'
                              ? 'bg-cyan-500/20 text-cyan-400'
                              : lead.stage === 'Em Negociação'
                              ? 'bg-amber-500/20 text-amber-400'
                              : lead.stage === 'Proposta Enviada'
                              ? 'bg-[#df7412]/20 text-[#ffb786]'
                              : 'bg-[#38debb]/20 text-[#38debb]'
                          }`}>
                            {lead.stage}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-[#c2c6d6]/60 italic font-mono p-3 bg-[#112036]/20 rounded-xl border border-white/5 text-center">Nenhum negócio ativo associado a este contato.</p>
                    )}
                  </div>
                </div>

                {/* Manage Contact Buttons Block */}
                <div className="flex gap-2.5 border-t border-white/5 pt-4">
                  <button
                    onClick={() => {
                      setEditContactId(selectedContact.id);
                      setEditContactName(selectedContact.name);
                      setEditContactCompany(selectedContact.company);
                      setEditContactEmail(selectedContact.email);
                      setEditContactPhone(selectedContact.phone);
                      setEditContactRole(selectedContact.role);
                      setEditContactNotes(selectedContact.notes);
                      setIsEditingContact(true);
                    }}
                    className="flex-1 py-2.5 bg-[#adc6ff] hover:bg-blue-300 text-[#002e6a] font-bold text-xs rounded-xl"
                  >
                    Editar Contato
                  </button>
                  <button
                    onClick={() => handleDeleteContact(selectedContact.id)}
                    className="px-4 py-2.5 bg-red-950/40 text-red-400 hover:text-red-300 border border-red-500/15 rounded-xl text-xs font-bold font-mono"
                    title="Excluir Contato"
                  >
                    EXCLUIR
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADD CONTACT DIALOG */}
      <AnimatePresence>
        {isAddingContact && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0e1c31] border border-white/10 rounded-2xl w-full max-w-lg p-5 md:p-6 shadow-2xl relative text-white"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-1.5 font-sans">
                  <UserPlus className="w-5 h-5 text-[#adc6ff]" /> Registrar Contato na Base
                </h3>
                <button
                  onClick={() => setIsAddingContact(false)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddContactSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-[#c2c6d6] font-bold uppercase mb-1">Nome Completo *</label>
                    <input
                      type="text"
                      placeholder="Ex: Marina Souza"
                      required
                      value={newContactName}
                      onChange={(e) => setNewContactName(e.target.value)}
                      className="w-full bg-[#112036] border border-white/10 focus:ring-1 focus:ring-cyan-500 px-3 py-2 text-xs rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#c2c6d6] font-bold uppercase mb-1">Empresa / Cliente *</label>
                    <input
                      type="text"
                      placeholder="Ex: ACME Corp"
                      required
                      value={newContactCompany}
                      onChange={(e) => setNewContactCompany(e.target.value)}
                      className="w-full bg-[#112036] border border-white/10 focus:ring-1 focus:ring-cyan-500 px-3 py-2 text-xs rounded-xl text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-[#c2c6d6] font-bold uppercase mb-1">Cargo / Função</label>
                    <input
                      type="text"
                      placeholder="Ex: CTO / Engenheira de Software"
                      value={newContactRole}
                      onChange={(e) => setNewContactRole(e.target.value)}
                      className="w-full bg-[#112036] border border-white/10 focus:ring-1 focus:ring-cyan-500 px-3 py-2 text-xs rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#c2c6d6] font-bold uppercase mb-1">Telefone Celular</label>
                    <input
                      type="text"
                      placeholder="Ex: (11) 98844-3322"
                      value={newContactPhone}
                      onChange={(e) => setNewContactPhone(e.target.value)}
                      className="w-full bg-[#112036] border border-white/10 focus:ring-1 focus:ring-cyan-500 px-3 py-2 text-xs rounded-xl text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-[#c2c6d6] font-bold uppercase mb-1">E-mail Corporativo</label>
                  <input
                    type="email"
                    placeholder="Ex: marina@acme.com"
                    value={newContactEmail}
                    onChange={(e) => setNewContactEmail(e.target.value)}
                    className="w-full bg-[#112036] border border-white/10 focus:ring-1 focus:ring-cyan-500 px-3 py-2 text-xs rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#c2c6d6] font-bold uppercase mb-1">Notas Internas</label>
                  <textarea
                    placeholder="Principais dores da empresa, canais favoritos de conversa..."
                    value={newContactNotes}
                    onChange={(e) => setNewContactNotes(e.target.value)}
                    className="w-full bg-[#112036] border border-white/10 focus:ring-1 focus:ring-cyan-500 px-3 py-2 text-xs rounded-xl text-white h-20 placeholder:text-white/20"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#38debb] hover:bg-emerald-400 text-black font-extrabold text-xs rounded-xl active:scale-95 duration-100 uppercase tracking-wider"
                  >
                    Salvar Novo Contato
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingContact(false)}
                    className="px-4 py-2.5 bg-[#27354c] text-white text-xs font-bold rounded-xl"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EDIT CONTACT DIALOG */}
      <AnimatePresence>
        {isEditingContact && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0e1c31] border border-white/10 rounded-2xl w-full max-w-lg p-5 md:p-6 shadow-2xl relative text-white"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-1.5 font-sans">
                  Editar Cadastro do Contato
                </h3>
                <button
                  onClick={() => setIsEditingContact(false)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdateContactSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-[#c2c6d6] font-bold uppercase mb-1">Nome Completo *</label>
                    <input
                      type="text"
                      required
                      value={editContactName}
                      onChange={(e) => setEditContactName(e.target.value)}
                      className="w-full bg-[#112036] border border-white/10 focus:ring-1 focus:ring-cyan-500 px-3 py-2 text-xs rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#c2c6d6] font-bold uppercase mb-1">Empresa / Cliente *</label>
                    <input
                      type="text"
                      required
                      value={editContactCompany}
                      onChange={(e) => setEditContactCompany(e.target.value)}
                      className="w-full bg-[#112036] border border-white/10 focus:ring-1 focus:ring-cyan-500 px-3 py-2 text-xs rounded-xl text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-[#c2c6d6] font-bold uppercase mb-1">Cargo / Função</label>
                    <input
                      type="text"
                      value={editContactRole}
                      onChange={(e) => setEditContactRole(e.target.value)}
                      className="w-full bg-[#112036] border border-white/10 focus:ring-1 focus:ring-cyan-500 px-3 py-2 text-xs rounded-xl text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#c2c6d6] font-bold uppercase mb-1">Telefone Celular</label>
                    <input
                      type="text"
                      value={editContactPhone}
                      onChange={(e) => setEditContactPhone(e.target.value)}
                      className="w-full bg-[#112036] border border-white/10 focus:ring-1 focus:ring-cyan-500 px-3 py-2 text-xs rounded-xl text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-[#c2c6d6] font-bold uppercase mb-1">E-mail Corporativo</label>
                  <input
                    type="email"
                    value={editContactEmail}
                    onChange={(e) => setEditContactEmail(e.target.value)}
                    className="w-full bg-[#112036] border border-white/10 focus:ring-1 focus:ring-cyan-500 px-3 py-2 text-xs rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-[#c2c6d6] font-bold uppercase mb-1">Notas Internas</label>
                  <textarea
                    value={editContactNotes}
                    onChange={(e) => setEditContactNotes(e.target.value)}
                    className="w-full bg-[#112036] border border-white/10 focus:ring-1 focus:ring-cyan-500 px-3 py-2 text-xs rounded-xl text-white h-20"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-[#adc6ff] hover:bg-blue-300 text-[#002e6a] font-bold text-xs rounded-xl active:scale-95 duration-100 uppercase tracking-wider"
                  >
                    Sincronizar Alterações
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingContact(false)}
                    className="px-4 py-2.5 bg-[#27354c] text-white text-xs font-bold rounded-xl"
                  >
                    Voltar
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GLOBAL FLOATING ACTIONS */}
      <button
        onClick={() => setIsAddingLead(true)}
        className="fixed right-6 bottom-24 w-14 h-14 bg-gradient-to-tr from-[#38debb] to-[#4d8eff] text-white rounded-full shadow-[0_8px_32px_rgba(56,222,187,0.3)] flex items-center justify-center active:scale-90 transition-all duration-200 z-30 group"
      >
        <Plus className="w-7 h-7 text-white group-hover:rotate-90 transition-transform duration-300" />
      </button>

      {/* STATIC GORGEOUS BOTTOM NAVIGATION BAR */}
      <nav id="crm-navigation" className="fixed bottom-0 left-0 w-full flex justify-around items-center h-20 pb-safe px-4 bg-[#0d1c32]/95 backdrop-blur-xl border-t border-white/5 shadow-2.5xl z-40 rounded-t-2xl">
        {/* Tab 1: Dashboard */}
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-xl active:scale-90 transition-transform duration-150 ${
            activeTab === 'dashboard'
              ? 'text-[#38debb] bg-[#38debb]/10 shadow-[0_4px_16px_rgba(56,222,187,0.1)]'
              : 'text-[#c2c6d6] hover:text-[#38debb]'
          }`}
        >
          <span className="text-xl">📊</span>
          <span className="text-[10px] font-bold tracking-tight mt-1">Dashboard</span>
        </button>

        {/* Tab 2: Leads */}
        <button
          onClick={() => setActiveTab('leads')}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-xl active:scale-90 transition-transform duration-150 ${
            activeTab === 'leads'
              ? 'text-[#38debb] bg-[#38debb]/10 shadow-[0_4px_16px_rgba(56,222,187,0.1)]'
              : 'text-[#c2c6d6] hover:text-[#38debb]'
          }`}
        >
          <span className="text-xl">🔍</span>
          <span className="text-[10px] font-bold tracking-tight mt-1">Leads</span>
        </button>

        {/* Tab 3: Pipeline (Kanban) */}
        <button
          onClick={() => setActiveTab('pipeline')}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-xl active:scale-90 transition-transform duration-150 ${
            activeTab === 'pipeline'
              ? 'text-[#38debb] bg-[#38debb]/10 shadow-[0_4px_16px_rgba(56,222,187,0.1)]'
              : 'text-[#c2c6d6] hover:text-[#38debb]'
          }`}
        >
          <span className="text-xl">🌳</span>
          <span className="text-[10px] font-bold tracking-tight mt-1">Pipeline</span>
        </button>

        {/* Tab 4: Profile / Consultant */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-xl active:scale-90 transition-transform duration-150 ${
            activeTab === 'profile'
              ? 'text-[#38debb] bg-[#38debb]/10 shadow-[0_4px_16px_rgba(56,222,187,0.1)]'
              : 'text-[#c2c6d6] hover:text-[#38debb]'
          }`}
        >
          <span className="text-xl">🧠</span>
          <span className="text-[10px] font-bold tracking-tight mt-1">Flux AI</span>
        </button>
      </nav>
    </div>
  );
}
