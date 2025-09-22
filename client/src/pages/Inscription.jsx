import React, { useState } from 'react';
import axios from 'axios';
import { Mail, User, Phone, GraduationCap, Code, Loader2, CheckCircle, Home, LogIn, Lock, UserCheck } from 'lucide-react';
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

  // Removed unnecessary data lists as they are not part of the API payload
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
    if (selectedMajor === 'CP') {
      return ['FIRST_YEAR', 'SECOND_YEAR'];
    }
    if (selectedMajor === 'SDIA') {
      return ['FOURTH_YEAR', 'FIFTH_YEAR'];
    }
    return ['THIRD_YEAR', 'FOURTH_YEAR', 'FIFTH_YEAR'];
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'major') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        academicYear: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const { firstName, lastName, email, phoneNumber, gender, password, confirmPassword, major, academicYear, interests } = formData;

    if (!firstName.trim()) newErrors.firstName = 'Le prénom est requis';
    if (!lastName.trim()) newErrors.lastName = 'Le nom est requis';
    if (!email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    if (!phoneNumber.trim()) newErrors.phoneNumber = 'Le téléphone est requis';
    if (!gender) newErrors.gender = 'Le genre est requis';
    if (!major) newErrors.major = 'La filière est requise';
    if (!password) newErrors.password = 'Le mot de passe est requis';
    if (!confirmPassword) newErrors.confirmPassword = 'Confirmez votre mot de passe';

    if (password && password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    // Validate academicYear only if major is not 'CP' or 'SDIA'
    if (major && !['CP', 'SDIA'].includes(major) && !academicYear) {
      newErrors.academicYear = 'Le niveau d\'études est requis';
    }

    // The API requires interests, but the original code makes it optional. We'll make it required.
    if (!interests.trim()) newErrors.interests = 'Les centres d\'intérêt sont requis';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const API_URL = process.env.REACT_APP_API_URL_AUTH_SERVICE;

    // Create the payload exactly as defined in the SignUpDTO
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
      const response = await axios.post(`${API_URL}/api/v1/auth/signup`, backendPayload);

      if (response.status === 201) {
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
                <h2 className="font-orbitron text-3xl font-bold text-green-400 mb-4">
                  INSCRIPTION CONFIRMÉE
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto"></div>
              </div>
              <div className="space-y-6 text-left">
                <div className="bg-black/30 border border-cyber-blue/20 rounded-lg p-6">
                  <h3 className="font-orbitron text-lg font-semibold text-cyber-blue mb-4">
                    Prochaines étapes :
                  </h3>
                  <div className="space-y-3 font-rajdhani text-gray-300">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyber-blue rounded-full mt-2 flex-shrink-0"></div>
                      <span>Un email de confirmation a été envoyé à <span className="text-cyan-400">{formData.email}</span></span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Veuillez vérifier votre boîte de réception pour les instructions d'activation.</span>
                    </div>
                  </div>
                </div>
                <div className="bg-black/30 border border-purple-400/20 rounded-lg p-6">
                  <h3 className="font-orbitron text-lg font-semibold text-purple-400 mb-3">
                    En attendant...
                  </h3>
                  <p className="font-rajdhani text-gray-300 mb-4">
                    Connectez-vous pour accéder à votre tableau de bord.
                  </p>
                  <button
                      onClick={() => navigate('/connexion')}
                      className="border border-purple-400 text-purple-400 px-8 py-3 rounded-lg font-rajdhani font-semibold hover:bg-purple-400/10 transition-all duration-300 hover:-translate-y-1"
                  >
                    Retour à la Connexion
                  </button>
                </div>
              </div>
              <div className="mt-8">
                <button
                    onClick={resetForm}
                    className="bg-gradient-to-r from-cyber-blue to-cyan-400 text-black px-8 py-3 rounded-lg font-rajdhani font-semibold hover:shadow-lg hover:shadow-cyber-blue/30 transition-all duration-300 hover:-translate-y-1"
                >
                  Nouvelle Inscription
                </button>
              </div>
            </div>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-cyber-dark via-cyber-darker to-cyber-darkest py-12 px-4">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-24 left-16 w-32 h-32 border border-purple-400/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-24 right-20 w-40 h-40 border-2 border-cyber-blue/15 rotate-45 animate-spin-slow"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 border border-cyan-400/25 rounded-full animate-bounce-slow"></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
            <span className="font-fira text-sm text-purple-400 bg-purple-400/10 px-4 py-2 rounded-full border border-purple-400/30">
              [INSCRIPTION_PROTOCOL]
            </span>
            </div>
            <h1 className="font-orbitron text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              REJOIGNEZ LA COMMUNAUTÉ AIS
            </span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mb-6"></div>
            <p className="font-rajdhani text-lg text-gray-300 max-w-2xl mx-auto">
              Remplissez ce formulaire pour devenir membre du club AIS ENSA El Jadida.
            </p>
          </div>
          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <button
                onClick={() => navigate('/')}
                className="group flex items-center space-x-2 bg-black/40 border border-cyber-blue/30 text-cyber-blue px-6 py-3 rounded-lg font-rajdhani font-semibold hover:bg-cyber-blue/10 hover:border-cyber-blue/50 hover:shadow-lg hover:shadow-cyber-blue/20 transition-all duration-300 hover:-translate-y-1"
            >
              <Home className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span>Retour Accueil</span>
            </button>
            <button
                onClick={() => navigate('/connexion')}
                className="group flex items-center space-x-2 bg-black/40 border border-purple-400/30 text-purple-400 px-6 py-3 rounded-lg font-rajdhani font-semibold hover:bg-purple-400/10 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-400/20 transition-all duration-300 hover:-translate-y-1"
            >
              <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              <span>Se Connecter</span>
            </button>
          </div>
          {/* Form */}
          <div className="bg-black/40 border border-cyber-blue/20 rounded-2xl p-8 backdrop-blur-sm">
            <div className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="font-orbitron text-xl font-semibold text-cyber-blue mb-6 flex items-center space-x-3">
                  <User className="w-5 h-5" />
                  <span>Informations Personnelles</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-rajdhani text-gray-300 mb-2">Prénom *</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full bg-black/30 border rounded-lg px-4 py-3 text-white font-rajdhani placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                            errors.firstName ? 'border-red-400 focus:ring-red-400/50' : 'border-cyber-blue/30 focus:ring-cyber-blue/50 focus:border-cyber-blue'
                        }`}
                        placeholder="Votre prénom"
                    />
                    {errors.firstName && <span className="text-red-400 text-sm font-rajdhani mt-1 block">{errors.firstName}</span>}
                  </div>
                  <div>
                    <label className="block font-rajdhani text-gray-300 mb-2">Nom *</label>
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full bg-black/30 border rounded-lg px-4 py-3 text-white font-rajdhani placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                            errors.lastName ? 'border-red-400 focus:ring-red-400/50' : 'border-cyber-blue/30 focus:ring-cyber-blue/50 focus:border-cyber-blue'
                        }`}
                        placeholder="Votre nom"
                    />
                    {errors.lastName && <span className="text-red-400 text-sm font-rajdhani mt-1 block">{errors.lastName}</span>}
                  </div>
                  <div>
                    <label className="block font-rajdhani text-gray-300 mb-2">Email *</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full bg-black/30 border rounded-lg px-4 py-3 text-white font-rajdhani placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                            errors.email ? 'border-red-400 focus:ring-red-400/50' : 'border-cyber-blue/30 focus:ring-cyber-blue/50 focus:border-cyber-blue'
                        }`}
                        placeholder="votre.email@example.com"
                    />
                    {errors.email && <span className="text-red-400 text-sm font-rajdhani mt-1 block">{errors.email}</span>}
                  </div>
                  <div>
                    <label className="block font-rajdhani text-gray-300 mb-2">Téléphone *</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        className={`w-full bg-black/30 border rounded-lg px-4 py-3 text-white font-rajdhani placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                            errors.phoneNumber ? 'border-red-400 focus:ring-red-400/50' : 'border-cyber-blue/30 focus:ring-cyber-blue/50 focus:border-cyber-blue'
                        }`}
                        placeholder="+212 6 XX XX XX XX"
                    />
                    {errors.phoneNumber && <span className="text-red-400 text-sm font-rajdhani mt-1 block">{errors.phoneNumber}</span>}
                  </div>
                  <div>
                    <label className="block font-rajdhani text-gray-300 mb-2">Genre *</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className={`w-full bg-black/30 border rounded-lg px-4 py-3 text-white font-rajdhani focus:outline-none focus:ring-2 transition-all duration-300 ${
                            errors.gender ? 'border-red-400 focus:ring-red-400/50' : 'border-cyber-blue/30 focus:ring-cyber-blue/50 focus:border-cyber-blue'
                        }`}
                    >
                      <option value="">Sélectionnez votre genre</option>
                      {genderOptions.map(option => (
                          <option key={option.value} value={option.value} className="bg-cyber-darkest">
                            {option.label}
                          </option>
                      ))}
                    </select>
                    {errors.gender && <span className="text-red-400 text-sm font-rajdhani mt-1 block">{errors.gender}</span>}
                  </div>
                </div>
              </div>
              {/* Security Information */}
              <div>
                <h3 className="font-orbitron text-xl font-semibold text-green-400 mb-6 flex items-center space-x-3">
                  <Lock className="w-5 h-5" />
                  <span>Sécurité du Compte</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-rajdhani text-gray-300 mb-2">Mot de passe *</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full bg-black/30 border rounded-lg px-4 py-3 text-white font-rajdhani placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                            errors.password ? 'border-red-400 focus:ring-red-400/50' : 'border-green-400/30 focus:ring-green-400/50 focus:border-green-400'
                        }`}
                        placeholder="••••••••"
                    />
                    {errors.password && <span className="text-red-400 text-sm font-rajdhani mt-1 block">{errors.password}</span>}
                  </div>
                  <div>
                    <label className="block font-rajdhani text-gray-300 mb-2">Confirmer le mot de passe *</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full bg-black/30 border rounded-lg px-4 py-3 text-white font-rajdhani placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                            errors.confirmPassword ? 'border-red-400 focus:ring-red-400/50' : 'border-green-400/30 focus:ring-green-400/50 focus:border-green-400'
                        }`}
                        placeholder="••••••••"
                    />
                    {errors.confirmPassword && <span className="text-red-400 text-sm font-rajdhani mt-1 block">{errors.confirmPassword}</span>}
                  </div>
                </div>
              </div>
              {/* Academic Information */}
              <div>
                <h3 className="font-orbitron text-xl font-semibold text-purple-400 mb-6 flex items-center space-x-3">
                  <GraduationCap className="w-5 h-5" />
                  <span>Informations Académiques</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-rajdhani text-gray-300 mb-2">Filière *</label>
                    <select
                        name="major"
                        value={formData.major}
                        onChange={handleInputChange}
                        className={`w-full bg-black/30 border rounded-lg px-4 py-3 text-white font-rajdhani focus:outline-none focus:ring-2 transition-all duration-300 ${
                            errors.major ? 'border-red-400 focus:ring-red-400/50' : 'border-purple-400/30 focus:ring-purple-400/50 focus:border-purple-400'
                        }`}
                    >
                      <option value="">Sélectionnez votre filière</option>
                      {majors.map(major => (
                          <option key={major.value} value={major.value} className="bg-cyber-darkest">
                            {major.label}
                          </option>
                      ))}
                    </select>
                    {errors.major && <span className="text-red-400 text-sm font-rajdhani mt-1 block">{errors.major}</span>}
                  </div>
                  {formData.major && (
                      <div>
                        <label className="block font-rajdhani text-gray-300 mb-2">Niveau d'Études *</label>
                        <select
                            name="academicYear"
                            value={formData.academicYear}
                            onChange={handleInputChange}
                            className={`w-full bg-black/30 border rounded-lg px-4 py-3 text-white font-rajdhani focus:outline-none focus:ring-2 transition-all duration-300 ${
                                errors.academicYear ? 'border-red-400 focus:ring-red-400/50' : 'border-purple-400/30 focus:ring-purple-400/50 focus:border-purple-400'
                            }`}
                        >
                          <option value="">Sélectionnez votre niveau</option>
                          {getAcademicYears(formData.major).map(year => (
                              <option key={year} value={year} className="bg-cyber-darkest">{year}</option>
                          ))}
                        </select>
                        {errors.academicYear && <span className="text-red-400 text-sm font-rajdhani mt-1 block">{errors.academicYear}</span>}
                      </div>
                  )}
                </div>
              </div>
              {/* Interests */}
              <div>
                <h3 className="font-orbitron text-xl font-semibold text-cyan-400 mb-6 flex items-center space-x-3">
                  <Code className="w-5 h-5" />
                  <span>Centres d'Intérêt Techniques</span>
                </h3>
                <div>
                  <label className="block font-rajdhani text-gray-300 mb-4">Centres d'Intérêt Techniques *</label>
                  <input
                      type="text"
                      name="interests"
                      value={formData.interests}
                      onChange={handleInputChange}
                      className={`w-full bg-black/30 border rounded-lg px-4 py-3 text-white font-rajdhani placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 ${
                          errors.interests ? 'border-red-400 focus:ring-red-400/50' : 'border-cyan-400/30 focus:ring-cyan-400/50 focus:border-cyan-400'
                      }`}
                      placeholder="e.g., Web Development, AI, Cybersecurity"
                  />
                  {errors.interests && <span className="text-red-400 text-sm font-rajdhani mt-1 block">{errors.interests}</span>}
                </div>
              </div>
              {/* Submit Button */}
              <div className="text-center">
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-12 py-4 rounded-lg font-rajdhani font-semibold text-lg hover:shadow-lg hover:shadow-purple-400/30 transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center space-x-3 mx-auto"
                >
                  {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Traitement en cours...</span>
                      </>
                  ) : (
                      <>
                        <UserCheck className="w-5 h-5" />
                        <span>CONFIRMER L'INSCRIPTION</span>
                      </>
                  )}
                </button>
                {errors.general && <span className="text-red-400 text-sm font-rajdhani mt-4 block">{errors.general}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default InscriptionPage;