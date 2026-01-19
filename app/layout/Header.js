"use client";
import { use, useState } from "react";

import TopHeader from './TopHeader';
import MobileHeaderPopup from './MobileHeaderPopup';



export default function Header(){
    const [activeMenu, setActive] = useState(false);

    return(
        <>
            <TopHeader setActive={setActive} activeMenu={activeMenu} />
            <MobileHeaderPopup setActive={setActive} activeMenu={activeMenu} />
        </>
    )
}