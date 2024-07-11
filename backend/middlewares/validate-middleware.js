// schema.parseAsync(req.body)


const validate = (schema)=> async(req,res,next) => {

    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body=parseBody;
        next();

    } catch (e) {
        //console.log(e);
        // will give all the issues and errors in console from where we can use it
        const msg = e.errors[0].message;

        res.status(400).json(msg)

        // using ERROR MIDDLEWARE
    //     const status=400;
    //     const extraDetails=e.errors[0].message;
    //     const message="Fill the input carefully.";

    //    const error={status,extraDetails,message};
    //    next(error);

    }
}
module.exports=validate;