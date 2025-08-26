import React from 'react';
import { CheckCircle, Mail, Calendar, RotateCcw, TrendingUp, Clock, Target, Zap } from 'lucide-react';

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
      <div className="max-w-3xl w-full">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ✅ ¡Excelente! Todo listo
          </h1>
          <p className="text-gray-300 text-lg">
            Gracias por invertir estos minutos en mejorar vuestra empresa.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 mb-6">
          {/* Email notification */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 rounded-xl p-6 border border-purple-400/30 mb-6">
              <div className="flex items-center justify-center mb-3">
                <Mail className="w-6 h-6 text-purple-400 mr-2" />
                <h2 className="text-white font-semibold text-xl">
                  Tu informe personalizado llegará en breves momentos
                </h2>
              </div>
              <p className="text-gray-300">
                (Normalmente tarda 5-7 minutos)
              </p>
              {email && (
                <p className="text-purple-300 mt-2">
                  📧 Enviado a: <span className="font-semibold">{email}</span>
                </p>
              )}
            </div>
          </div>

          {/* Analysis Summary */}
          <div className="mb-8">
            <p className="text-gray-300 text-center mb-6">
              Hemos analizado todo lo que nos has compartido:
            </p>
          </div>

          {/* What we've prepared */}
          <div className="mb-8">
            <h3 className="text-white font-bold text-xl mb-6 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 mr-2 text-purple-400" />
              Lo que hemos preparado para ti:
            </h3>
            
            <div className="space-y-4">
              <div className="bg-black/20 rounded-xl p-4 border border-white/10">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Tu automatización clave</h4>
                    <p className="text-gray-300 text-sm">Plan detallado para los procesos que os consumen más horas semanales</p>
                  </div>
                </div>
              </div>

              <div className="bg-black/20 rounded-xl p-4 border border-white/10">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Cálculo de impacto</h4>
                    <p className="text-gray-300 text-sm">Cómo recuperar esas horas/€ perdidos de forma sistemática</p>
                  </div>
                </div>
              </div>

              <div className="bg-black/20 rounded-xl p-4 border border-white/10">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Hoja de ruta</h4>
                    <p className="text-gray-300 text-sm">3 fases claras para implementar en tiempo récord</p>
                  </div>
                </div>
              </div>

              <div className="bg-black/20 rounded-xl p-4 border border-white/10">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Quick wins</h4>
                    <p className="text-gray-300 text-sm">Acciones que puedes implementar esta misma semana sin inversión</p>
                  </div>
                </div>
              </div>

              <div className="bg-black/20 rounded-xl p-4 border border-white/10">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Casos relevantes</h4>
                    <p className="text-gray-300 text-sm">Empresas como la vuestra que ya han automatizado procesos similares</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-gradient-to-r from-yellow-600/20 to-orange-500/20 rounded-xl p-6 border border-yellow-400/30 mb-8">
            <h3 className="text-white font-bold mb-3 flex items-center">
              <Target className="w-5 h-5 mr-2 text-yellow-400" />
              Recomendación:
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              El informe está estructurado por prioridad. Empieza por la sección marcada como <span className="text-yellow-300 font-semibold">"FASE 1"</span> - es donde verás resultados más rápidos basándonos en su urgencia/situación.
            </p>
          </div>

          {/* Final message */}
          <div className="text-center mb-6">
            <p className="text-gray-300 text-lg">
              Prepárate para ver tu negocio con otros ojos... Los números a veces sorprenden 📊
            </p>
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
        <div className="text-center mb-6">
          <button
            onClick={onRestart}
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Realizar otro análisis</span>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center">
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