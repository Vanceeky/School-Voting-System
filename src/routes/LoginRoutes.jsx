import { Route, Routes } from 'react-router-dom'

import AdminLoginPage from '@/app/login/admin/page'
import StaffLoginPage from '@/app/login/staff/page'
import VoterLoginPage from '@/app/login/voter/page'



export default function LoginRoutes() {
    return (
        <Routes>
            <Route path="admin" element={<AdminLoginPage />} />
            <Route path="staff" element={<StaffLoginPage />} />
            <Route path="" element={<VoterLoginPage />} />
        </Routes>
    )
}