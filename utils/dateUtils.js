function formatDate(date) {
    try {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    } catch (error) {
        console.error('Error formatting date:', error);
        reportError(error);
        return '';
    }
}

function isToday(date) {
    try {
        const today = new Date();
        const taskDate = new Date(date);
        return today.toDateString() === taskDate.toDateString();
    } catch (error) {
        console.error('Error checking date:', error);
        reportError(error);
        return false;
    }
}

function isUpcoming(date) {
    try {
        const today = new Date();
        const taskDate = new Date(date);
        return taskDate > today;
    } catch (error) {
        console.error('Error checking upcoming date:', error);
        reportError(error);
        return false;
    }
}
