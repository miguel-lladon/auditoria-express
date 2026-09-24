'use client';

import React, { useState, useEffect } from 'react';
import './globals.css';

const preguntas = [
  {
    num: 1,
    mundo: 1,
    texto: "¿Sabes que cuando pones precio, el margen real no es el mismo % que el markup?\n\nPor ejemplo: 50% markup = 33% margen real.\n\n¿Conoces esta diferencia?",
    opciones: [
      { texto: "Si", puntos: 4 },
      { texto: "No", puntos: 0 }
    ]
  },
  {
    num: 2,
    mundo: 1,
    texto: "¿Haces cada mes un calculo de: Ventas - Costos - Gastos = Ganancia?",
    opciones: [
      { texto: "Si", puntos: 4 },
      { texto: "No", puntos: 0 }
    ]
  },
  {
    num: 3,
    mundo: 1,
    texto: "¿Sabes cuanto necesitas vender minimo para cubrir todos tus gastos y no perder?",
    opciones: [
      { texto: "Si", puntos: 4 },
      { texto: "No", puntos: 0 }
    ]
  },
  {
    num: 4,
    mundo: 1,
    texto: "¿Si trabajas en tu negocio, te pagas un sueldo fijo cada mes?",
    opciones: [
      { texto: "Si", puntos: 4 },
      { texto: "No / No aplica", puntos: 0 }
    ]
  },
  {
    num: 5,
    mundo: 2,
    texto: "¿Tienes un registro de cuanto dinero sacas del negocio cada mes para gastos personales?",
    opciones: [
      { texto: "Si", puntos: 4 },
      { texto: "No", puntos: 0 }
    ]
  },
  {
    num: 6,
    mundo: 2,
    texto: "¿Tienes separadas la cuenta del negocio y la cuenta personal?",
    opciones: [
      { texto: "Si", puntos: 4 },
      { texto: "No", puntos: 0 }
    ]
  },
  {
    num: 7,
    mundo: 2,
    texto: "De lo que gana el negocio, ¿sacas maximo 50% para ti?",
    opciones: [
      { texto: "Si", puntos: 4 },
      { texto: "No", puntos: 0 }
    ]
  },
  {
    num: 8,
    mundo: 3,
    texto: "¿Haces inventario al menos 1 vez al mes?",
    opciones: [
      { texto: "Si", puntos: 4 },
      { texto: "No", puntos: 0 }
    ]
  },
  {
    num: 9,
    mundo: 3,
    texto: "¿Sabes cuanto dinero tienes inmovilizado en productos que no se venden?",
    opciones: [
      { texto: "Si", puntos: 4 },
      { texto: "No", puntos: 0 }
    ]
  },
  {
    num: 10,
    mundo: 3,
    texto: "¿Llevas el control de stock con software o Excel (no manual)?",
    opciones: [
      { texto: "Si", puntos: 4 },
      { texto: "No", puntos: 0 }
    ]
  },
  {
    num: 11,
    mundo: 4,
    texto: "¿Sabes exactamente cuanto dinero debes a proveedores cada mes?",
    opciones: [
      { texto: "Si", puntos: 4 },
      { texto: "No", puntos: 0 }
    ]
  },
  {
    num: 12,
    mundo: 4,
    texto: "¿Sabes cuanto dinero te deben tus clientes y en cuantos dias pagan?",
    opciones: [
      { texto: "Si", puntos: 4 },
      { texto: "No", puntos: 0 }
    ]
  },
  {
    num: 13,
    mundo: 4,
    texto: "¿Sabes cuantos meses de ganancia necesitas para pagar todas tus deudas?",
    opciones: [
      { texto: "Si", puntos: 4 },
      { texto: "No", puntos: 0 }
    ]
  }
];

export default function AuditoriaExpress() {
  const [screen, setScreen] = useState('inicio');
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [usuario, setUsuario] = useState({
    dueño: '',
    negocio: '',
    rubro: '',
    facturacion: '',
    facturacionKey: '',
    respuestas: {}
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const [scores, setScores] = useState({});

  const handleInputChange = (field, value) => {
    setUsuario(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStartAuditoria = () => {
    if (!usuario.dueño.trim() || !usuario.negocio.trim() || !usuario.rubro.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }
    setScreen('preguntas');
    setPreguntaActual(0);
  };

  const handleSelectOption = (puntos) => {
    const pregunta = preguntas[preguntaActual];
    setUsuario(prev => ({
      ...prev,
      respuestas: {
        ...prev.respuestas,
        [pregunta.num]: {
          mundo: pregunta.mundo,
          puntos: puntos
        }
      }
    }));
    setSelectedOption(puntos);
    setTimeout(() => {
      if (preguntaActual < preguntas.length - 1) {
        setPreguntaActual(preguntaActual + 1);
        setSelectedOption(null);
      } else {
        setScreen('facturacion');
      }
    }, 300);
  };

  const handleFacturacion = (label, key) => {
    setUsuario(prev => ({
      ...prev,
      facturacion: label,
      facturacionKey: key
    }));
    setTimeout(() => {
      calcularResultados(key);
    }, 300);
  };

  const calcularResultados = (facturacionKey) => {
    const nuevosScores = { 1: 0, 2: 0, 3: 0, 4: 0 };
    const maximos = { 1: 16, 2: 12, 3: 12, 4: 12 };

    for (let num in usuario.respuestas) {
      const resp = usuario.respuestas[num];
      nuevosScores[resp.mundo] += resp.puntos;
    }

    const porcentajes = {
      1: Math.round((nuevosScores[1] / maximos[1]) * 100),
      2: Math.round((nuevosScores[2] / maximos[2]) * 100),
      3: Math.round((nuevosScores[3] / maximos[3]) * 100),
      4: Math.round((nuevosScores[4] / maximos[4]) * 100)
    };

    const scoreTotal = Math.round((Object.values(porcentajes).reduce((a, b) => a + b, 0)) / 4);

    setScores({
      porcentajes,
      scoreTotal,
      costoMensual: facturacionKey === 'menos-3m' ? 30000 : 
                   facturacionKey === '3m-10m' ? 80000 :
                   facturacionKey === '10m-20m' ? 160000 : 320000
    });

    setScreen('resultados');
  };

  const descargarPDF = () => {
    const element = document.getElementById('resultados-content');
    const opt = {
      margin: 10,
      filename: `Auditoria_${usuario.negocio.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };
    const html2pdf = require('html2pdf.js');
    html2pdf().set(opt).from(element).save();
  };

  const getEstado = (score) => {
    if (score <= 25) return { label: '🔴 CRITICO', color: '#ef4444' };
    if (score <= 50) return { label: '🟠 ALERTA', color: '#f97316' };
    if (score <= 75) return { label: '🟡 BIEN', color: '#eab308' };
    return { label: '🟢 EXCELENTE', color: '#22c55e' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-width-620 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-12 shadow-2xl border border-lime-500/10 min-h-96">

        {/* PANTALLA 1: INICIO */}
        {screen === 'inicio' && (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-black bg-gradient-to-r from-lime-400 to-lime-600 bg-clip-text text-transparent mb-3">
                AUDITORIA EXPRESS
              </h1>
              <p className="text-gray-400 text-base font-medium tracking-wide">Salud Financiera de tu Negocio</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-gray-300 text-sm font-bold mb-2 uppercase tracking-wider">Tu nombre:</label>
                <input
                  type="text"
                  placeholder="Ej: Juan García"
                  value={usuario.dueño}
                  onChange={(e) => handleInputChange('dueño', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border-2 border-lime-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-lime-500 focus:bg-slate-700 transition-all duration-300 font-medium"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-bold mb-2 uppercase tracking-wider">Nombre del negocio:</label>
                <input
                  type="text"
                  placeholder="Ej: La Ferretería Central"
                  value={usuario.negocio}
                  onChange={(e) => handleInputChange('negocio', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border-2 border-lime-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-lime-500 focus:bg-slate-700 transition-all duration-300 font-medium"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-bold mb-2 uppercase tracking-wider">Rubro:</label>
                <input
                  type="text"
                  placeholder="Ej: Almacen, Farmacia, Restaurante..."
                  value={usuario.rubro}
                  onChange={(e) => handleInputChange('rubro', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border-2 border-lime-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-lime-500 focus:bg-slate-700 transition-all duration-300 font-medium"
                />
              </div>
            </div>

            <button
              onClick={handleStartAuditoria}
              className="w-full mt-8 bg-gradient-to-r from-lime-400 to-lime-600 hover:from-lime-500 hover:to-lime-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-2xl uppercase tracking-wider text-sm"
            >
              Empezar Auditoria
            </button>
          </div>
        )}

        {/* PANTALLA 2: PREGUNTAS */}
        {screen === 'preguntas' && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-lime-400 to-lime-600 shadow-lg shadow-lime-500/50 transition-all duration-500"
                  style={{width: `${((preguntaActual + 1) / preguntas.length) * 100}%`}}
                />
              </div>
              <p className="text-gray-400 text-xs mt-2 text-center">Pregunta {preguntaActual + 1} de {preguntas.length}</p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-100 mb-8 leading-relaxed">
                {preguntas[preguntaActual].texto}
              </h2>

              <div className="space-y-3">
                {preguntas[preguntaActual].opciones.map((opcion, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opcion.puntos)}
                    className={`w-full p-4 rounded-xl font-bold transition-all duration-300 transform border-2 ${
                      selectedOption === opcion.puntos
                        ? 'bg-gradient-to-r from-lime-400 to-lime-600 border-lime-600 text-white scale-105 shadow-lg shadow-lime-500/50'
                        : 'bg-slate-700/50 border-lime-500/30 text-gray-100 hover:border-lime-500 hover:bg-slate-700 hover:-translate-y-1'
                    }`}
                  >
                    {opcion.texto}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => preguntaActual > 0 && setPreguntaActual(preguntaActual - 1)}
                className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all duration-300 uppercase text-xs tracking-wider ${
                  preguntaActual === 0
                    ? 'opacity-30 cursor-not-allowed bg-slate-700/30 text-gray-500'
                    : 'bg-slate-700/50 border-2 border-lime-500/30 text-gray-100 hover:border-lime-500 hover:bg-slate-700'
                }`}
                disabled={preguntaActual === 0}
              >
                Anterior
              </button>
            </div>
          </div>
        )}

        {/* PANTALLA 3: FACTURACION */}
        {screen === 'facturacion' && (
          <div className="animate-fade-in">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-100 mb-6">¿Cual es tu facturacion mensual aproximada?</h2>
              <div className="space-y-3">
                {[
                  { label: 'Menos de $3 millones', key: 'menos-3m' },
                  { label: 'Entre $3M y $10M', key: '3m-10m' },
                  { label: 'Entre $10M y $20M', key: '10m-20m' },
                  { label: 'Mas de $20M', key: '20m+' }
                ].map((opcion) => (
                  <button
                    key={opcion.key}
                    onClick={() => handleFacturacion(opcion.label, opcion.key)}
                    className="w-full p-4 rounded-xl font-bold transition-all duration-300 transform bg-slate-700/50 border-2 border-lime-500/30 text-gray-100 hover:border-lime-500 hover:bg-slate-700 hover:-translate-y-1"
                  >
                    {opcion.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setPreguntaActual(preguntaActual - 1);
                setScreen('preguntas');
              }}
              className="w-full py-3 px-4 rounded-xl font-bold bg-slate-700/50 border-2 border-lime-500/30 text-gray-100 hover:border-lime-500 uppercase text-xs tracking-wider transition-all"
            >
              Anterior
            </button>
          </div>
        )}

        {/* PANTALLA 4: RESULTADOS */}
        {screen === 'resultados' && scores.scoreTotal !== undefined && (
          <div id="resultados-content" className="animate-fade-in">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-black bg-gradient-to-r from-lime-400 to-lime-600 bg-clip-text text-transparent mb-2">
                AUDITORIA EXPRESS
              </h1>
              <p className="text-gray-400 text-sm">{usuario.negocio} | {usuario.rubro}</p>
            </div>

            <div className="bg-gradient-to-br from-slate-700/50 to-slate-700/30 rounded-2xl p-8 mb-6 border border-lime-500/20 text-center">
              <div className="text-6xl font-black bg-gradient-to-r from-lime-400 to-lime-600 bg-clip-text text-transparent mb-2">
                {scores.scoreTotal}
              </div>
              <p className="text-gray-300 text-sm mb-4 font-semibold">{getEstado(scores.scoreTotal).label}</p>
              <div className="w-full h-3 bg-slate-600 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-lime-400 to-lime-600 shadow-lg shadow-lime-500/50 transition-all duration-1000"
                  style={{width: `${scores.scoreTotal}%`}}
                />
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-700/50 to-slate-700/30 rounded-xl p-6 mb-6 border-l-4 border-lime-500 text-sm">
              <p className="text-gray-300 font-semibold mb-2">Tu facturacion: <span className="text-lime-400">{usuario.facturacion}</span></p>
              <p className="text-gray-400 text-xs leading-relaxed">
                Cada % de desorden te cuesta <span className="text-lime-400 font-bold">${scores.costoMensual.toLocaleString('es-AR')}/mes</span>
              </p>
              <p className="text-gray-400 text-xs mt-2">
                Tu <span className="text-lime-400 font-bold">{100 - scores.scoreTotal}% de desorden</span> = ${Math.round(scores.costoMensual * 12 * ((100 - scores.scoreTotal) / 100)).toLocaleString('es-AR')}/año
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {[1, 2, 3, 4].map((m) => (
                <div key={m} className="bg-slate-700/30 border-l-4 border-lime-500 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300 font-bold text-sm uppercase tracking-wider">Mundo {m}</span>
                    <span className="text-lime-400 font-black">{scores.porcentajes[m]}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-600 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-lime-400 to-lime-600"
                      style={{width: `${scores.porcentajes[m]}%`}}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <a
                href="https://docs.google.com/spreadsheets/d/1RCO3AAGgFkUBrqtZfjDwDXxFM5YBJi3eMWaiiuXFmG8/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-lime-400 to-lime-600 hover:from-lime-500 hover:to-lime-700 text-white font-bold py-6 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-2xl flex flex-col items-center justify-center gap-2 text-center text-sm uppercase tracking-wider"
              >
                <span className="text-2xl">∑</span>
                <span>Calculadora</span>
              </a>

              <a
                href="https://instagram.com/miguel.lladon.ok"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-orange-400 via-pink-500 to-pink-600 hover:from-orange-500 hover:via-pink-600 hover:to-pink-700 text-white font-bold py-6 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-2xl flex flex-col items-center justify-center gap-3 text-center text-sm uppercase tracking-wider"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.88 1.44 1.44 0 010 2.88z"/>
                </svg>
                <span>Instagram</span>
              </a>

              <a
                href="https://wa.me/3855159169"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-6 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-2 shadow-lg hover:shadow-2xl flex flex-col items-center justify-center gap-3 text-center text-sm uppercase tracking-wider col-span-2"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.2-4.82 5.591-4.82 9.328 0 3.937 1.796 7.6 4.95 10.237l-.534 1.897c-.415 1.478.891 2.746 2.304 1.977l2.94-1.531c.885.177 1.79.266 2.693.266 5.545 0 10.148-4.556 10.148-10.148S17.545 2 12 2c-5.545 0-10.148 4.556-10.148 10.148 0 1.91.55 3.734 1.585 5.322l-.534 1.897c-.415 1.478.891 2.746 2.304 1.977l2.94-1.531a9.872 9.872 0 004.853-1.265"/>
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>

            <button
              onClick={descargarPDF}
              className="w-full bg-gradient-to-r from-lime-400 to-lime-600 hover:from-lime-500 hover:to-lime-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-2xl uppercase tracking-wider text-sm"
            >
              ↓ Descargar Informe PDF
            </button>

            <p className="text-center text-gray-500 text-xs mt-6 pt-6 border-t border-slate-700">
              Miguel Lladon | Consultor de Finanzas para Negocios
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
