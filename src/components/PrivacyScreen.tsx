import React, { useState } from 'react';
import { Building2, ArrowRight, Shield, Clock, FileText, Zap } from 'lucide-react';

interface PrivacyScreenProps {
  onAccept: () => void;
  onStart: () => void;
}

export const PrivacyScreen: React.FC<PrivacyScreenProps> = ({ onAccept, onStart }) => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    onAccept();
  };

  const handleStart = () => {
    if (accepted) {
      onStart();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header with Logo */}
        <div className="text-center mb-12">
          <div className="mb-8">
            <img 
              src="/fluialogo_grande.png" 
              alt="Fluia" 
              className="w-24 h-24 mx-auto mb-6"
            />
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Building2 className="w-8 h-8 text-blue-400" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Automatización Inmobiliaria
              </h1>
            </div>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
              Descubre en 5 minutos qué procesos de tu inmobiliaria puedes automatizar para 
              <span className="text-yellow-300 font-semibold"> ahorrar 15+ horas semanales</span> y 
              <span className="text-green-300 font-semibold"> aumentar tus ventas un 40%</span>
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
            <Clock className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Solo 5 minutos</h3>
            <p className="text-blue-200 text-sm">Análisis rápido y personalizado</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
            <FileText className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Informe gratuito</h3>
            <p className="text-blue-200 text-sm">Plan de automatización detallado</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 text-center">
            <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Resultados inmediatos</h3>
            <p className="text-blue-200 text-sm">Implementación en 1 semana</p>
          </div>
        </div>

        {/* Main CTA Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20 max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ¿Listo para automatizar tu inmobiliaria?
            </h2>
            <p className="text-blue-200 text-lg">
              Únete a más de 200 inmobiliarias que ya han optimizado sus procesos
            </p>
          </div>

          {/* Privacy Acceptance */}
          <div className="mb-8">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-blue-500/20 mb-6">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-2">Protección de datos</h3>
                  <p className="text-blue-200 text-sm mb-4">
                    Usaremos tus respuestas únicamente para crear tu informe personalizado. 
                    Puedes solicitar la eliminación de tus datos cuando quieras.
                  </p>
                </div>
              </div>
            </div>
            
            <label className="flex items-start space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={accepted}
                onChange={handleAccept}
                className="w-5 h-5 mt-1 rounded border-2 border-blue-400 bg-transparent checked:bg-blue-500 checked:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:ring-offset-0"
              />
              <span className="text-blue-200 text-sm group-hover:text-white transition-colors">
                Acepto el tratamiento de mis datos para recibir el informe personalizado
              </span>
            </label>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStart}
            disabled={!accepted}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center ${
              accepted
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Building2 className="w-5 h-5 mr-2" />
            Empezar análisis gratuito
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center space-x-8 text-blue-300 text-sm">
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4" />
              <span>100% Confidencial</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Sin compromiso</span>
            </div>
            <div className="flex items-center space-x-1">
              <FileText className="w-4 h-4" />
              <span>Informe gratuito</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};