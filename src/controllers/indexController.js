const { validationResult } = require("express-validator");

module.exports = {
    index: (req,res) => {
        let user = req.session.user

        return res.render("index", { user })
    },
    userData : (req,res) =>{

        let errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.render("index", { errors: errors.array(), old: req.body })

        } else {
            let backgroundColor

            switch (req.body.color) {
                case "Rojo":
                    backgroundColor = "red"
                    break;
                case "Azul":
                    backgroundColor = "blue"
                    break;
                case "Verde":
                    backgroundColor = "green"
                    break;
                case "Rosa":
                    backgroundColor = "pink"
                    break;
                case "Amarillo":
                    backgroundColor = "yellow"
                    break; 
            }

            let user = req.session.user = {
                name: req.body.name,
                email: req.body.email,
                color: req.body.color,
                age: req.body.age,
                remenber: req.body.remenber,
                background: backgroundColor,
            }

            req.body.remenber != undefined ? res.cookie("remenber", user, { maxAge: 600000 }) : null

            return res.render("index", { user }) 
        }

    },
    thanks : (req,res) => {
        let user = req.session.user

        let backgroundColor

            switch (user.color) {
                case "Rojo":
                    backgroundColor = "red"
                    break;
                case "Azul":
                    backgroundColor = "blue"
                    break;
                case "Verde":
                    backgroundColor = "green"
                    break;
                case "Rosa":
                    backgroundColor = "pink"
                    break;
                case "Amarillo":
                    backgroundColor = "yellow"
                    break; 
            }

        return res.render("thanks", { user, backgroundColor })
    },
    destroy : (req,res) =>{
        req.session.destroy()
        res.clearCookie("remenber")

        return res.redirect("/")
    }
}