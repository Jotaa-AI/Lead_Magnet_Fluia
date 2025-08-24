import React, { useState } from 'react';
import { Shield, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-12 h-12 text-purple-400 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Fluia
            </h1>
          </div>
          <p className="text-purple-200 text-lg">
            Lead Magnet Conversacional
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
            Escáner de Automatización: en 5 minutos detectamos atascos y te enviamos un informe gratis
          </h2>
          
          <p className="text-gray-300 text-lg mb-8">
            Responde como si charláramos. Te iremos guiando paso a paso.
          </p>

          {/* Privacy Notice */}
          <div className="bg-black/20 rounded-xl p-6 mb-6 border border-purple-500/20">
            <h3 className="text-white font-semibold mb-3 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-purple-400" />
              Aviso de Privacidad
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Usaremos tus respuestas para crear un informe personalizado y contactar contigo con información relevante. 
              Puedes solicitar la eliminación de tus datos cuando quieras escribiendo a{' '}
              <a href="mailto:privacy@fluia.com" className="text-purple-400 hover:text-purple-300 underline">
                privacy@fluia.com
              </a>
            </p>
            
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={accepted}
                onChange={handleAccept}
                className="w-5 h-5 mt-0.5 rounded border-2 border-purple-400 bg-transparent checked:bg-purple-500 checked:border-purple-500 focus:ring-2 focus:ring-purple-400 focus:ring-offset-0"
              />
              <span className="text-gray-300 text-sm">
                He leído y acepto el{' '}
                <a 
                  href="#" 
                  className="text-purple-400 hover:text-purple-300 underline"
                  onClick={(e) => e.preventDefault()}
                >
                  aviso de privacidad
                </a>
              </span>
            </label>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStart}
            disabled={!accepted}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center ${
              accepted
                ? 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            Empezar análisis
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            ⏱️ Solo 5 minutos • 🔒 100% confidencial • 📊 Informe gratuito
          </p>
        </div>
      </div>
    </div>
  );
};