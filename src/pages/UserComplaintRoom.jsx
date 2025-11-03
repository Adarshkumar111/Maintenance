import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, CheckCircle, FileText, Home, ArrowLeft, Upload } from 'lucide-react';
import gsap from 'gsap';

const UserComplaintRoom = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    itsNo: '',
    roomNo: roomId || '101',
    category: '',
    description: '',
    photo: null,
  });
  const [otp, setOtp] = useState('');
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
    'Others'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate random OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(generatedOtp);
    setSubmitted(true);
    setStep(3);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((stepNum) => (
        <div key={stepNum} className="flex items-center">
          <motion.div
            animate={{
              scale: step >= stepNum ? 1 : 0.8,
              backgroundColor: step >= stepNum ? '#3b82f6' : '#e5e7eb',
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
          >
            {step > stepNum ? <CheckCircle className="w-6 h-6" /> : stepNum}
          </motion.div>
          {stepNum < 3 && (
            <div
              className={`w-16 h-1 mx-2 ${step > stepNum ? 'bg-blue-500' : 'bg-gray-300'}`}
            />
          )}
        </div>
      ))}
    </div>
  );

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

      {/* Room Number (Auto-detected) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Room Number</label>
        <div className="input-field bg-gray-100 flex items-center gap-2">
          <Home className="w-5 h-5 text-gray-500" />
          <span className="font-semibold">{formData.roomNo}</span>
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
          placeholder="Describe your complaint in detail..."
          required
        />
      </div>

      {/* Photo Upload */}
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

      <h2 className="text-3xl font-bold text-gray-800 mb-4">Complaint Submitted!</h2>
      <p className="text-gray-600 mb-6">
        Thank you. We have received your complaint and will look into the matter at the earliest.
      </p>

      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
        <p className="text-sm text-gray-600 mb-2">Your Complaint OTP</p>
        <div className="text-4xl font-bold text-blue-600 tracking-widest">{otp}</div>
        <p className="text-sm text-gray-500 mt-2">
          Please share this OTP with the assigned staff upon work completion
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
        <h3 className="font-semibold mb-3">Complaint Details:</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">ITS No:</span>
            <span className="font-medium">{formData.itsNo}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Room:</span>
            <span className="font-medium">{formData.roomNo}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Category:</span>
            <span className="font-medium">{formData.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time:</span>
            <span className="font-medium">{new Date().toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => navigate('/complaint/status')}
          className="btn-primary w-full"
        >
          Track Complaint Status
        </button>
        <button
          onClick={() => navigate('/')}
          className="btn-secondary w-full"
        >
          Back to Home
        </button>
      </div>

      <p className="text-sm text-gray-500 mt-6">
        If your complaint is not resolved within 24 hours, please contact: 
        <span className="font-semibold text-blue-600"> +91 98765 43210</span>
      </p>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
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
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block mb-4"
            >
              <Camera className="w-16 h-16 text-blue-500" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-800">Room Complaint</h1>
            <p className="text-gray-600 mt-2">Submit your maintenance request</p>
          </div>

          {!submitted && renderStepIndicator()}

          {!submitted ? renderComplaintForm() : renderSuccess()}
        </motion.div>
      </div>
    </div>
  );
};

export default UserComplaintRoom;
