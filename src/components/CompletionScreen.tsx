import React from 'react';

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
        {/* Main Content Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="text-center space-y-6">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              ✅ ¡Excelente! Todo listo
            </h1>
            
            <p className="text-gray-300 text-lg">
              Gracias por invertir estos minutos en mejorar vuestra empresa.
            </p>

            {/* Email notification */}
            <div className="bg-gradient-to-r from-purple-600/20 to-purple-500/20 rounded-xl p-6 border border-purple-400/30">
              <h2 className="text-white font-semibold text-xl mb-2">
                📬 Tu informe personalizado llegará en breves momentos
              </h2>
              <p className="text-gray-300">
                (Normalmente tarda 5-7 minutos)
              </p>
            </div>

            <p className="text-gray-300 text-lg">
              Hemos analizado todo lo que nos has compartido:
            </p>

            {/* What we've prepared */}
            <div className="text-left">
              <h3 className="text-white font-bold text-xl mb-6 text-center">
                📈 Lo que hemos preparado para ti:
              </h3>
              
              <div className="space-y-6">
                <div className="bg-black/20 rounded-xl p-6 border border-white/10">
                  <h4 className="text-white font-semibold text-lg mb-2">Tu automatización clave 🔧</h4>
                  <p className="text-gray-300">Plan detallado para los procesos que os consumen más horas semanales</p>
                </div>

                <div className="bg-black/20 rounded-xl p-6 border border-white/10">
                  <h4 className="text-white font-semibold text-lg mb-2">Cálculo de impacto 💰</h4>
                  <p className="text-gray-300">Cómo recuperar esas horas/€ perdidos de forma sistemática</p>
                </div>

                <div className="bg-black/20 rounded-xl p-6 border border-white/10">
                  <h4 className="text-white font-semibold text-lg mb-2">Hoja de ruta 🗺️</h4>
                  <p className="text-gray-300">3 fases claras para implementar en tiempo récord</p>
                </div>

                <div className="bg-black/20 rounded-xl p-6 border border-white/10">
                  <h4 className="text-white font-semibold text-lg mb-2">Quick wins ⚡</h4>
                  <p className="text-gray-300">Acciones que puedes implementar esta misma semana sin inversión</p>
                </div>

                <div className="bg-black/20 rounded-xl p-6 border border-white/10">
                  <h4 className="text-white font-semibold text-lg mb-2">Casos relevantes 🏢</h4>
                  <p className="text-gray-300">Empresas como la vuestra que ya han automatizado procesos similares</p>
                </div>
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-gradient-to-r from-yellow-600/20 to-orange-500/20 rounded-xl p-6 border border-yellow-400/30 text-left">
              <h3 className="text-white font-bold text-lg mb-3">
                🎯 Recomendación:
              </h3>
              <p className="text-gray-300 leading-relaxed">
                El informe está estructurado por prioridad. Empieza por la sección marcada como <span className="text-yellow-300 font-semibold">"FASE 1"</span> - es donde verás resultados más rápidos basándonos en vuestra urgencia/situación.
              </p>
            </div>

            {/* Final messages */}
            <p className="text-gray-300 text-lg">
              📊 Prepárate para ver tu negocio con otros ojos... Los números a veces sorprenden.
            </p>

            <div className="bg-gradient-to-r from-green-600/20 to-blue-500/20 rounded-xl p-6 border border-green-400/30">
              <h3 className="text-white font-bold text-lg mb-3">
                🚀 ¿Quieres acelerar el proceso?
              </h3>
              <p className="text-gray-300">
                Visita <span className="text-blue-300 font-semibold">www.fluia.es</span> para descubrir más casos de éxito
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};