import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DialogEditComponent from "../components/DialogEditComponent.jsx"
import DialogDeleteComponent from "../components/DialogDeleteComponent.jsx"
import { Button } from "@/components/ui/button";
import useAxiosPrivate from "../hooks/useAxiosPrivate.jsx";
import useAuth from '../hooks/useAuth.jsx';


const BookPage = () => {
    const { auth } = useAuth();
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState(false);
    const axiosPrivate = useAxiosPrivate();


    useEffect(() => {
        const fetchBook = async () => {
            setIsLoading(true);
            setError(null);

            try {
                axiosPrivate
                    .get(`http://localhost:8080/books/${id}`)
                    .then(response => {
                        setBook(response.data);
                    })

            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBook();
    }, [id, reload]);

    const reloadTable = () => {
        setReload(!reload);
    };

    return (
        <div>
            <header className="p-6 flex justify-between items-center hover:bg-gray-50">
                <Link to="/books">
                    <img src='../bookflix.svg' alt="Bookflix" className="h-12" />
                </Link>
            </header>
            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <div className='px-12 py-4 h-screen bg-gray-50'>
                    <h1 className='pt-8 text-6xl font-bold'>Book not found </h1>
                    <p className="text-2xl mx-2 mt-4 mb-2"> {error} </p>
                    <Link to="/books">
                        <Button className="mx-2 my-1">Back to Books</Button>
                    </Link>
                </div>
            ) : book ? (
                <div className="flex h-screen">
                    <div className="flex-1 bg-white p-12">
                        <h1 className="text-6xl font-bold">{book.name}</h1>
                        <p className="text-2xl m-2">{book.author}</p>
                        <p className="text-xl mx-2 my-4 text-gray-500">{book.description}</p>
                        <div className='flex mx-2 gap-2'>
                            <DialogEditComponent id={book.id} reloadTable={reloadTable} />
                            <DialogDeleteComponent id={book.id} reloadTable={reloadTable} />
                        </div>
                    </div>
                    <div className="flex flex-1 items-center justify-center w-full h-full bg-gray-50">
                        <img
                            alt="Profile"
                            className="flex align-center justify-center"
                            height="55"
                            src="../placeholder.svg"
                            width="55"
                        />
                    </div>
                </div>
            ) : (
                <h1 className='text-6xl font-bold'>Book not found.</h1>
            )}
        </div>
    );
}

export default BookPage;