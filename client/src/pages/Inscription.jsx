import React, { useState } from 'react';
import axios from 'axios';
import { Mail, User, Phone, GraduationCap, Code, Loader2, CheckCircle, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InscriptionPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    password: '',
    confirmPassword: '',
    major: '',
    academicYear: '',
    interests: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const majors = [
    { value: 'ISIC', label: 'Ingénierie des systèmes d\'information et de communication (ISIC)' },
    { value: 'G2E', label: 'Génie Energétique et Electrique (G2E)' },
    { value: 'GI', label: 'Génie Industriel (GI)' },
    { value: '2ITE', label: 'Ingénierie Informatique et Technologies émergentes (2ITE)' },
    { value: 'GC', label: 'Génie Civil (GC)' },
    { value: 'CCN', label: 'Cybersécurité et Confiance Numérique (CCN)' },
    { value: 'SDIA', label: 'Master Intelligence Artificielle (SDIA)' },
    { value: 'CP', label: 'Cycle Préparatoire (CP)' },
  ];

  const genderOptions = [
    { value: 'MALE', label: 'Homme' },
    { value: 'FEMALE', label: 'Femme' }
  ];

  const getAcademicYears = (selectedMajor) => {
    if (selectedMajor === 'CP') return ['FIRST_YEAR', 'SECOND_YEAR'];
    if (selectedMajor === 'SDIA') return ['FOURTH_YEAR', 'FIFTH_YEAR'];
    return ['THIRD_YEAR', 'FOURTH_YEAR', 'FIFTH_YEAR'];
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'major') {
      setFormData(prev => ({ ...prev, [name]: value, academicYear: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const { firstName, lastName, email, phoneNumber, gender, password, confirmPassword, major, academicYear, interests } = formData;

    if (!firstName.trim()) newErrors.firstName = 'Le prénom est requis';
    if (!lastName.trim()) newErrors.lastName = 'Le nom est requis';
    if (!email.trim()) newErrors.email = 'L\'email est requis';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Format d\'email invalide';
    if (!phoneNumber.trim()) newErrors.phoneNumber = 'Le téléphone est requis';
    if (!gender) newErrors.gender = 'Le genre est requis';
    if (!major) newErrors.major = 'La filière est requise';
    if (!password) newErrors.password = 'Le mot de passe est requis';
    if (!confirmPassword) newErrors.confirmPassword = 'Confirmez votre mot de passe';
    if (password && password.length < 6) newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    if (password && confirmPassword && password !== confirmPassword) newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    if (major && !['CP', 'SDIA'].includes(major) && !academicYear) newErrors.academicYear = 'Le niveau d\'études est requis';
    if (!interests.trim()) newErrors.interests = 'Les centres d\'intérêt sont requis';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);


    const backendPayload = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phoneNumber: formData.phoneNumber,
      gender: formData.gender,
      major: formData.major,
      academicYear: formData.academicYear || formData.major,
      interests: formData.interests,
      password: formData.password
    };

    try {
      const response = await axios.post(`https://app-in-science.cc/api/v1/auth/signup`, backendPayload);

      if (response.status >= 200 && response.status < 300) {
        setIsSubmitted(true);
      } else {
        setErrors({ general: response.data?.message || "Erreur lors de l'inscription." });
      }
    } catch (error) {
      if (error.response) {
        setErrors({ general: error.response.data.message || "Erreur lors de l'inscription." });
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

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      gender: '',
      password: '',
      confirmPassword: '',
      major: '',
      academicYear: '',
      interests: '',
    });
    setErrors({});
  };

  if (isSubmitted) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest flex items-center justify-center px-4">
          <div className="max-w-2xl w-full text-center">
            <div className="bg-black/40 border border-green-400/30 rounded-2xl p-12 backdrop-blur-sm">
              <div className="mb-8">
                <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4 animate-pulse" />
                <h2 className="font-orbitron text-3xl font-bold text-green-400 mb-4">INSCRIPTION CONFIRMÉE</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto"></div>
              </div>
              <div className="space-y-6 text-left">
                <div className="bg-black/30 border border-cyber-blue/20 rounded-lg p-6">
                  <h3 className="font-orbitron text-lg font-semibold text-cyber-blue mb-4">Prochaines étapes :</h3>
                  <div className="space-y-3 font-rajdhani text-gray-300">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyber-blue rounded-full mt-2 flex-shrink-0"></div>
                      <span>Un email de confirmation a été envoyé à <span className="text-cyan-400">{formData.email}</span></span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Veuillez vérifier votre boîte de réception pour les instructions d'activation.</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Nous examinerons votre demande pour rejoindre le club.</span>
                    </div>
                  </div>
                </div>
                <div className="bg-black/30 border border-purple-400/20 rounded-lg p-6">
                  <h3 className="font-orbitron text-lg font-semibold text-purple-400 mb-3">En attendant...</h3>
                  <p className="font-rajdhani text-gray-300 mb-4">Connectez-vous pour accéder à votre tableau de bord.</p>
                  <button onClick={() => navigate('/connexion')} className="border border-purple-400 text-purple-400 px-8 py-3 rounded-lg font-rajdhani font-semibold hover:bg-purple-400/10 transition-all duration-300 hover:-translate-y-1">
                    Retour à la Connexion
                  </button>
                </div>
              </div>
              <div className="mt-8">
                <button onClick={resetForm} className="bg-gradient-to-r from-cyber-blue to-cyan-400 text-black px-8 py-3 rounded-lg font-rajdhani font-semibold hover:shadow-lg hover:shadow-cyber-blue/30 transition-all duration-300">
                  S'inscrire à nouveau
                </button>
              </div>
            </div>
          </div>
        </div>
    );
  }

  // Default form rendering
  return (
      <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest flex items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          <form onSubmit={handleSubmit} className="bg-black/40 border border-cyber-blue/20 rounded-2xl p-8 backdrop-blur-sm space-y-6">
            {errors.general && (
                <div className="bg-red-500/10 border border-red-400/30 text-red-400 p-3 rounded-lg font-rajdhani text-sm">
                  {errors.general}
                </div>
            )}
            {/* Render input fields (firstName, lastName, email, phoneNumber, etc.) */}
            {/* You can reuse your previous input JSX for each field here */}
            <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-cyber-blue to-cyan-400 text-black px-6 py-3 rounded-lg font-rajdhani font-semibold flex items-center justify-center hover:shadow-lg hover:shadow-cyber-blue/30 transition-all duration-300 hover:-translate-y-1 disabled:opacity-50">
              {isSubmitting ? <><Loader2 className="animate-spin w-5 h-5 mr-2" />Inscription...</> : "S'inscrire"}
            </button>
          </form>
        </div>
      </div>
  );
};

export default InscriptionPage;
