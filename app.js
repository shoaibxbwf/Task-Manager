function App() {
    try {
        const [currentPage, setCurrentPage] = React.useState('home');

        return (
            <ThemeProvider>
                <TaskProvider>
                    <div data-name="app">
                        <Navbar 
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                        />
                        {currentPage === 'home' && <Home />}
                        {currentPage === 'settings' && <Settings />}
                    </div>
                </TaskProvider>
            </ThemeProvider>
        );
    } catch (error) {
        console.error('App error:', error);
        reportError(error);
        return null;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
