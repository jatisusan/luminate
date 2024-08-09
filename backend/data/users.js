import bcrypt from "bcryptjs";

const users = [
    {
        username: "john_doe",
        email: "john@example.com",
        password: bcrypt.hashSync("john", 10)
    },
    {
        username: "carlos_reyes",
        email: "carlos@example.com",
        password: bcrypt.hashSync("carlos", 10)
    },
    {
        username: "tyler_kennedy",
        email: "tyler@example.com",
        password: bcrypt.hashSync("tyler", 10)
    },
    {
        username: "owen_strand",
        email: "owen@example.com",
        password: bcrypt.hashSync("owen", 10)
    },
    {
        username: "grace_ryder",
        email: "grace@example.com",
        password: bcrypt.hashSync("grace", 10)
    },
    {
        username: "tommy_vega",
        email: "tommy@example.com",
        password: bcrypt.hashSync("tommy", 10)
    }
];

export default users;