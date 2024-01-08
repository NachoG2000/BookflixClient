import { useState, useEffect } from 'react'

import TableComponent from '../components/TableComponent.jsx'
import DialogAddComponent from '../components/DialogAddComponent.jsx'
import AvatarDropdown from '../components/AvatarDropdown.jsx'

export default function BooksPage() {

    const [books, setBooks] = useState([])
    const [reload, setReload] = useState(false)
    
    const reloadTable = () => {
      setReload(!reload);
    }
    
    useEffect(() => {
      fetch('http://localhost:8080/books') // ?page=0&size=20
          .then(response => response.json())
          .then(data => setBooks(data))
          .catch(error => console.error('Error fetching users:', error));
    }, [reload])
    
    return (
      <>
        <header className="p-6 flex justify-between items-center hover:bg-gray-50">
          <img src='./bookflix.svg' alt="Bookflix" className="h-12" />
          <div className='flex gap-4'>
            <DialogAddComponent asChild reloadTable={reloadTable} />
            <AvatarDropdown />
          </div>
        </header>
        <div className="md:p-[2rem]">
          <TableComponent books={books} reloadTable={reloadTable} />
        </div>
      </>
    )
}