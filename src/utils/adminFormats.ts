export const formatBirthday = (birthday) => {
    const dateFormats = [
        /(\d{1,2})\/(\d{1,2})\/(\d{4})/,
        /(\d{1,2})\.(\d{1,2})\.(\d{4})/,
        /(\d{4})\.(\d{1,2})\.(\d{1,2})/,
    ];

    for (const format of dateFormats) {
        const match = birthday.match(format);
        if (match) {
            const [, day, month, year] = match;
            return `${year}-${month}-${day}`;
        }
    }
    return birthday;
};

export const formatRole = (role) => {
    const lowercaseRoles = ['user', 'admin']; 
    if (lowercaseRoles.includes(role.toLowerCase())) {
        return role.toUpperCase();
    }
    return role;
};


