"use client"

export default function Introduction({pageTitle, setHello}){

    const pageTitleChange = () => {
        console.log("You clicked on the title: ", pageTitle)
    }

    const changeHelloText = () => {
        setHello("Hello from Introduction Component");
    }

    return(
        <>
            <h1 onClick={pageTitleChange}>{pageTitle}</h1>
            <h2 onClick={changeHelloText}>Change Hello Text</h2>
        </>
    )
}