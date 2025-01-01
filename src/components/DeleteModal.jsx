import PropTypes from 'prop-types';

const DeleteModal = ({ isOpen, onClose, onConfirm, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Arka plan overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal içeriği */}
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 relative z-10">
        <h3 className="text-lg font-semibold mb-4">
          {title || 'Silme İşlemini Onayla'}
        </h3>
        
        <p className="text-gray-600 mb-6">
          Bu makaleyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
        </p>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            İptal
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default DeleteModal; 