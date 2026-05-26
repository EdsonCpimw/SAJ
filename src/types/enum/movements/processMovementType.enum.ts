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

export function getProcessMovementTypeLabel(status: string): string {
  return (
    ProcessMovementTypeLabel[status as ProcessMovementType] ?? 'Tipo de movimentação desconhecida'
  );
}
