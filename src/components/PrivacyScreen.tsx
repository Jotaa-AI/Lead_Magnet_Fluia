import React, { useState } from 'react';
import { CheckCircle, Clock, TrendingUp, Users, ArrowRight } from 'lucide-react';

interface PrivacyScreenProps {
  onAccept: () => void;
  onStart: () => void;
}

export default function PrivacyScreen({ onAccept, onStart }: PrivacyScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header with Logo */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/fluialogo copy.png" 
              alt="Fluia Logo" 
              className="h-32 w-32"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Escáner con IA para RR.HH: en 5 minutos detectamos cuellos de botella para el sector de RR.HH. y te enviamos un informe gratis
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Responde como si charláramos. Te iremos guiando paso a paso.
          </p>
        </div>

        {/* Trust Building Section */}
        <div className="text-center mb-8">
          <p className="text-lg text-purple-200 mb-4">
            ✨ <strong>Más de 50 empresas</strong> ya han optimizado sus procesos con nuestro análisis
          </p>
          <p className="text-gray-300">
            🎯 Identificamos exactamente dónde estás perdiendo tiempo y dinero
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
            <h3 className="text-white font-semibold mb-2">15+ horas</h3>
            <p className="text-gray-300 text-sm">Recuperadas semanalmente</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">100% gratis</h3>
            <p className="text-gray-300 text-sm">Sin compromiso ni letra pequeña</p>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Preparado para descubrir tu potencial de automatización?
            </h3>
            <p className="text-gray-300 mb-6">
              Te haremos unas preguntas estratégicas para crear tu hoja de ruta personalizada
            </p>
            
            {/* What we'll analyze */}
            <div className="bg-black/20 rounded-xl p-6 mb-8">
              <h4 className="text-white font-semibold mb-4">📋 Analizaremos:</h4>
              <div className="grid md:grid-cols-2 gap-3 text-left">
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-purple-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">Procesos que más tiempo consumen</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-purple-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">Herramientas que ya usas</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-purple-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">Canales de captación actuales</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <CheckCircle className="w-4 h-4 text-purple-400 mr-2 flex-shrink-0" />
                  <span className="text-sm">Oportunidades de mejora inmediata</span>
                </div>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={() => {
              onAccept();
              onStart();
            }}
            className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center mx-auto bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
          >
            Empezar análisis
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>

          <p className="text-xs text-gray-400 mt-4">
            🔒 Tus datos están seguros • 100% gratuito • Sin spam
          </p>
        </div>
      </div>
    </div>
  );
}