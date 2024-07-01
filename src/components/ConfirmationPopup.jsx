import React from 'react';
import { Button } from "./index"
const ConfirmationPopup = ({ message, onCancel, onConfirm }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
            <div className="bg-gray-800 w-full max-w-md p-4 rounded-lg shadow-lg text-white">
                <p className="text-lg font-medium">{message}</p>
                <div className="mt-4 flex justify-end space-x-4">
                    
                    <Button
                        type='button'
                        bgColor='bg-gray-600'
                        textColor='text-gray-300'
                        className='hover:bg-gray-700 focus:bg-gray-700 text-sm font-medium'
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>

                    <Button
                        type='button'
                        bgColor='bg-red-600'
                        textColor='text-red-300'
                        className='hover:bg-red-700 focus:bg-red-700 text-sm font-medium'
                        onClick={onConfirm}
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPopup;