import { ReactNode } from "react";

type TconatainerProps ={
    children: ReactNode
}
const Container = ({children}:TconatainerProps) => {
    return (
        <div className="h-screen w-full max-w-7xl mx-auto">
            {children}
        </div>
    );
};

export default Container;