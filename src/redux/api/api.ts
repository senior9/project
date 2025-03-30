import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react" 


export const baseAPi= createApi({
    reducerPath:'baseApi' ,
    baseQuery: fetchBaseQuery({baseUrl:"http://localhost:5000"}),
    tagTypes:["todo"],
    endpoints:(builder)=>({
        getTodos:builder.query({
        
            query:(priority)=>{ 
                // filter by Priority
                const params = new URLSearchParams();
                if(priority && priority!=="All"){
                    params.append('priority', priority);
                }
                return {
                    url:'/tasks',
                    method:'GET',
                    params:params,
            }
        },
        providesTags:["todo"],
        }),
        addTodo:builder.mutation({
            query:(data)=>{  
            console.log( "from App ts: ",data)
                return {
                url:'/task',
                method:'POST',
                body:data }
                },
        invalidatesTags:["todo"],
        }),
        updateTodo:builder.mutation({
            query:(options)=>{  
            console.log( "from App ts: ",options)
                return {
                url:`/task/${options.id}`,
                method:'PUT',
                body:options.data }
                },
        invalidatesTags:["todo"],
        }),
        deleteTodo:builder.mutation({
            query:(options)=>{  
            console.log( "from App ts: ",options)
                return {
                url:`/task/${options.id}`,
                method:'DELETE',
                body:options.data }
                },
        invalidatesTags:["todo"],
        })
    })
})
export const {useGetTodosQuery,useAddTodoMutation,useUpdateTodoMutation,useDeleteTodoMutation} = baseAPi;