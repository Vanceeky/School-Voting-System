import { Route, Routes } from 'react-router-dom'


import ElectionPage from '@/app/admin/elections/page'
import Dashboard from '@/app/admin/dashboard/page'
import ElectionSetup from '@/app/admin/election_setup/page'    

import ElectionLayout from '@/app/admin/layout'


export default function AdminRoutes() {
    return (
        <Routes>
            <Route path="" element={<ElectionPage />} />

            {/* Selected election with dashboard */}
            <Route path="election/:electionId" element={<ElectionLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="election-setup" element={<ElectionSetup />} />

            </Route>

        </Routes>
    )
}