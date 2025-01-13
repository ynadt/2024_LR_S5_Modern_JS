import { validateNotEmpty, validateZipCode } from 'utils/validationUtils.ts';

const addressFields = [
    {
        name: 'name',
        label: 'Name',
        type: 'text',
        placeholder: 'Enter your full name',
        validation: validateNotEmpty,
        errorMessage: 'Name is required.',
    },
    {
        name: 'addressLine1',
        label: 'Address Line 1',
        type: 'text',
        placeholder: 'Enter your address',
        validation: validateNotEmpty,
        errorMessage: 'Address Line 1 is required.',
    },
    {
        name: 'country',
        label: 'Country',
        type: 'text',
        placeholder: 'Enter your country',
        validation: validateNotEmpty,
        errorMessage: 'Country is required.',
    },
    {
        name: 'zipCode',
        label: 'Zip Code',
        type: 'text',
        placeholder: 'Enter your zip code',
        validation: validateZipCode,
        errorMessage: 'Enter a valid zip code (5 digits).',
    },
    {
        name: 'city',
        label: 'City',
        type: 'text',
        placeholder: 'Enter your city',
        validation: validateNotEmpty,
        errorMessage: 'City is required.',
    },
];

export default addressFields;
