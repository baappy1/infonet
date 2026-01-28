import Image from "next/image";

export default function Map(){
    return(
        <>    
            <div className="relative">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29474.72404966234!2d-123.04833258131168!3d49.23427712345308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54867721fd53fee5%3A0x355ab207647a109d!2sBritish%20Columbia%20Institute%20of%20Technology!5e0!3m2!1sen!2sbd!4v1769586139675!5m2!1sen!2sbd"
                    className="w-full h-162 lg:h-212 pointer-events-none"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </>
    )
}