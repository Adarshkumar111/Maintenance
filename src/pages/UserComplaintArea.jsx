import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle, FileText, ArrowLeft, Upload } from 'lucide-react';
import gsap from 'gsap';

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

  useEffect(() => {
    gsap.from('.form-container', {
      opacity: 0,
      scale: 0.9,
      duration: 0.6,
      ease: 'back.out',
    });
  }, []);

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* ITS Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">ITS Number *</label>
        <input
          type="text"
          value={formData.itsNo}
          onChange={(e) => setFormData({ ...formData, itsNo: e.target.value })}
          className="input-field"
          placeholder="Enter your ITS number"
          required
        />
      </div>

      {/* Area Name (Auto-detected) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Area Name</label>
        <div className="input-field bg-gray-100 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-gray-500" />
          <span className="font-semibold">{formData.areaName}</span>
          <span className="text-xs text-gray-500 ml-auto">(Auto-detected)</span>
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Complaint Category *</label>
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
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="input-field min-h-[120px]"
          placeholder="Describe the issue in detail..."
          required
        />
      </div>

      {/* Photo Upload (Optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo (Optional)</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-all cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
            className="hidden"
            id="photo-upload"
          />
          <label htmlFor="photo-upload" className="cursor-pointer">
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
            {formData.photo && (
              <p className="text-sm text-green-600 mt-2">✓ {formData.photo.name}</p>
            )}
          </label>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="btn-secondary flex-1"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary flex-1 flex items-center justify-center gap-2"
        >
          Submit Complaint
          <FileText className="w-5 h-5" />
        </button>
      </div>
    </motion.form>
  );

  const renderSuccess = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle className="w-16 h-16 text-white" />
      </motion.div>

      <h2 className="text-3xl font-bold text-gray-800 mb-4">Complaint Registered!</h2>
      <p className="text-gray-600 mb-6">
        Thank you. Your area complaint has been registered successfully. Our team will address it soon.
      </p>

      <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
        <h3 className="font-semibold mb-3">Complaint Summary:</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">ITS No:</span>
            <span className="font-medium">{formData.itsNo}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Area:</span>
            <span className="font-medium">{formData.areaName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Category:</span>
            <span className="font-medium">{formData.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Registered At:</span>
            <span className="font-medium">{new Date().toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Complaint ID:</span>
            <span className="font-medium text-blue-600">#{Math.floor(100000 + Math.random() * 900000)}</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-left">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Area complaints are handled on a priority basis. You'll be notified once work begins.
        </p>
      </div>

      <div className="space-y-3">
        <button
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
        </button>
        <button
          onClick={() => navigate('/')}
          className="btn-secondary w-full"
        >
          Back to Home
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-6">
        For urgent issues, contact: 
        <span className="font-semibold text-blue-600"> +91 98765 43210</span>
      </p>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="form-container bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="text-center mb-8">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-4"
            >
              <MapPin className="w-16 h-16 text-green-500" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-800">Area Complaint</h1>
            <p className="text-gray-600 mt-2">Report issues in common areas</p>
          </div>

          {!submitted ? renderComplaintForm() : renderSuccess()}
        </motion.div>
      </div>
    </div>
  );
};

export default UserComplaintArea;
