import ClueIcon from 'src/assets/icons/clue-icon.svg';
import { validateEmail, validatePassword } from 'utils/validationUtils.ts';

interface FormState {
    [key: string]: string;
}

const registerFields = [
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
        autoComplete: 'email',
        validation: (value: string) => validateEmail(value),
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
        autoComplete: 'new-password',
        validation: (value: string) => validatePassword(value),
        errorMessage: 'Password must meet the required complexity.',
        tooltip: {
            icon: ClueIcon,
            text: 'Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and only English letters.',
        },
    },
    {
        name: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
        placeholder: 'Confirm your password',
        autoComplete: 'new-password',
        validation: (value: string, formState: FormState) => value === formState.password,
        errorMessage: 'Passwords must match.',
        tooltip: {
            icon: ClueIcon,
            text: 'Re-enter your password to confirm it matches.',
        },
    },
];

export default registerFields;
