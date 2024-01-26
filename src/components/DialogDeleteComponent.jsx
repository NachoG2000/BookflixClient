import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate.jsx";

import axios from "axios";

import { TrashIcon } from "@radix-ui/react-icons";

const DialogDeleteComponent = (props) => {

    const [isDialogOpen, setDialogOpen] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    
    const handleDelete = (e) => {
        e.preventDefault();
    
        axiosPrivate
            .delete(`http://localhost:8080/books/${props.id}`)
            .then((response) => {
                if (response.status === 204) {
                    console.log('Book successfully deleted');
                    setDialogOpen(false);
                    props.reloadTable();
                } else {
                    throw new Error('Server response wasn\'t OK');
                }
            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
            });
    };

    return (
        <AlertDialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <AlertDialogTrigger>
                <TrashIcon className="h-4 w-4" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure to delete the Book?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the book
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
export default DialogDeleteComponent;