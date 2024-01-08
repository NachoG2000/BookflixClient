import { useState } from "react";
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

export default function DialogComponent(props) {
    const [formData, setFormData] = useState({
        name: "",
        author: "",
        description: ""
    });
    const [isDialogOpen, setDialogOpen] = useState(false);

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

        fetch("http://localhost:8080/books", {
            method: "POST",
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

    return (
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button>Add Book</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add a Book</DialogTitle>
                    <DialogDescription>
                        Add a book to the list here. Click save when you're done.
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
    );
}
