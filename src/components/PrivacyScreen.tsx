import React, { useState } from 'react';
import { CheckCircle, Clock, TrendingUp, Users, ArrowRight } from 'lucide-react';

interface PrivacyScreenProps {
  onAccept: () => void;
  onStart: () => void;
}

export default function PrivacyScreen({ onAccept, onStart }: PrivacyScreenProps) {
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const handleStartClick = () => {
    if (privacyAccepted) {
      onAccept(); // Accept privacy first
      onStart();  // Then start the session
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header with Logo */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/fluialogo_grande.png" 
              alt="Fluia Logo" 
              className="h-40
            w-auto"
            />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Análisis Gratuito de Automatización
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Descubre cómo automatizar tu inmobiliaria y recuperar 15+ horas semanales
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <Clock className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">5 minutos</h3>
            <p className="text-gray-300 text-sm">Análisis completo y personalizado</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">+40% ventas</h3>
            <p className="text-gray-300 text-sm">Incremento promedio reportado</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">200+ agencias</h3>
            <p className="text-gray-300 text-sm">Ya confían en nuestro sistema</p>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Listo para transformar tu inmobiliaria?
            </h3>
            <p className="text-gray-300 mb-6">
              Nuestro análisis identificará exactamente qué procesos automatizar para maximizar tu ROI
            </p>
            
            {/* What we'll analyze */}
            <div className="bg-black/20 rounded-xl p-6 mb-8">
              <h4 className="text-white font-semibold mb-4">Analizaremos:</h4>
              <div className="grid md:grid-cols-2 gap-3 text-left">
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-purple-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">Gestión de leads y seguimiento</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-purple-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">Comunicación con clientes</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-purple-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">Procesos administrativos</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-purple-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">Marketing y captación</span>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Acceptance */}
          <div className="mb-8">
            <label className="flex items-start justify-center text-left cursor-pointer group">
              <input
                type="checkbox"
                checked={privacyAccepted}
                onChange={(e) => setPrivacyAccepted(e.target.checked)}
                className="mt-1 mr-3 w-4 h-4 text-purple-600 bg-transparent border-2 border-purple-400 rounded focus:ring-purple-500 focus:ring-2"
              />
              <span className="text-sm text-gray-300 max-w-md">
                Acepto el procesamiento de mis datos para recibir el análisis personalizado y comunicaciones relevantes sobre automatización empresarial
              </span>
            </label>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStartClick}
            disabled={!privacyAccepted}
            className={`
              px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center mx-auto
              ${privacyAccepted 
                ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-purple-500/25 transform hover:scale-105' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            {privacyAccepted ? (
              <>
                Comenzar análisis gratuito
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            ) : (
              'Acepta la política para continuar'
            )}
          </button>

          <p className="text-xs text-gray-400 mt-4">
            100% gratuito • Sin compromiso • Resultados inmediatos
          </p>
        </div>
      </div>
    </div>
  );
}