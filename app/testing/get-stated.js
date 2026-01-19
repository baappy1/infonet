"use client"

export default function GetStarted({ setPageTitle }) {

    const handleChange = () => {
        setPageTitle("Get Started Page");
    };

    return (
        <>
            <button onClick={handleChange}>
                Change Title
            </button>
        </>
    );
}
