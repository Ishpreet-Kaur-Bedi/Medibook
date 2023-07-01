'use client';


interface MenuItemProps{
    onClick:()=>void;
    // This property represents a function that will be called when the menu item is clicked. It is defined as a function that takes no arguments and does not return anything (void). This allows you to pass a callback function that will be executed when the menu item is clicked.
    label:string;
    // This property represents the label or text content of the menu item. It is of type string, which means it can accept any string value. This allows you to provide the text that will be displayed as the label for the menu item

}

const MenuItem: React.FC<MenuItemProps>=({
    onClick,
    label
})=>{
    return (
        <div onClick={onClick}
        className="px-4
        py-3 hover:bg-neutral-100
        transition 
        font-semibold">
          {label}
        </div>
      )
}




export default MenuItem
