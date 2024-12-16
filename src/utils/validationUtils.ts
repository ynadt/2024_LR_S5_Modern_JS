export const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
    const passwordRegex = /^[A-Za-z0-9]{6,4096}$/;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    return passwordRegex.test(password) && hasUpperCase && hasLowerCase && hasNumber;
};
