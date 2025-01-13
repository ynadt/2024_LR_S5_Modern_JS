export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
    const passwordRegex = /^[A-Za-z0-9]{6,4096}$/;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    return passwordRegex.test(password) && hasUpperCase && hasLowerCase && hasNumber;
};

export const validateNotEmpty = (value: string): boolean => {
    return value.trim().length > 0;
};

export const validateZipCode = (zipCode: string): boolean => {
    const zipCodeRegex = /^[0-9]{5}$/;
    return zipCodeRegex.test(zipCode);
};
