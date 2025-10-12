import React from 'react'
import Header from '../Header'
import PrescriptionsTable from './PrescriptionsTable'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import PrescriptionModal from './PrescriptionModal'

const Prescriptions = () => {
    return (
        <div className='px-4 py-3'>
            <Header />
            <div className='p-4 flex justify-between'>
                <p>Prescriptions</p>
                <PrescriptionModal
                    trigger={
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Plus className="h-4 w-4 mr-2" />
                            Create Prescription
                        </Button>
                    }
                />
            </div>
            <PrescriptionsTable />
        </div>
    )
}

export default Prescriptions