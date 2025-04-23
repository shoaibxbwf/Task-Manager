const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
    try {
        const [theme, setTheme] = React.useState(getFromStorage('theme') || 'light');

        React.useEffect(() => {
            saveToStorage('theme', theme);
            document.body.className = theme;
        }, [theme]);

        const toggleTheme = () => {
            setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
        };

        return (
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                {children}
            </ThemeContext.Provider>
        );
    } catch (error) {
        console.error('Theme provider error:', error);
        reportError(error);
        return null;
    }
}
