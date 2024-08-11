import bcrypt from "bcryptjs";

const users = [
    {
        username: "john_doe",
        email: "john@example.com",
        password: bcrypt.hashSync("john", 10),
        pfp: "https://res.cloudinary.com/dlxajd31e/image/upload/v1723219670/blogplatform/tl2jfhi333ojo5ls2kbk.jpg"
    },
    {
        username: "carlos_reyes",
        email: "carlos@example.com",
        password: bcrypt.hashSync("carlos", 10),
        pfp: "https://res.cloudinary.com/dlxajd31e/image/upload/v1723219356/blogplatform/vrxezow0cwybasl5jncx.png"
    },
    {
        username: "tyler_kennedy",
        email: "tyler@example.com",
        password: bcrypt.hashSync("tyler", 10),
        pfp: "https://res.cloudinary.com/dlxajd31e/image/upload/v1723273857/blogplatform/ekkoywcy5bmnzedtotlx.jpg"
    },
    {
        username: "owen_strand",
        email: "owen@example.com",
        password: bcrypt.hashSync("owen", 10),
        pfp: "https://res.cloudinary.com/dlxajd31e/image/upload/v1723219558/blogplatform/aretbrgfvi2l2qrawvxs.jpg"
    },
    {
        username: "grace_ryder",
        email: "grace@example.com",
        password: bcrypt.hashSync("grace", 10),
        pfp: "https://res.cloudinary.com/dlxajd31e/image/upload/v1723219595/blogplatform/eojmgpoiwv34js1bs2jf.jpg"
    },
    {
        username: "tommy_vega",
        email: "tommy@example.com",
        password: bcrypt.hashSync("tommy", 10),
        pfp: "https://res.cloudinary.com/dlxajd31e/image/upload/v1723219499/blogplatform/quejlikt2brhbst4cxjl.png"
    }
];

export default users;