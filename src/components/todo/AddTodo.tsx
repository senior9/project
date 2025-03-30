import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "../ui/dialog";
import {Select,SelectTrigger,SelectValue,SelectContent,SelectGroup,SelectItem} from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAppDispatch } from "@/redux/hook";
import { addTodo } from "@/redux/features/todoSlice";
import { useAddTodoMutation } from "@/redux/api/api";

const AddTodo = () => {

    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    //!For local state
    // const dispatch =useAppDispatch(); 
    //? for server  call 

    const [addTodo, { data, isLoading, isSucess, isError }] = useAddTodoMutation();

    // console.log(data, isError, isLoading)


    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        // const randomString = Math.random().toString(36).substring(2,7)
        const taskDetails = {
            // id: randomString,
            title: task,
            description: description,
            isCompleted:false,
            priority: priority,
        }
        console.log(taskDetails);

        //! For local state
        // dispatch(addTodo(taskDetails));

        // for server 

        addTodo(taskDetails);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-primary-gradient font-semibold text-xl  ">Add Todo</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Task</DialogTitle>
                    <DialogDescription>
                        Add Your TAsk That you want to finished
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="task" className="text-right">
                                Task
                            </Label>
                            <Input onBlur={(e) => setTask(e.target.value)}
                                id="name"
                                defaultValue=""
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Input
                                onBlur={(e) => setDescription(e.target.value)}
                                id="username"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Prority 
                            </Label>
                            <Select onValueChange={(value:string)=> setPriority(value) } >
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
    );
};

export default AddTodo;