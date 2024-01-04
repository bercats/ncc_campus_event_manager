import React from 'react';
import ReactDOM from 'react-dom';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { Authenticator } from '@aws-amplify/ui-react';
import App from './App';

Amplify.configure(awsExports);

const formFields = {
    signUp: {
        'custom:studentID':
            {
                label: 'Student ID',
                placeholder: 'Enter your student ID',
                required: true,
            },
        'custom:grade':
            {
                label: 'Grade',
                placeholder: 'Enter which year are you in',
                required: true,
            },
    },
}

ReactDOM.render(
    <React.StrictMode>
        <Authenticator formFields={formFields}>
            <App />
        </Authenticator>
    </React.StrictMode>,
    document.getElementById('root')
);
