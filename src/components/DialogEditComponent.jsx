import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate.jsx";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";

import { Pencil2Icon } from "@radix-ui/react-icons";

const DialogComponent = (props) => {
    const axiosPrivate = useAxiosPrivate(); 

    const [formData, setFormData] = useState({
        name: "",
        author: "",
        description: ""
    });
    const [isDialogOpen, setDialogOpen] = useState(false);
    
    const openDialog = () => {
        setDialogOpen(true);
    }

    const handleInputChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.id]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if any of the fields are empty
        if (formData.name === "" || formData.author === "" || formData.description === "") {
            console.log("Please fill in all fields");
            return; // Prevent form submission
        }

        axiosPrivate
            .put(`http://localhost:8080/books/${props.id}`, formData)
            .then((response) => {
                if (response.status === 204) {
                    console.log('Data successfully saved');
                    setFormData({
                        name: "",
                        author: "",
                        description: ""
                    });
                    setDialogOpen(false);
                    props.reloadTable();
                } else {
                    throw new Error('Server response was not OK');
                }
            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
            });
    };

    useEffect(() => {
        // Fetch book data using the selected ID
        axiosPrivate
            .get(`http://localhost:8080/books/${props.id}`)
            .then((response) => {
                // Update the form data with the fetched book data
                setFormData({
                    name: response.data.name,
                    author: response.data.author,
                    description: response.data.description
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }, [isDialogOpen]);

    return (
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Pencil2Icon className="h-4 w-4 cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit a Book</DialogTitle>
                    <DialogDescription>
                        Edit a book to the list here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                className="col-span-3"
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Author</Label>
                            <Input
                                id="author"
                                value={formData.author}
                                className="col-span-3"
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Description</Label>
                            <Input
                                id="description"
                                value={formData.description}
                                className="col-span-3"
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogTrigger asChild>
                            <Button onClick={handleSubmit} type="submit">Save changes</Button>
                        </DialogTrigger>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default DialogComponent;