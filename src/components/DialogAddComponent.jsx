import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import useAxiosPrivate from "../hooks/useAxiosPrivate.jsx";


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog";

const DialogComponent = (props) => {
    const [formData, setFormData] = useState({
        name: "",
        author: "",
        description: ""
    });
    const [isDialogOpen, setDialogOpen] = useState(false);
    const { axiosPrivate } = useAxiosPrivate();

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
            .post("http://localhost:8080/books", formData)
            .then(() => {
                console.log('Data successfully saved');
                setFormData({
                    name: "",
                    author: "",
                    description: ""
                });
                setDialogOpen(false);
                props.reloadTable();
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
export default DialogComponent;