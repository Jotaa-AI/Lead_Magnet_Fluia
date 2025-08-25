import { Question } from '../types';

// Solo la primera pregunta está predefinida, el resto vienen del webhook
export const firstQuestion: Question = {
  id: 'q01',
  text: '¡Hola! Encantado de ayudarte 😊\n\nPara crear un plan de automatización que realmente marque la diferencia en tu negocio, necesito conocerte mejor.\n\n¿Cómo se llama tu empresa y a qué os dedicáis exactamente?',
  input: {
    type: 'textarea',
    placeholder: 'Ej: Somos "TechCorp" y nos dedicamos al desarrollo de software...',
    required: true
  }
};