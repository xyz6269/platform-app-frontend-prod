import React, { useState } from "react";
import axios from 'axios'; // Import axios
import { Mail, Lock, Loader2, CheckCircle, MessageCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';

// Note: You must install axios first: npm install axios

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Le mot de passe est requis";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);


    try {
      const response = await axios.post(`https://app-in-science.cc/api/v1/auth/signup`, formData);

      const data = response.data;

      if (data.token) {
        try {
          localStorage.setItem('memberToken', data.token);
        } catch (e) {
          console.error("Could not set item in localStorage", e);
        }

        navigate('/members');
      } else {
        setErrors({ general: "Réponse du serveur inattendue." });
      }

    } catch (error) {
      if (error.response) {
        const errorData = error.response.data;
        setErrors({ general: errorData.message || "Erreur de connexion. Veuillez vérifier vos identifiants." });
      } else if (error.request) {
        setErrors({ general: "Pas de réponse du serveur. Le serveur est peut-être hors ligne." });
      } else {
        setErrors({ general: "Erreur lors de la configuration de la requête." });
      }
      console.error("API call error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest flex items-center justify-center px-4 relative">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-24 left-16 w-32 h-32 border border-purple-400/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-24 right-20 w-40 h-40 border-2 border-cyber-blue/15 rotate-45 animate-spin-slow"></div>
        </div>

        <div className="max-w-md w-full relative z-10 mt-10 mb-10">
          <div className="text-center mb-8">
          <span className="font-fira text-sm text-purple-400 bg-purple-400/10 px-4 py-2 rounded-full border border-purple-400/30">
            [LOGIN_PROTOCOL]
          </span>
            <h1 className="font-orbitron text-4xl font-bold mt-4 mb-2 bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              CONNEXION SÉCURISÉE
            </h1>
            <p className="font-rajdhani text-gray-300">
              Accédez à votre espace membre en toute sécurité.
            </p>
          </div>

          <form
              onSubmit={handleSubmit}
              className="bg-black/40 border border-cyber-blue/20 rounded-2xl p-8 backdrop-blur-sm space-y-6"
          >
            {errors.general && (
                <div className="bg-red-500/10 border border-red-400/30 text-red-400 p-3 rounded-lg font-rajdhani text-sm">
                  {errors.general}
                </div>
            )}

            {/* Email */}
            <div>
              <label className="block font-rajdhani text-gray-300 mb-2">Email *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-cyber-blue w-5 h-5" />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="votre.email@example.com"
                    className={`w-full bg-black/30 border rounded-lg pl-10 pr-4 py-3 text-white font-rajdhani placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.email
                            ? "border-red-400 focus:ring-red-400/50"
                            : "border-cyber-blue/30 focus:ring-cyber-blue/50 focus:border-cyber-blue"
                    }`}
                />
              </div>
              {errors.email && (
                  <span className="text-red-400 text-sm font-rajdhani mt-1 block">
                {errors.email}
              </span>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block font-rajdhani text-gray-300 mb-2">Mot de passe *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 w-5 h-5" />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className={`w-full bg-black/30 border rounded-lg pl-10 pr-4 py-3 text-white font-rajdhani placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                        errors.password
                            ? "border-red-400 focus:ring-red-400/50"
                            : "border-purple-400/30 focus:ring-purple-400/50 focus:border-purple-400"
                    }`}
                />
              </div>
              {errors.password && (
                  <span className="text-red-400 text-sm font-rajdhani mt-1 block">
                {errors.password}
              </span>
              )}
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyber-blue to-cyan-400 text-black px-6 py-3 rounded-lg font-rajdhani font-semibold flex items-center justify-center hover:shadow-lg hover:shadow-cyber-blue/30 transition-all duration-300 hover:-translate-y-1 disabled:opacity-50"
            >
              {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5 mr-2" />
                    Connexion...
                  </>
              ) : (
                  "Se connecter"
              )}
            </button>

            <p className="text-gray-400 font-rajdhani text-sm text-center">
              Pas encore de compte ?
              <a href="/inscription" className="text-cyber-blue ml-1 hover:underline">
                Inscrivez-vous
              </a>
            </p>
          </form>
          {/* Info Panel */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/30 border border-cyber-blue/20 rounded-lg p-6">
              <Mail className="w-8 h-8 text-cyber-blue mb-3" />
              <h4 className="font-orbitron font-semibold text-cyber-blue mb-2">Confirmation Email</h4>
              <p className="font-rajdhani text-gray-300 text-sm">
                Vérifiez votre boîte mail après l'inscription
              </p>
            </div>

            <div className="bg-black/30 border border-purple-400/20 rounded-lg p-6">
              <MessageCircle className="w-8 h-8 text-green-400 mb-3" />
              <h4 className="font-orbitron font-semibold text-green-400 mb-2">WhatsApp Group</h4>
              <p className="font-rajdhani text-gray-300 text-sm">
                QR code inclus dans l'email de confirmation
              </p>
            </div>

            <div className="bg-black/30 border border-green-400/20 rounded-lg p-6">
              <CheckCircle className="w-8 h-8 text-yellow-400 mb-3" />
              <h4 className="font-orbitron font-semibold text-yellow-400 mb-2">Contact Équipe</h4>
              <p className="font-rajdhani text-gray-300 text-sm">
                Suivi personnalisé sous 48h maximum
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default LoginPage;
