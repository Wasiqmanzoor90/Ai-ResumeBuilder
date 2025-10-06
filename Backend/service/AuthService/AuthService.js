
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const prisma = new PrismaClient();
export const HandleRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(401).json({ message: "Please fill all reuired fields!" })
        }
        const existuser = await prisma.user.findUnique({
            where: { email },
        });
        if (existuser) {
            return res.status(401).json({ error: "User Already exist" })
        }
        const hashPass = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: { name, email, password: hashPass },

        });
        return res.status(200).json({ message: "User Created", user: newUser })
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong" });

    }

}


export const HandleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all details!" })
    }
    try {
        const existuser = await prisma.user.findUnique({ where: { email } })
        if (!existuser) {
            return res.status(400).json({ message: "User Doesn't Exist!" })
        }
        const isMatch = await bcrypt.compare(password, existuser.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Inavalid Password!" })


        }
        const token = jwt.sign(
            { id: existuser.id, email: existuser.email },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        return res.status(200).json({
            message: "Login Sucessfull",
            token,
            user: {
                id: existuser.id,
                email: existuser.email,
                name: existuser.name,
            }
        })
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong" });
    }
}

//all user
export const AllUser = async(req,res)=>
    {
        const{id}=req.params;
        try {
            const getUser = await prisma.user.findUnique({ where: { id: parseInt(id) }})
            if(!getUser)
            {
                return res.status(400).json({message:"User Doesnt exist!"})
            }
            return res.status(200).json({
                user:{
                    id:getUser.id,
                    name:getUser.name,
                    email:getUser.email,
                    createdAt:getUser.createdAt
                }
            })
        } catch (error) {
             return res.status(500).json({ error: "Something went wrong" });
        }
    }