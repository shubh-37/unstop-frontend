import userImage from '../assets/user.png';

export default function Home({ onLogout }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const handleLogout = () => {
    localStorage.removeItem('user');
    onLogout();
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-medium text-gray-800 mb-2">Welcome to</h1>
          <h2 className="text-4xl font-black text-[#6358DC]">Unstop</h2>
        </div>

        <div className="bg-white rounded-[20px] shadow-sm border border-gray-200 p-8 text-center">
          <div className="mb-6">
            <img src={userImage} alt="Profile" className="w-24 h-24 rounded-full mx-auto object-cover" />
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-[#6358DC] mb-2">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-sm text-gray-600 mb-1">{user.email}</p>
            <p className="text-sm text-gray-600">{user.gender}</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-[#6358DC] hover:bg-[#6258dc] text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
