function Settings() {
    try {
        const { settings, updateSettings } = React.useContext(TaskContext);
        const { theme } = React.useContext(ThemeContext);

        return (
            <div className="container mx-auto px-4 pt-20" data-name="settings-page">
                <div className={`settings-card p-6 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                }`}>
                    <h2 className="text-2xl font-bold mb-6">Settings</h2>
                    
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-medium">Notifications</h3>
                                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                    Enable or disable task notifications
                                </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings.notifications}
                                    onChange={(e) => updateSettings({ notifications: e.target.checked })}
                                    className="sr-only peer"
                                    data-name="notifications-toggle"
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                                    peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full 
                                    peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] 
                                    after:left-[2px] after:bg-white after:border-gray-300 after:border 
                                    after:rounded-full after:h-5 after:w-5 after:transition-all 
                                    peer-checked:bg-blue-600">
                                </div>
                            </label>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-2">Task Persistence</h3>
                            <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                                Choose how long to keep completed tasks
                            </p>
                            <select
                                value={settings.taskPersistDays}
                                onChange={(e) => updateSettings({ 
                                    taskPersistDays: parseInt(e.target.value) 
                                })}
                                className={`w-full p-2 rounded border ${
                                    theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : ''
                                }`}
                                data-name="task-persist-select"
                            >
                                <option value="30">30 days</option>
                                <option value="60">60 days</option>
                                <option value="90">90 days</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Settings page error:', error);
        reportError(error);
        return null;
    }
}
