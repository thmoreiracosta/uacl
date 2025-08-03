export const ButtonWhatsappContact: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <a
        href="https://wa.me/5521987654321" // Substitua com seu número
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-colors duration-300 flex items-center justify-center"
        aria-label="Fale conosco pelo WhatsApp"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.52 3.48A11.82 11.82 0 0 0 12 0C5.373 0 0 5.373 0 12a11.94 11.94 0 0 0 1.613 6.022L0 24l6.27-1.635A11.89 11.89 0 0 0 12 24c6.627 0 12-5.373 12-12 0-3.19-1.22-6.187-3.48-8.52zM12 22c-1.815 0-3.59-.478-5.144-1.37l-.368-.21-3.718.969.993-3.625-.239-.373A9.934 9.934 0 0 1 2 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.225-7.235c-.287-.143-1.693-.835-1.954-.93-.26-.096-.45-.143-.638.144-.19.287-.732.93-.897 1.12-.165.19-.33.215-.61.072-.287-.143-1.21-.445-2.302-1.42-.85-.757-1.423-1.69-1.59-1.978-.165-.287-.018-.443.125-.586.13-.129.287-.335.43-.503.143-.165.19-.287.287-.478.096-.191.048-.358-.024-.503-.072-.143-.638-1.54-.875-2.11-.23-.553-.465-.478-.638-.478h-.547c-.19 0-.478.072-.728.358s-.956.934-.956 2.27c0 1.335.978 2.623 1.113 2.802.143.19 1.923 2.94 4.66 4.124.65.28 1.16.446 1.555.57.653.21 1.247.18 1.717.11.523-.078 1.693-.69 1.933-1.36.24-.668.24-1.24.167-1.36-.072-.12-.26-.19-.547-.33z" />
        </svg>
      </a>

      {/* Tooltip personalizado */}
      <div className="absolute bottom-full right-0 mb-2 bg-gray-800 text-white text-sm rounded px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
        Fale conosco
      </div>
    </div>
  );
};
