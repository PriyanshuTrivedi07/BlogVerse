import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { ConfirmationPopup, Button } from '../index'

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showConfirmation, setShowConfirmation] = useState(false)

    const handleLogout = ()=>{
        setShowConfirmation(true)
    }

    const ConfirmCancleLogout = ()=>{
        setShowConfirmation(false)
    }



    const ConfirmLogout = () => {
        authService.logout()
            .then(() => {
                dispatch(logout())
                navigate('/login')
            })
            .finally(()=>{
                setShowConfirmation(false)
            })
    }


    return (
        <>
        {/* <button
            className='px-4 py-2 rounded-md text-base font-medium bg-blue-600 hover:bg-blue-700  block w-full text-left'
            onClick={handleLogout}
        >Logout
        </button> */}
        <Button
            type='button'
            className='block w-full text-left'
            onClick={handleLogout}
        >
            Logout
        </Button>


        {showConfirmation && (
            <ConfirmationPopup
                message={"Are you sure you want to Logout ?"}
                onCancel={ConfirmCancleLogout}
                onConfirm={ConfirmLogout}
            />
        )}
        </>
    )
}

export default LogoutBtn