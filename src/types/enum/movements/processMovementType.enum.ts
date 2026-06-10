export enum ProcessMovementType {
  // Registration
  CASE_CREATED = 'CASE_CREATED',
  DISTRIBUTION = 'DISTRIBUTION',
  REDISTRIBUTION = 'REDISTRIBUTION',
  TRANSFERRED = 'TRANSFERRED',

  // Petitions
  INITIAL_PETITION = 'INITIAL_PETITION',
  INTERMEDIATE_PETITION = 'INTERMEDIATE_PETITION',
  CONTESTATION = 'CONTESTATION',
  APPEAL = 'APPEAL',
  COUNTER_ARGUMENTS = 'COUNTER_ARGUMENTS',
  ATTACHMENT = 'ATTACHMENT',
  MANIFESTATION = 'MANIFESTATION',

  // Decisions
  DISPATCH = 'DISPATCH',
  INTERLOCUTORY_DECISION = 'INTERLOCUTORY_DECISION',
  SENTENCE = 'SENTENCE',
  COLLEGIATE_DECISION = 'COLLEGIATE_DECISION',
  SINGLE_JUDGE_DECISION = 'SINGLE_JUDGE_DECISION',

  // Hearings
  CONCILIATION_HEARING = 'CONCILIATION_HEARING',
  INSTRUCTION_HEARING = 'INSTRUCTION_HEARING',
  HEARING_HELD = 'HEARING_HELD',
  HEARING_CANCELLED = 'HEARING_CANCELLED',
  HEARING_RESCHEDULED = 'HEARING_RESCHEDULED',

  // Deadlines
  SUMMONS = 'SUMMONS',
  SUBPOENA = 'SUBPOENA',
  DEADLINE_OPENED = 'DEADLINE_OPENED',
  DEADLINE_CLOSED = 'DEADLINE_CLOSED',
  DEADLINE_SUSPENDED = 'DEADLINE_SUSPENDED',

  // Court
  SUBMITTED_TO_JUDGE = 'SUBMITTED_TO_JUDGE',
  REFERRED_TO_DA = 'REFERRED_TO_DA',
  REFERRED_TO_EXPERT = 'REFERRED_TO_EXPERT',
  EXPERT_EXAMINATION = 'EXPERT_EXAMINATION',
  DUE_DILIGENCE = 'DUE_DILIGENCE',

  // Enforcement
  ENFORCEMENT_STARTED = 'ENFORCEMENT_STARTED',
  ASSET_SEIZURE = 'ASSET_SEIZURE',
  PUBLIC_AUCTION = 'PUBLIC_AUCTION',
  PAYMENT = 'PAYMENT',
  ENFORCEMENT_DISMISSED = 'ENFORCEMENT_DISMISSED',

  // Closure
  ARCHIVED = 'ARCHIVED',
  DISMISSED_WITHOUT_MERIT = 'DISMISSED_WITHOUT_MERIT',
  DISMISSED_WITH_MERIT = 'DISMISSED_WITH_MERIT',
  SETTLEMENT = 'SETTLEMENT',
  WITHDRAWAL = 'WITHDRAWAL',
  FINAL_JUDGMENT = 'FINAL_JUDGMENT',

  // Other
  COMMENT = 'COMMENT',
  CLIENT_VIEWED = 'CLIENT_VIEWED',
  SUSPENDED = 'SUSPENDED',
  REACTIVATED = 'REACTIVATED',
}

export const ProcessMovementOptions = [
  // Cadastro
  { label: 'Processo cadastrado', value: ProcessMovementType.CASE_CREATED },
  { label: 'Distribuição', value: ProcessMovementType.DISTRIBUTION },
  { label: 'Redistribuição', value: ProcessMovementType.REDISTRIBUTION },
  { label: 'Remetido', value: ProcessMovementType.TRANSFERRED },
  // Petições
  { label: 'Petição inicial', value: ProcessMovementType.INITIAL_PETITION },
  { label: 'Petição intermediária', value: ProcessMovementType.INTERMEDIATE_PETITION },
  { label: 'Contestação', value: ProcessMovementType.CONTESTATION },
  { label: 'Recurso', value: ProcessMovementType.APPEAL },
  { label: 'Contrarrazões', value: ProcessMovementType.COUNTER_ARGUMENTS },
  { label: 'Anexo', value: ProcessMovementType.ATTACHMENT },
  { label: 'Manifestação', value: ProcessMovementType.MANIFESTATION },
  // Decisões
  { label: 'Despacho', value: ProcessMovementType.DISPATCH },
  { label: 'Decisão interlocutória', value: ProcessMovementType.INTERLOCUTORY_DECISION },
  { label: 'Sentença', value: ProcessMovementType.SENTENCE },
  { label: 'Acórdão', value: ProcessMovementType.COLLEGIATE_DECISION },
  { label: 'Decisão monocrática', value: ProcessMovementType.SINGLE_JUDGE_DECISION },
  // Audiências
  { label: 'Audiência de conciliação', value: ProcessMovementType.CONCILIATION_HEARING },
  { label: 'Audiência de instrução', value: ProcessMovementType.INSTRUCTION_HEARING },
  { label: 'Audiência realizada', value: ProcessMovementType.HEARING_HELD },
  { label: 'Audiência cancelada', value: ProcessMovementType.HEARING_CANCELLED },
  { label: 'Audiência redesignada', value: ProcessMovementType.HEARING_RESCHEDULED },
  // Prazos
  { label: 'Intimação', value: ProcessMovementType.SUMMONS },
  { label: 'Citação', value: ProcessMovementType.SUBPOENA },
  { label: 'Prazo aberto', value: ProcessMovementType.DEADLINE_OPENED },
  { label: 'Prazo encerrado', value: ProcessMovementType.DEADLINE_CLOSED },
  { label: 'Prazo suspenso', value: ProcessMovementType.DEADLINE_SUSPENDED },
  // Tribunal
  { label: 'Concluso', value: ProcessMovementType.SUBMITTED_TO_JUDGE },
  { label: 'Vista ao MP', value: ProcessMovementType.REFERRED_TO_DA },
  { label: 'Vista ao perito', value: ProcessMovementType.REFERRED_TO_EXPERT },
  { label: 'Perícia', value: ProcessMovementType.EXPERT_EXAMINATION },
  { label: 'Diligência', value: ProcessMovementType.DUE_DILIGENCE },
  // Execução
  { label: 'Execução iniciada', value: ProcessMovementType.ENFORCEMENT_STARTED },
  { label: 'Penhora', value: ProcessMovementType.ASSET_SEIZURE },
  { label: 'Hasta pública', value: ProcessMovementType.PUBLIC_AUCTION },
  { label: 'Pagamento', value: ProcessMovementType.PAYMENT },
  { label: 'Execução extinta', value: ProcessMovementType.ENFORCEMENT_DISMISSED },
  // Encerramento
  { label: 'Arquivado', value: ProcessMovementType.ARCHIVED },
  { label: 'Extinto sem resolução', value: ProcessMovementType.DISMISSED_WITHOUT_MERIT },
  { label: 'Extinto com resolução', value: ProcessMovementType.DISMISSED_WITH_MERIT },
  { label: 'Acordo', value: ProcessMovementType.SETTLEMENT },
  { label: 'Desistência', value: ProcessMovementType.WITHDRAWAL },
  { label: 'Trânsito em julgado', value: ProcessMovementType.FINAL_JUDGMENT },
  // Outros
  { label: 'Comentário', value: ProcessMovementType.COMMENT },
  { label: 'Cliente visualizou', value: ProcessMovementType.CLIENT_VIEWED },
  { label: 'Suspenso', value: ProcessMovementType.SUSPENDED },
  { label: 'Reativado', value: ProcessMovementType.REACTIVATED },
];

export const ProcessMovementTypeLabel: Record<ProcessMovementType, string> = {
  // Cadastro
  [ProcessMovementType.CASE_CREATED]: 'Processo cadastrado',
  [ProcessMovementType.DISTRIBUTION]: 'Distribuição',
  [ProcessMovementType.REDISTRIBUTION]: 'Redistribuição',
  [ProcessMovementType.TRANSFERRED]: 'Remetido',

  // Petições
  [ProcessMovementType.INITIAL_PETITION]: 'Petição inicial',
  [ProcessMovementType.INTERMEDIATE_PETITION]: 'Petição intermediária',
  [ProcessMovementType.CONTESTATION]: 'Contestação',
  [ProcessMovementType.APPEAL]: 'Recurso',
  [ProcessMovementType.COUNTER_ARGUMENTS]: 'Contrarrazões',
  [ProcessMovementType.ATTACHMENT]: 'Anexo',
  [ProcessMovementType.MANIFESTATION]: 'Manifestação',

  // Decisões
  [ProcessMovementType.DISPATCH]: 'Despacho',
  [ProcessMovementType.INTERLOCUTORY_DECISION]: 'Decisão interlocutória',
  [ProcessMovementType.SENTENCE]: 'Sentença',
  [ProcessMovementType.COLLEGIATE_DECISION]: 'Acórdão',
  [ProcessMovementType.SINGLE_JUDGE_DECISION]: 'Decisão monocrática',

  // Audiências
  [ProcessMovementType.CONCILIATION_HEARING]: 'Audiência de conciliação',
  [ProcessMovementType.INSTRUCTION_HEARING]: 'Audiência de instrução',
  [ProcessMovementType.HEARING_HELD]: 'Audiência realizada',
  [ProcessMovementType.HEARING_CANCELLED]: 'Audiência cancelada',
  [ProcessMovementType.HEARING_RESCHEDULED]: 'Audiência redesignada',

  // Prazos
  [ProcessMovementType.SUMMONS]: 'Intimação',
  [ProcessMovementType.SUBPOENA]: 'Citação',
  [ProcessMovementType.DEADLINE_OPENED]: 'Prazo aberto',
  [ProcessMovementType.DEADLINE_CLOSED]: 'Prazo encerrado',
  [ProcessMovementType.DEADLINE_SUSPENDED]: 'Prazo suspenso',

  // Tribunal
  [ProcessMovementType.SUBMITTED_TO_JUDGE]: 'Concluso',
  [ProcessMovementType.REFERRED_TO_DA]: 'Vista ao MP',
  [ProcessMovementType.REFERRED_TO_EXPERT]: 'Vista ao perito',
  [ProcessMovementType.EXPERT_EXAMINATION]: 'Perícia',
  [ProcessMovementType.DUE_DILIGENCE]: 'Diligência',

  // Execução
  [ProcessMovementType.ENFORCEMENT_STARTED]: 'Execução iniciada',
  [ProcessMovementType.ASSET_SEIZURE]: 'Penhora',
  [ProcessMovementType.PUBLIC_AUCTION]: 'Hasta pública',
  [ProcessMovementType.PAYMENT]: 'Pagamento',
  [ProcessMovementType.ENFORCEMENT_DISMISSED]: 'Execução extinta',

  // Encerramento
  [ProcessMovementType.ARCHIVED]: 'Arquivado',
  [ProcessMovementType.DISMISSED_WITHOUT_MERIT]: 'Extinto sem resolução',
  [ProcessMovementType.DISMISSED_WITH_MERIT]: 'Extinto com resolução',
  [ProcessMovementType.SETTLEMENT]: 'Acordo',
  [ProcessMovementType.WITHDRAWAL]: 'Desistência',
  [ProcessMovementType.FINAL_JUDGMENT]: 'Trânsito em julgado',

  // Outros
  [ProcessMovementType.COMMENT]: 'Comentário',
  [ProcessMovementType.CLIENT_VIEWED]: 'Cliente visualizou',
  [ProcessMovementType.SUSPENDED]: 'Suspenso',
  [ProcessMovementType.REACTIVATED]: 'Reativado',
};

export function getProcessMovementTypeLabel(type: string): string {
  return (
    ProcessMovementTypeLabel[type as ProcessMovementType] ?? 'Tipo de movimentação desconhecida'
  );
}
