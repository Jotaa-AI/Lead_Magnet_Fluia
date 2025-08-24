import { Question } from '../types';

export const baseQuestions: Question[] = [
  {
    id: 'q01',
    text: '¡Hola! Encantado de ayudarte 😊 Para empezar, ¿cómo se llama tu empresa y a qué os dedicáis? Así puedo entender mejor cómo aplicar IA específicamente en tu caso.',
    input: {
      type: 'textarea',
      placeholder: 'Ej: Somos "TechCorp" y nos dedicamos al desarrollo de software...',
      required: true
    }
  },
  {
    id: 'q02',
    text: 'Perfecto, sois {empresa} y os dedicáis a {actividad}. ¿Cuántas personas formáis aproximadamente el equipo?',
    input: {
      type: 'number',
      placeholder: '5',
      required: true
    }
  },
  {
    id: 'q03',
    text: 'Gracias. Entonces, ahora mismo sois un equipo de {equipo_num} personas. ¿En qué sector dirías que trabajáis principalmente: {actividad}?',
    input: {
      type: 'text',
      placeholder: 'Ej: Tecnología, Consultoría, Retail...',
      required: true
    }
  },
  {
    id: 'q04',
    text: 'Gracias, sois {sector}. ¿Qué herramientas usáis en el día a día? Por ejemplo: CRM, WhatsApp, Excel, email marketing u otras.',
    input: {
      type: 'multiselect',
      options: ['CRM', 'WhatsApp', 'Excel', 'Email Marketing', 'Slack', 'Notion', 'Google Workspace', 'Microsoft Teams', 'Otro'],
      required: true
    }
  },
  {
    id: 'q05',
    text: 'Perfecto, {herramientas} forman parte de vuestras herramientas principales. ¿Cuáles son los 2 o 3 procesos más repetitivos que más tiempo os consumen en el día a día?',
    input: {
      type: 'textarea',
      placeholder: 'Ej: Gestión de clientes, facturación, seguimiento de proyectos...',
      required: true
    }
  },
  {
    id: 'q06',
    text: '¡Genial, gracias por el detalle! Por ahora entiendo que el primer proceso repetitivo es {procesos_repetitivos}. ¿En qué sentís que perdéis más tiempo o dinero hoy en día?',
    input: {
      type: 'textarea',
      placeholder: 'Ej: En tareas administrativas, en seguimiento manual de clientes...',
      required: true
    }
  },
  {
    id: 'q07',
    text: 'Ahora, para completar el mapa: ¿cómo conseguís actualmente la mayoría de vuestros clientes? ¿Os llegan por llamadas, WhatsApp, email, redes sociales, recomendaciones…?',
    input: {
      type: 'multiselect',
      options: ['Llamadas telefónicas', 'WhatsApp', 'Email', 'Redes sociales', 'Recomendaciones', 'Web/SEO', 'Publicidad online', 'Networking', 'Otro'],
      required: true
    }
  },
  {
    id: 'q08',
    text: '¡Genial! Y para la parte administrativa: ¿cómo lleváis el control de clientes, facturas o incidencias? ¿Usáis Excel, CRM, o lo hacéis a mano?',
    input: {
      type: 'select',
      options: ['Excel/Google Sheets', 'CRM específico', 'A mano/papel', 'Software personalizado', 'No tenemos control', 'Otro'],
      required: true
    }
  },
  {
    id: 'q09',
    text: 'Perfecto. Si pudieras automatizar solo una cosa esta semana, ¿cuál sería y por qué?',
    input: {
      type: 'text',
      placeholder: 'Ej: La gestión de citas porque consumimos 2h diarias...',
      required: true
    }
  },
  {
    id: 'q10',
    text: 'Imagina que tuvieras un "robot" en la empresa: ¿qué te ilusionaría más delegarle en el futuro? Cuéntalo con detalle para afinar la propuesta.',
    input: {
      type: 'textarea',
      placeholder: 'Ej: Me encantaría que gestionara automáticamente...',
      required: true
    }
  },
  {
    id: 'q11',
    text: '¡Buenísimo, gracias! Por último, ¿qué email quieres que usemos para enviarte el informe personalizado con las áreas que más se pueden automatizar en {empresa}?',
    input: {
      type: 'email',
      placeholder: 'tu@email.com',
      required: true
    }
  },
  {
    id: 'q12',
    text: 'Perfecto, en unos minutos recibirás por correo electrónico tu informe personalizado.',
    input: {
      type: 'text',
      required: false
    }
  }
];