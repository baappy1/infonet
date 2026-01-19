"use client"

import { useState } from "react";
import Introduction from "./introduction";
import GetStated from "./get-stated";


export default function Testing(){
    const [pageTitle, setPageTitle] = useState("Welcome to Testing Page");
    const [hello, setHello] = useState("Welcome to homepage");

    return(
        <>
            <h1>{hello}</h1>
            <Introduction setHello={setHello} pageTitle={ pageTitle } />
            <GetStated setPageTitle={setPageTitle} />
        </>
    )
}