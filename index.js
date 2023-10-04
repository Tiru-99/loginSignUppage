            const express = require("express");
            const app = express();
            const path = require("path");
            require("./backend/db/db");
            const Register = require("./backend/models/user");
            const nodemailer = require("nodemailer");
   
            const port = process.env.PORT || 3001;
             let enteredEmail;
            // Generate a random 6-digit number
            function generateRandomSixDigitNumber() {
            return Math.floor(100000 + Math.random() * 900000);
            }

            // Define the directory where your static files are located
            const staticPath = path.join(__dirname, "./backend/src");

            // Serve static files from the specified directory
            app.use(express.static(staticPath));
            app.use(express.json());
            app.use(express.urlencoded({ extended: false }));

            // Define a route for the homepage (index.html)
            app.get("/", (req, res) => {
            res.sendFile(path.join(staticPath, "index.html"));
            });

            // Define a route for /register to serve second.html
            app.get("/register", (req, res) => {
            res.sendFile(path.join(staticPath, "second.html"));
            });

            app.post("/register", async (req, res) => {
            try {
                const email = req.body.email;
                const password = req.body.password;
                const confirmpass = req.body.confirmpass;
                const checkMail = await Register.findOne({ email: email });
             if(!checkMail){
                if (password == confirmpass) {
                const registerUser = new Register({
                    email: req.body.email,
                    password: req.body.password,
                    confirm_password: req.body.confirmpass,
                });
                const registered = await registerUser.save();
                res.status(201).send("Signup Successful");
                } else {
                res
                    .status(400)
                    .send("The passwords are not matching, please re-enter them");
                }}

                else{
                    res.send("Email already exists");
                }
            } catch (e) {
                res.status(400).send(e);
            }
            });

            app.post("/", async (req, res) => {
            try {
                const email = req.body.email;
                const password = req.body.password;
                const useremail = await Register.findOne({ email: email });

                if (useremail) {
                res.send("Thank you for logging in, Log in was successful");
                } else {
                res.send("password is not matching");
                }
            } catch (e) {
                res.status(400).send(e);
            }
            });

            app.get("/reset", (req, res) => {
            res.sendFile(path.join(staticPath, "forgotpass.html"));
            });

            app.post("/reset", async (req, res) => {
            try {
                const reqemail = req.body.email;
                const password = req.body.password;
                const useremail = await Register.findOne({ email: reqemail });

                if (useremail) {
                // Redirect to the /pin page where the verification code will be sent
                res.redirect("/pin");
                } else {
                res.send("Email does not exist. Please try an Email which already exists");
                }
            } catch (e) {
                res.status(400).send(e);
            }
            });

            // Define a route for the /pin page
        
            app.get("/pin", (req, res) => {
                res.sendFile(path.join(staticPath, "confirm.html"));
                });
            // Handle verification code submission on the /pin page
            let verificationCode;
           
            app.post("/pin", async (req, res) => {
               
            try {
               
                 enteredEmail = req.body.email;
                const useremail = await Register.findOne({ email: enteredEmail });

                if (useremail) {
                     verificationCode = generateRandomSixDigitNumber();
                const transporter = nodemailer.createTransport({
                    service:"gmail",
                    auth: {
                        user:"mailer9909@gmail.com",
                        pass:"teuw rvlj fxiy mehs"
                    },
                });
                let details= {
                    from:"mailer9909@gmail.com",
                    to: enteredEmail,
                    subject:"Validation",
                    text:"Your validation code is"+ verificationCode +"."
                }

            transporter.sendMail(details,(err)=>{
                if(err){
                    console.log(err);
                }
                else{
                    res.sendFile(path.join(staticPath,"confirm.html"));
                    console.log("Email has been sent");
                }
            });}
            else{
                res.send("Invalid Email, Email does not exist");
            }

            
            } catch (e) {
                res.status(400).send(e);
            }
            });
            
            let verCode; 
            
            // app.get('/newpass', async (req, res) => {
            //     const verCode = req.body.sixpin;
            //     try{
            //     if(verCode==verificationCode){
            //         console.log("Correct Pin ")
            //         res.sendFile(path.join(staticPath,"newpass.html"));
            //     }
            //     else{
            //        console.log("Invalid Pin");
            //     }}
            //     catch(e){
            //         console.log(e);
            //     }
            // });
              
            app.post('/newpass',  (req, res) => {
                try {
                    const verifyCode = req.body.sixpin;
            
                    if (verifyCode == verificationCode) {
                        console.log(enteredEmail);
                        console.log("correct pin");
                        res.sendFile(path.join(staticPath,"passnew.html"))
                        
                    } else {
                        console.log("Invalid Pin");
                        res.send("Invalid Pin");
                    }
                } catch (e) {
                    console.log(e);
                    res.status(500).send("Internal Server Error");
                }
            });
              
            app.post('/success',async(req,res)=>{
                try{
                entPass= req.body.newpassword; 
                entConPass= req.body.confirmpassword;

                if(entPass==entConPass){
                    const user = await Register.findOne({ email: enteredEmail });
                    if(user){
                        user.password= entPass; 
                        res.sendFile(path.join(staticPath,"success.html"));
                        await user.save();
                    } 
                    else{
                        res.send("User does not exist");
                    }
                }
                else{
                  res.send("Password and Confirm Password does not match");
                }}
                catch(e){
                    console.log(e);
                }
            });
            

            
                // Start the Express server
                app.listen(port, () => {
                console.log(`The server is running at http://localhost:${port}`);
                });
