'use client'
// this is the container of the navbar which contains three sections

interface ContainerProps
{
    children:React.ReactNode;

}
// a single prop called children of type React.ReactNode, which allows any valid React node to be passed as children.
// const Container: React.FC<ContainerProps> = ({ children }) => { ... }: This declares the Container component as a functional component using the React.FC type. It takes in the ContainerProps as its prop type. The component receives the prop object destructured as { children }
const Container:React.FC<ContainerProps> = ({children}) => {
  return (
    <div className="max-w-[2520px]
    mx-auto
    py-10px
    my-10px

    xl:px-20
    md:px-10
    sm:px-2
    px-4 "
    >
{/* 
      //This is where the nested content or components will be rendered. The children prop is used here to render the components passed as children inside the container. */}
    {children}

    </div>
  )
}

export default Container
