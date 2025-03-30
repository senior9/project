import { useAppDispatch } from "@/redux/hook";
import { Button } from "../ui/button";
import { removeTodo, toogleComplete } from "@/redux/features/todoSlice";
import { useDeleteTodoMutation, useUpdateTodoMutation } from "@/redux/api/api";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect, useState } from "react";

type TTodoProps = {
    _id: string,
    title: string,
    description: string,
    isCompleted?: boolean,
    priority: string,
}

const TodoCard = ({ title, description, _id, isCompleted, priority }: TTodoProps) => {

    const [task, setTask] = useState(title);
    const [description1, setDescription] = useState(description);
    const [priority1, setPriority] = useState(priority);

    // const dispatch = useAppDispatch();
    const [updateTodo, { isLoading }] = useUpdateTodoMutation();
    const [deleteTodo] = useDeleteTodoMutation();

    const toogleState = () => {
        // dispatch(toogleComplete(id));
        const taskData = {
            title,
            description,
            priority,
            isCompleted: !isCompleted
        }

        const optiopns = {
            id: _id,
            data: taskData
        }
        updateTodo(optiopns)
    }
    const handleDelete = () => {
        deleteTodo({ id: _id })
    }
    const handleUpdate = (e: any) => {
        e.preventDefault();
        updateTodo({
            id: _id,
            data: {
                title: task,
                description: description1,
                priority: priority1
            }
        })

    }

    useEffect(() => {
        setTask(title);
        setDescription(description);
        setPriority(priority);
    }, [title, description, priority]);
    return (
        <div>
            <div className="bg-white rounded-md flex justify-between items-center p-5 border ">
                <input className="mr-3" onChange={toogleState} defaultChecked={isCompleted} type="checkbox" name="complete" id="complete" />
                <p className="font-semibold flex-1">{title}</p>
                <div className="flex flex-1 gap-2 items-center">
                    <div className={`rounded-full size-3 
                    ${priority === "high" ? "bg-red-500" : ""}  
                    ${priority === "medium" ? "bg-yellow-500" : ""}  
                    ${priority === "low" ? "bg-green-500" : ""}  
                    `}>

                    </div>
                    <p>
                        {priority}
                    </p>
                </div>

                <div className=" flex-1">
                    {
                        isCompleted ? (<p className="text-green-500">Done </p>)
                            : (<p className="text-red-500">Pending </p>)
                    }
                </div>
                <p className="flex-[2]" >{description}</p>
                <div className="space-x-5">
                    <Button onClick={handleDelete} className="bg-red-600"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                    </Button>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-[#5C53FE]"
                                onClick={() => {
                                    setTask(title);
                                    setDescription(description);
                                    setPriority(priority)
                                }} >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Update Task</DialogTitle>
                                <DialogDescription>
                                    Update  Your TAsk That you want to finished
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleUpdate}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="task" className="text-right">
                                            Update Title
                                        </Label>
                                        <Input onChange={(e) => setTask(e.target.value)}
                                            id="name"
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="description" className="text-right">
                                           Update Description
                                        </Label>
                                        <Input
                                            onChange={(e) => setDescription(e.target.value)}
                                            id="username"
                                            className="col-span-3"
                                            
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="description" className="text-right">
                                          Update  Prority
                                        </Label>
                                        <Select onValueChange={(value: string) => setPriority(value)} >
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select Priority" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>

                                                    <SelectItem value="high">High </SelectItem>
                                                    <SelectItem value="medium">Medium</SelectItem>
                                                    <SelectItem value="low">Low</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>

                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <DialogClose asChild>

                                        <Button type="submit">Submit</Button>
                                    </DialogClose>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>


                </div>
            </div>
        </div>
    );
};

export default TodoCard;