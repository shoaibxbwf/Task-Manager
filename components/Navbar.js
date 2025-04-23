function Navbar({ currentPage, onPageChange }) {
    try {
        const { theme, toggleTheme } = React.useContext(ThemeContext);

        return (
            <nav 
                className={`navbar fixed top-0 left-0 right-0 z-50 ${
                    theme === 'dark' ? 'bg-gray-900/90' : 'bg-white/90'
                }`}
                data-name="navbar"
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            <i className="fas fa-check-double text-blue-500 text-2xl"></i>
                            <h1 className="text-xl font-bold">Task Manager</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => onPageChange('home')}
                                className={`px-4 py-2 rounded-lg ${
                                    currentPage === 'home' ? 'bg-blue-500 text-white' : ''
                                }`}
                                data-name="home-nav-button"
                            >
                                <i className="fas fa-home mr-2"></i>
                                Home
                            </button>
                            <button
                                onClick={() => onPageChange('settings')}
                                className={`px-4 py-2 rounded-lg ${
                                    currentPage === 'settings' ? 'bg-blue-500 text-white' : ''
                                }`}
                                data-name="settings-nav-button"
                            >
                                <i className="fas fa-cog mr-2"></i>
                                Settings
                            </button>
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg"
                                data-name="theme-toggle-button"
                            >
                                <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        );
    } catch (error) {
        console.error('Navbar error:', error);
        reportError(error);
        return null;
    }
}
