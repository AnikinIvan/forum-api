interface HeaderProps{
    name:string;
    description:string;
}

export function Header({name, description}:HeaderProps){
    return(
        <div className="header">
            <h1>{name}</h1>
            <h2>{description}</h2>
        </div>
    )
}