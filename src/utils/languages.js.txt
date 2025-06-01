// src/utils/languages.js
export const supportedLanguages = {
  en: "English",
  pt: "Português",
  es: "Español",
  nl: "Nederlands",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
  zh: "中文",
  ja: "日本語",
  ko: "한국어"
};

export const translations = {
  en: {
    welcome: "Welcome",
    mission: "Mission",
    dashboard: "Dashboard",
    login: "Login",
    register: "Register",
    applicants: "Applicants",
    agencies: "Agencies",
    shippingCompanies: "Shipping Companies",
    trainingCenters: "Training Centers",
    payroll: "Payroll",
    legalProcessing: "Legal Processing",
    interviewTool: "Interview Tool",
    notifications: "Notifications",
    settings: "Settings"
  },
  pt: {
    welcome: "Bem-vindo",
    mission: "Missão",
    dashboard: "Painel",
    login: "Entrar",
    register: "Registar-se",
    applicants: "Candidatos",
    agencies: "Agências",
    shippingCompanies: "Empresas Navais",
    trainingCenters: "Centros de Formação",
    payroll: "Folha de Pagamento",
    legalProcessing: "Processamento Legal",
    interviewTool: "Entrevista por Vídeo",
    notifications: "Notificações",
    settings: "Configurações"
  },
  es: {
    welcome: "Bienvenido",
    mission: "Misión",
    dashboard: "Panel",
    login: "Iniciar Sesión",
    register: "Registro",
    applicants: "Solicitantes",
    agencies: "Agencias",
    shippingCompanies: "Empresas Marítimas",
    trainingCenters: "Centros de Formación",
    payroll: "Nómina",
    legalProcessing: "Procesamiento Legal",
    interviewTool: "Herramienta de Entrevista",
    notifications: "Notificaciones",
    settings: "Ajustes"
  },
  nl: {
    welcome: "Welkom",
    mission: "Missie",
    dashboard: "Dashboard",
    login: "Inloggen",
    register: "Registreren",
    applicants: "Sollicitanten",
    agencies: "Agentschappen",
    shippingCompanies: "Scheepvaartmaatschappijen",
    trainingCenters: "Opleidingscentra",
    payroll: "Loonadministratie",
    legalProcessing: "Juridische Procedure",
    interviewTool: "Videogesprek Gereedschap",
    notifications: "Meldingen",
    settings: "Instellingen"
  },
  fr: {
    welcome: "Bienvenue",
    mission: "Mission",
    dashboard: "Tableau de bord",
    login: "Connexion",
    register: "S'inscrire",
    applicants: "Candidats",
    agencies: "Agences",
    shippingCompanies: "Entreprises maritimes",
    trainingCenters: "Centres de formation",
    payroll: "Paie",
    legalProcessing: "Dossier juridique",
    interviewTool: "Entretien par vidéo",
    notifications: "Notifications",
    settings: "Paramètres"
  }
};

export default function translate(key, lang = "en") {
  return translations[lang]?.[key] || translations.en[key];
}