import React from 'react';
import { CheckCircle, Mail, Calendar, RotateCcw } from 'lucide-react';

interface CompletionScreenProps {
  companyName?: string;
  email?: string;
  summary?: string | null;
  onRestart: () => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  companyName,
  email,
  summary,
  onRestart
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¡Perfecto!
          </h1>
          <p className="text-gray-300 text-lg">
            En unos minutos recibirás por correo electrónico tu informe personalizado
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 mb-6">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-purple-400 mr-2" />
              <span className="text-white font-medium">
                Informe enviado a: {email}
              </span>
            </div>
            
            {companyName && (
              <p className="text-gray-300">
                Análisis personalizado para <span className="text-purple-300 font-semibold">{companyName}</span>
              </p>
            )}
          </div>

          {/* Summary if available */}
          {summary && (
            <div className="bg-black/20 rounded-xl p-6 mb-8 border border-purple-500/20">
              <h3 className="text-white font-semibold mb-3">
                Resumen de tu análisis:
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {summary}
              </p>
            </div>
          )}

          {/* What's Next */}
          <div className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 rounded-xl p-6 mb-8 border border-purple-400/30">
            <h3 className="text-white font-semibold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-purple-400" />
              ¿Qué sigue?
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start space-x-3">
                <span className="text-purple-400 font-bold">1.</span>
                <p>Recibirás un informe detallado con las mejores oportunidades de automatización para tu empresa</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-purple-400 font-bold">2.</span>
                <p>Te contactaremos para agendar una llamada gratuita de 30 minutos si quieres profundizar</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-purple-400 font-bold">3.</span>
                <p>Podrás implementar las primeras automatizaciones en menos de una semana</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mb-6">
            <a
              href="https://calendly.com/fluia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Calendar className="w-5 h-5" />
              <span>Agendar llamada estratégica (opcional)</span>
            </a>
          </div>
        </div>

        {/* Restart Button */}
        <div className="text-center">
          <button
            onClick={onRestart}
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Realizar otro análisis</span>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            ¿Tienes alguna duda? Escríbenos a{' '}
            <a href="mailto:hola@fluia.com" className="text-purple-400 hover:text-purple-300 underline">
              hola@fluia.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};