import React, { useState } from "react";
import axios from 'axios';
import { Mail, Lock, Loader2, CheckCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(""); // New notification state
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

    if (!formData.email.trim()) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Format d'email invalide";

    if (!formData.password.trim()) newErrors.password = "Le mot de passe est requis";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setNotification(""); // clear previous notification

    try {
      const response = await axios.post(`https://app-in-science.cc/api/v1/auth/authenticate`, formData);
      const data = response.data;

      if (data.token) {
        try {
          localStorage.setItem('memberToken', data.token);
        } catch (e) {
          console.error("Could not set item in localStorage", e);
        }

        // Show notification instead of immediately navigating
        setNotification("✅ Vous êtes authentifié ! Nous examinerons votre demande pour rejoindre le club.");
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
        <div className="max-w-md w-full relative z-10 mt-10 mb-10">
          <div className="text-center mb-8">
            <h1 className="font-orbitron text-4xl font-bold mt-4 mb-2 bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              CONNEXION SÉCURISÉE
            </h1>
            <p className="font-rajdhani text-gray-300">
              Accédez à votre espace membre en toute sécurité.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-black/40 border border-cyber-blue/20 rounded-2xl p-8 backdrop-blur-sm space-y-6">
            {errors.general && (
                <div className="bg-red-500/10 border border-red-400/30 text-red-400 p-3 rounded-lg font-rajdhani text-sm">
                  {errors.general}
                </div>
            )}

            {notification && (
                <div className="bg-green-500/10 border border-green-400/30 text-green-400 p-3 rounded-lg font-rajdhani text-sm">
                  {notification}
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
              {errors.email && <span className="text-red-400 text-sm font-rajdhani mt-1 block">{errors.email}</span>}
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
              {errors.password && <span className="text-red-400 text-sm font-rajdhani mt-1 block">{errors.password}</span>}
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
        </div>
      </div>
  );
};

export default LoginPage;
