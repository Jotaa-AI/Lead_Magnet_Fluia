import { Question } from '../types';

// Solo la primera pregunta está predefinida, el resto vienen del webhook
export const firstQuestion: Question = {
  id: 'q01',
  text: '¡Hola! Encantado de ayudarte 😊\n\nPara empezar, ¿cómo se llama tu empresa y a qué os dedicáis? Así puedo entender mejor cómo aplicar IA específicamente en tu caso.',
  input: {
    type: 'textarea',
    placeholder: 'Ej: Somos "Talentia" y nos dedicamos a conectar el talento adecuado con las empresas que apuestan por el crecimiento',
    required: true
  }
};