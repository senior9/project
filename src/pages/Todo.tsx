import TodoContainer from "@/components/todo/TodoContainer";
import Container from "@/components/ui/Container";


const Todo = () => {
    return (
        <Container>
             <h1 className="text-3xl text-center font-semibold y-10 text-white ">This Todo page </h1>
             <TodoContainer/>
        </Container>
    );
};

export default Todo;