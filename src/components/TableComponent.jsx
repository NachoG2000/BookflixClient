import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

import { EyeOpenIcon } from "@radix-ui/react-icons"
import DialogEditComponent from "./DialogEditComponent.jsx"
import DialogDeleteComponent from "./DialogDeleteComponent.jsx"

const TableComponent = (props) => {

    const bookElements = props.books.map((book) => {
        return (
            <TableRow key={book.id}>
                <TableCell className="font-medium text-left">{book.id}</TableCell>
                <TableCell className="text-center">{book.name}</TableCell>
                <TableCell className="text-right">{book.author}</TableCell>
                <TableCell className="flex justify-end gap-1">
                    <Link to={`/books/${book.id}`}>
                        <EyeOpenIcon className="h-4 w-4" />
                    </Link>
                    <DialogEditComponent id={book.id} reloadTable={props.reloadTable} />
                    <DialogDeleteComponent id={book.id} reloadTable={props.reloadTable} />
                </TableCell>
            </TableRow>
        )
    })
    
    return (
        <Table>
            <TableHeader>
                <TableRow className="justify-around">
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-right">Author</TableHead>
                <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {bookElements}
            </TableBody>
        </Table>
    )
}
export default TableComponent;