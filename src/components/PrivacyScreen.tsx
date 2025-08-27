import React, { useState } from 'react';
import { Building2, ArrowRight, Shield, Clock, FileText, Zap, Users, TrendingUp, Star } from 'lucide-react';

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
      <div className="max-w-5xl w-full">
        {/* Header with Logo */}
        <div className="text-center mb-16">
          <div className="mb-12">
            <img 
              src="/fluialogo_grande.png" 
              alt="Logo" 
              className="w-40 h-40 mx-auto mb-8 drop-shadow-2xl"
            />
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Automatización Inmobiliaria
              </h1>
              <div className="max-w-4xl mx-auto">
                <p className="text-2xl text-gray-300 mb-4 leading-relaxed">
                  Descubre en <span className="text-purple-300 font-bold">5 minutos</span> qué procesos de tu inmobiliaria puedes automatizar
                </p>
                <div className="flex flex-wrap justify-center gap-6 text-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span className="text-yellow-300 font-semibold">Ahorra 15+ horas semanales</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-300 font-semibold">Aumenta ventas un 40%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-8 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl font-bold text-purple-300 mb-2">200+</div>
              <div className="text-white font-semibold mb-2">Inmobiliarias</div>
              <div className="text-gray-300 text-sm">Ya han optimizado sus procesos</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-br from-green-600/20 to-green-500/20 backdrop-blur-lg rounded-2xl p-8 border border-green-400/30 hover:border-green-400/50 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl font-bold text-green-300 mb-2">15h</div>
              <div className="text-white font-semibold mb-2">Promedio ahorrado</div>
              <div className="text-gray-300 text-sm">Por semana en tareas repetitivas</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-500/20 backdrop-blur-lg rounded-2xl p-8 border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl font-bold text-yellow-300 mb-2">1 sem</div>
              <div className="text-white font-semibold mb-2">Implementación</div>
              <div className="text-gray-300 text-sm">Resultados inmediatos</div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
            <Clock className="w-10 h-10 text-purple-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Solo 5 minutos</h3>
            <p className="text-gray-300 text-sm">Análisis rápido y personalizado</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
            <FileText className="w-10 h-10 text-purple-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Informe gratuito</h3>
            <p className="text-gray-300 text-sm">Plan de automatización detallado</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
            <Zap className="w-10 h-10 text-purple-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">Resultados inmediatos</h3>
            <p className="text-gray-300 text-sm">Implementación en 1 semana</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center hover:bg-white/10 transition-all duration-300">
            <TrendingUp className="w-10 h-10 text-purple-400 mx-auto mb-4" />
            <h3 className="text-white font-semibold mb-2">ROI garantizado</h3>
            <p className="text-gray-300 text-sm">Recupera la inversión en 30 días</p>
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-lg rounded-2xl p-8 border border-blue-400/20 mb-16">
          <div className="flex items-center justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <blockquote className="text-center text-white text-lg italic mb-4">
            "En 3 semanas automatizamos la captación de leads y el seguimiento. Ahora cerramos un 40% más de ventas con la mitad del esfuerzo."
          </blockquote>
          <div className="text-center text-gray-300">
            <div className="font-semibold">María González</div>
            <div className="text-sm">Directora Comercial, InmoPlus Madrid</div>
          </div>
        </div>

        {/* Main CTA Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/20 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¿Listo para automatizar tu inmobiliaria?
            </h2>
            <p className="text-gray-300 text-xl leading-relaxed">
              Únete a más de 200 inmobiliarias que ya han optimizado sus procesos y multiplicado sus resultados
            </p>
          </div>

          {/* Privacy Acceptance */}
          <div className="mb-10">
            <div className="bg-black/30 rounded-2xl p-8 border border-purple-500/30 mb-8">
              <div className="flex items-start space-x-4">
                <Shield className="w-8 h-8 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-bold text-lg mb-3">🔒 Protección de datos garantizada</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Usaremos tus respuestas únicamente para crear tu informe personalizado. 
                    Cumplimos con RGPD y puedes solicitar la eliminación de tus datos cuando quieras.
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Shield className="w-4 h-4" />
                    <span>100% Confidencial</span>
                    <span className="mx-2">•</span>
                    <Clock className="w-4 h-4" />
                    <span>Sin compromiso</span>
                    <span className="mx-2">•</span>
                    <FileText className="w-4 h-4" />
                    <span>Totalmente gratuito</span>
                  </div>
                </div>
              </div>
            </div>
            
            <label className="flex items-start space-x-4 cursor-pointer group p-4 rounded-xl hover:bg-white/5 transition-all duration-200">
              <input
                type="checkbox"
                checked={accepted}
                onChange={handleAccept}
                className="w-6 h-6 mt-1 rounded-lg border-2 border-purple-400 bg-transparent checked:bg-purple-500 checked:border-purple-500 focus:ring-2 focus:ring-purple-400 focus:ring-offset-0 transition-all duration-200"
              />
              <span className="text-gray-300 group-hover:text-white transition-colors leading-relaxed">
                ✅ Acepto el tratamiento de mis datos para recibir el informe personalizado de automatización
              </span>
            </label>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStart}
            disabled={!accepted}
            className={`w-full py-6 px-8 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center justify-center ${
              accepted
                ? 'bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 hover:from-purple-500 hover:via-purple-400 hover:to-purple-500 text-white shadow-2xl hover:shadow-purple-500/25 transform hover:scale-[1.02] active:scale-[0.98] animate-pulse hover:animate-none'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Building2 className="w-6 h-6 mr-3" />
            🚀 Empezar análisis gratuito
            <ArrowRight className="w-6 h-6 ml-3" />
          </button>

          {/* Additional info */}
          <div className="text-center mt-6">
            <p className="text-gray-400 text-sm">
              ⏱️ El análisis tarda aproximadamente 5 minutos • 📊 Recibirás tu informe por email en menos de 10 minutos
            </p>
          </div>
        </div>

        {/* Bottom trust indicators */}
        <div className="text-center mt-12">
          <div className="flex flex-wrap items-center justify-center gap-8 text-gray-400 text-sm">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>+200 empresas confían en nosotros</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Datos 100% seguros</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Respuesta inmediata</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};