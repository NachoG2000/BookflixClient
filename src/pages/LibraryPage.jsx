import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth.jsx';
import useAxiosPrivate from "../hooks/useAxiosPrivate.jsx";

import TableComponent from '../components/TableComponent.jsx'
import DialogAddComponent from '../components/DialogAddComponent.jsx'
import AvatarDropdown from '../components/AvatarDropdown.jsx'

const LibraryPage = () => {
  const [books, setBooks] = useState([]);
  const [reload, setReload] = useState(false);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  // console.log("auth:" + JSON.stringify(auth));
  
  const reloadTable = () => {
    setReload(!reload);
  };
  
  
  useEffect(() => {

    axiosPrivate // Use axiosPrivate instead of axios
      .get('http://localhost:8080/books')
      .then(response => {
        setBooks(response.data)
      })
      .catch(error => console.error('Error fetching books:', error));
      
  }, [reload, auth.jwtToken]);

  return (
    <>
      <header className="p-6 flex justify-between items-center hover:bg-gray-50">
        <img src="./bookflix.svg" alt="Bookflix" className="h-12" />
        <div className="flex gap-4">
          <DialogAddComponent asChild reloadTable={reloadTable} />
          <AvatarDropdown />
        </div>
      </header>
      <div className="md:p-[2rem]">
        <TableComponent books={books} reloadTable={reloadTable} />
      </div>
    </>
  );
}
export default LibraryPage;
