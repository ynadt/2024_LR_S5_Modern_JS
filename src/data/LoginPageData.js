import ClueIcon from 'src/assets/icons/clue-icon.svg';
import { validateEmail, validatePassword } from 'utils/validation.js';

const loginFields = [
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
        autoComplete: 'email',
        validation: validateEmail,
        errorMessage: 'Please enter a valid email address.',
        tooltip: {
            icon: ClueIcon,
            text: 'Please enter a valid email address.',
        },
    },
    {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter your password',
        autoComplete: 'current-password',
        validation: validatePassword,
        errorMessage: 'Password must meet the requirements.',
        tooltip: {
            icon: ClueIcon,
            text: 'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and only English letters.',
        },
    },
];

export default loginFields;
