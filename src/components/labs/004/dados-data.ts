export type ProcessoStatus = "Concluído" | "Em andamento" | "Pendente" | "Atrasado";
export type ProcessoPrioridade = "Alta" | "Média" | "Baixa";

export type Processo = {
  id: string;
  nome: string;
  area: string;
  responsavel: string;
  status: ProcessoStatus;
  prioridade: ProcessoPrioridade;
  prazo: string;
  progresso: number;
};

export const PROCESSOS: Processo[] = [
  { id: "PR-1042", nome: "Reconciliação de faturas Q3", area: "Financeiro", responsavel: "Marina Alves", status: "Em andamento", prioridade: "Alta", prazo: "2026-08-28", progresso: 64 },
  { id: "PR-1043", nome: "Onboarding fornecedor Delkon", area: "Compras", responsavel: "Rafael Souza", status: "Pendente", prioridade: "Média", prazo: "2026-09-02", progresso: 12 },
  { id: "PR-1044", nome: "Auditoria de acessos internos", area: "TI", responsavel: "Bianca Ferreira", status: "Concluído", prioridade: "Alta", prazo: "2026-08-20", progresso: 100 },
  { id: "PR-1045", nome: "Reprocessamento de pedidos falhos", area: "Operações", responsavel: "Diego Martins", status: "Atrasado", prioridade: "Alta", prazo: "2026-08-18", progresso: 41 },
  { id: "PR-1046", nome: "Atualização de cadastro de clientes", area: "Comercial", responsavel: "Carla Nogueira", status: "Em andamento", prioridade: "Baixa", prazo: "2026-09-10", progresso: 55 },
  { id: "PR-1047", nome: "Migração de planilhas para ERP", area: "Financeiro", responsavel: "Marina Alves", status: "Em andamento", prioridade: "Média", prazo: "2026-09-05", progresso: 38 },
  { id: "PR-1048", nome: "Revisão de contratos SLA", area: "Jurídico", responsavel: "Otávio Lima", status: "Pendente", prioridade: "Média", prazo: "2026-09-14", progresso: 5 },
  { id: "PR-1049", nome: "Integração API logística Tork", area: "TI", responsavel: "Bianca Ferreira", status: "Em andamento", prioridade: "Alta", prazo: "2026-08-30", progresso: 72 },
  { id: "PR-1050", nome: "Fechamento contábil mensal", area: "Financeiro", responsavel: "Igor Cardoso", status: "Concluído", prioridade: "Alta", prazo: "2026-08-15", progresso: 100 },
  { id: "PR-1051", nome: "Triagem de tickets de suporte", area: "Atendimento", responsavel: "Larissa Prado", status: "Em andamento", prioridade: "Baixa", prazo: "2026-08-29", progresso: 81 },
  { id: "PR-1052", nome: "Validação de estoque CD Sul", area: "Operações", responsavel: "Diego Martins", status: "Pendente", prioridade: "Alta", prazo: "2026-09-01", progresso: 18 },
  { id: "PR-1053", nome: "Configuração de alertas de fraude", area: "TI", responsavel: "Bianca Ferreira", status: "Atrasado", prioridade: "Alta", prazo: "2026-08-17", progresso: 29 },
  { id: "PR-1054", nome: "Padronização de nomenclatura NF", area: "Financeiro", responsavel: "Igor Cardoso", status: "Concluído", prioridade: "Baixa", prazo: "2026-08-12", progresso: 100 },
  { id: "PR-1055", nome: "Revisão de política de descontos", area: "Comercial", responsavel: "Carla Nogueira", status: "Pendente", prioridade: "Média", prazo: "2026-09-08", progresso: 9 },
  { id: "PR-1056", nome: "Automação de relatório semanal", area: "Operações", responsavel: "Felipe Ramos", status: "Em andamento", prioridade: "Média", prazo: "2026-09-03", progresso: 47 },
  { id: "PR-1057", nome: "Consolidação de bases de RH", area: "RH", responsavel: "Patrícia Gomes", status: "Em andamento", prioridade: "Alta", prazo: "2026-08-31", progresso: 60 },
  { id: "PR-1058", nome: "Homologação novo gateway pagto", area: "TI", responsavel: "Felipe Ramos", status: "Pendente", prioridade: "Alta", prazo: "2026-09-06", progresso: 22 },
  { id: "PR-1059", nome: "Revisão de KPIs operacionais", area: "Operações", responsavel: "Diego Martins", status: "Concluído", prioridade: "Média", prazo: "2026-08-14", progresso: 100 },
  { id: "PR-1060", nome: "Ajuste de fluxo de aprovação", area: "Jurídico", responsavel: "Otávio Lima", status: "Atrasado", prioridade: "Média", prazo: "2026-08-19", progresso: 33 },
  { id: "PR-1061", nome: "Catalogação de ativos de TI", area: "TI", responsavel: "Bianca Ferreira", status: "Em andamento", prioridade: "Baixa", prazo: "2026-09-11", progresso: 51 },
  { id: "PR-1062", nome: "Recadastramento de colaboradores", area: "RH", responsavel: "Patrícia Gomes", status: "Pendente", prioridade: "Baixa", prazo: "2026-09-15", progresso: 3 },
  { id: "PR-1063", nome: "Análise de churn trimestral", area: "Comercial", responsavel: "Carla Nogueira", status: "Em andamento", prioridade: "Alta", prazo: "2026-09-04", progresso: 68 },
  { id: "PR-1064", nome: "Revisão de backups críticos", area: "TI", responsavel: "Felipe Ramos", status: "Concluído", prioridade: "Alta", prazo: "2026-08-13", progresso: 100 },
  { id: "PR-1065", nome: "Padronização de contratos fornecedor", area: "Compras", responsavel: "Rafael Souza", status: "Atrasado", prioridade: "Baixa", prazo: "2026-08-16", progresso: 24 },
  { id: "PR-1066", nome: "Diagnóstico de filas de automação", area: "Operações", responsavel: "Diego Martins", status: "Em andamento", prioridade: "Alta", prazo: "2026-08-27", progresso: 76 },
  { id: "PR-1067", nome: "Revisão de permissões de sistema", area: "TI", responsavel: "Bianca Ferreira", status: "Pendente", prioridade: "Média", prazo: "2026-09-09", progresso: 15 },
];
