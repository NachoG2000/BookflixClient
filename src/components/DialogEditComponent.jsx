import { useState, useEffect } from "react";
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

export default function DialogComponent(props) {

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
        console.log(JSON.stringify(formData))
        fetch(`http://localhost:8080/books/${props.id}`, {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Data successfully saved');
                    setFormData({
                        name: "",
                        author: "",
                        description: ""
                    })
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

    useEffect(() => {
        // Fetch book data using the selected ID
        fetch(`http://localhost:8080/books/${props.id}`)
            .then((response) => response.json())
            .then((data) => {
                // Update the form data with the fetched book data
                setFormData({
                    name: data.name,
                    author: data.author,
                    description: data.description
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