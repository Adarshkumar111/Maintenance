import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CheckCircle, FileText, ArrowLeft, Upload, AlertCircle } from 'lucide-react';

const UserComplaintArea = () => {
  const { areaId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    itsNo: '',
    areaName: areaId || 'Lobby',
    category: '',
    description: '',
    photo: null,
  });
  const [submitted, setSubmitted] = useState(false);


  const categories = [
    'Housekeeping',
    'Plumbing',
    'Electrical',
    'Carpentry',
    'AC/Heating',
    'Furniture',
    'Others'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const renderComplaintForm = () => (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* ITS Number */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label className="block text-sm font-medium text-gray-300 mb-2">ITS Number *</label>
        <input
          type="text"
          value={formData.itsNo}
          onChange={(e) => setFormData({ ...formData, itsNo: e.target.value })}
          className="input-field"
          placeholder="Enter your ITS number"
          required
        />
      </motion.div>

      {/* Area Name (Auto-detected) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <label className="block text-sm font-medium text-gray-300 mb-2">Area Name</label>
        <div className="input-field bg-blue-950/50 border-green-500/50 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-green-400" />
          <span className="font-bold text-white">{formData.areaName}</span>
          <span className="text-xs text-gray-400 ml-auto px-2 py-1 bg-green-500/20 rounded-full">(Auto-detected)</span>
        </div>
      </motion.div>

      {/* Category */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label className="block text-sm font-medium text-gray-300 mb-2">Complaint Category *</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="input-field"
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="input-field min-h-[120px]"
          placeholder="Describe the issue in detail..."
          required
        />
      </motion.div>

      {/* Photo Upload (Optional) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <label className="block text-sm font-medium text-gray-300 mb-2">Upload Photo (Optional)</label>
        <div className="border-2 border-dashed border-blue-900/50 rounded-xl p-6 text-center hover:border-green-500/50 transition-all cursor-pointer bg-blue-950/20">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
            className="hidden"
            id="photo-upload"
          />
          <label htmlFor="photo-upload" className="cursor-pointer">
            <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
              <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
            </motion.div>
            <p className="text-sm text-gray-300">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
            {formData.photo && (
              <motion.p 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-sm text-green-400 mt-2 font-semibold"
              >
                ✓ {formData.photo.name}
              </motion.p>
            )}
          </label>
        </div>
      </motion.div>

      <motion.div 
        className="flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={() => navigate('/')}
          className="btn-secondary flex-1"
        >
          Cancel
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="btn-primary flex-1 flex items-center justify-center gap-2"
        >
          Submit Complaint
          <FileText className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </motion.form>
  );

  const renderSuccess = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="text-center py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/50"
      >
        <CheckCircle className="w-16 h-16 text-white" />
      </motion.div>

      <h2 className="text-3xl font-bold glow-text mb-4">Complaint Registered!</h2>
      <p className="text-gray-300 mb-6">
        Thank you. Your area complaint has been registered successfully. Our team will address it soon.
      </p>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-blue-950/30 border border-blue-900/30 rounded-xl p-5 mb-6 text-left"
      >
        <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-green-400" />
          Complaint Summary:
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between p-2 bg-blue-950/30 rounded-lg">
            <span className="text-gray-400">ITS No:</span>
            <span className="font-semibold text-white">{formData.itsNo}</span>
          </div>
          <div className="flex justify-between p-2 bg-blue-950/30 rounded-lg">
            <span className="text-gray-400">Area:</span>
            <span className="font-semibold text-green-400">{formData.areaName}</span>
          </div>
          <div className="flex justify-between p-2 bg-blue-950/30 rounded-lg">
            <span className="text-gray-400">Category:</span>
            <span className="font-semibold text-white">{formData.category}</span>
          </div>
          <div className="flex justify-between p-2 bg-blue-950/30 rounded-lg">
            <span className="text-gray-400">Registered At:</span>
            <span className="font-semibold text-white">{new Date().toLocaleString()}</span>
          </div>
          <div className="flex justify-between p-2 bg-blue-950/30 rounded-lg">
            <span className="text-gray-400">Complaint ID:</span>
            <span className="font-semibold text-primary-400">#{Math.floor(100000 + Math.random() * 900000)}</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-green-500/10 border-l-4 border-green-500 p-4 mb-6 text-left rounded-lg"
      >
        <p className="text-sm text-green-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <strong>Note:</strong> Area complaints are handled on a priority basis. You'll be notified once work begins.
        </p>
      </motion.div>

      <motion.div 
        className="space-y-3"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setSubmitted(false);
            setFormData({
              itsNo: '',
              areaName: formData.areaName,
              category: '',
              description: '',
              photo: null,
            });
          }}
          className="btn-primary w-full"
        >
          Submit Another Complaint
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/')}
          className="btn-secondary w-full"
        >
          Back to Home
        </motion.button>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-sm text-gray-400 mt-6 p-4 bg-blue-950/20 rounded-lg border border-blue-900/30"
      >
        For urgent issues, contact: 
        <br />
        <span className="font-semibold text-green-400 text-base"> +91 98765 43210</span>
      </motion.p>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-950 to-black relative overflow-hidden py-8 px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-96 h-96 bg-green-600/30 rounded-full blur-3xl top-0 right-1/4 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-primary-500/30 rounded-full blur-3xl bottom-0 left-1/4 animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <motion.button
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-gray-300 hover:text-primary-400 transition-all bg-dark-100/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-blue-900/30"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="card-premium p-8"
        >
          <div className="text-center mb-8">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-4 p-4 bg-green-500/20 rounded-full border border-green-500/30"
            >
              <MapPin className="w-16 h-16 text-green-400" />
            </motion.div>
            <h1 className="text-4xl font-bold glow-text mb-2">Area Complaint</h1>
            <p className="text-gray-400">Area: <span className="text-green-400 font-bold">{areaId}</span></p>
            <p className="text-gray-500 mt-2">Report issues in common areas</p>
          </div>

          <AnimatePresence mode="wait">
            {!submitted ? renderComplaintForm() : renderSuccess()}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default UserComplaintArea;
