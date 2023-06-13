const express = require("express")
const userRouter=require("express").Router()
const { getAllUsers,UpdateUser,deleteUser} = require("../controller/UserController")

userRouter.get("/allUsers",getAllUsers)
userRouter.put("/updateuser/:_id",UpdateUser)
userRouter.delete("deleteuser/:_id",deleteUser)

module.exports=userRouter;