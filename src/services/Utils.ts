export class Utils {
    static calculateAge(birthDate: string): number {
        //  'YYYY-MM-DD'
        const birth = new Date(birthDate);
        const today = new Date();

        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        return age;
    }

    static formatDate(date: Date): string {
        const dateOptions: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit', // Use '2-digit' for numeric month representation
            day: '2-digit',   // Use '2-digit' for numeric day representation
        };

        const timeOptions: Intl.DateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // Use 24-hour time format
        };

        // Create formatters for Ukrainian locale
        const dateFormatter = new Intl.DateTimeFormat('uk-UA', dateOptions);
        const timeFormatter = new Intl.DateTimeFormat('uk-UA', timeOptions);

        // Format the date and time separately
        const formattedDate = dateFormatter.format(date);
        const formattedTime = timeFormatter.format(date);

        // Combine the formatted date and time
        return `${formattedDate} ${formattedTime}`;
    }

}
