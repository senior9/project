import { useAppSelector } from "@/redux/hook";
import { Button } from "../ui/button";
import AddTodo from "./AddTodo";
import FilterTodo from "./FilterTodo";
import TodoCard from "./TodoCard";
import { useGetTodosQuery } from "@/redux/api/api";
import { useState } from "react";

const TodoContainer = () => {
    // const {todos} = useAppSelector((state) => state.todo);
    const [priority,setPriority]=useState('');
    const {data:todos,error, isLoading} = useGetTodosQuery(priority);
    return (
        <div>
            <div className="flex justify-between mb-5">
                <AddTodo/>
                <FilterTodo priority={priority} setPriority={setPriority}/>
            </div>
            <div className=" bg-primary-gradient w-full h-full rounded-xl p-[5px] ">
                {/* <div className="  bg-white font-semibold text-3xl text-center rounded-md p-5">
                    <p> There is no task pending</p>
                </div> */}
                <div className="bg-white w-full h-full p-5 rounded-lg space-y-3">
               {
                todos?.data?.map((item:any)=>(<TodoCard {...item} />))
               }
                
                </div>

            </div>
        </div>
    );
};

export default TodoContainer;