"use client"

export default function Introduction({ pageTitle, setHello }) {

    const changeHelloText = () => {
        setHello("Hello from Introduction Component");
    }

    return (
        <>
            <h1 onClick={pageTitleChange}>{pageTitle}</h1>
            <h2 onClick={changeHelloText}>Change Hello Text</h2>
        </>
    )
}