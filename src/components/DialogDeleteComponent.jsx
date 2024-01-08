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

import { TrashIcon } from "@radix-ui/react-icons";

export default function DialogDeleteComponent(props) {

    const [isDialogOpen, setDialogOpen] = useState(false);
    
    const handleDelete = (e) => {
        e.preventDefault();
    
        fetch(`http://localhost:8080/books/${props.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.ok) {
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