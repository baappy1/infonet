import Image from "next/image";

export default function Map() {
  return (
    <>
      <div className="relative">
        {/* <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29474.72404966234!2d-123.04833258131168!3d49.23427712345308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54867721fd53fee5%3A0x355ab207647a109d!2sBritish%20Columbia%20Institute%20of%20Technology!5e0!3m2!1sen!2sbd!4v1769586139675!5m2!1sen!2sbd"
          className="w-full h-162 lg:h-212 "
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        /> */}

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2189.8688336440973!2d-123.01209907292552!3d49.253510985234065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5486772206cc7cf5%3A0x3220914b6393c874!2sInfonet%20Technology%20Corporation!5e0!3m2!1sen!2sbd!4v1771829652743!5m2!1sen!2sbd"
          className="w-full h-162 lg:h-212 "
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </>
  );
}
