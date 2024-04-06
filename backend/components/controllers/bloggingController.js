const bloggingServices = require("../services/bloggingServices");

const createBlogging = async (req,res) => {
    try{
        // const file = req.file ? req.file.filename : undefined;
        const userId = req.user.id;
        const {name, title, content} = req.body;
        const blog = await bloggingServices.createBlogging({name,title,content,userId});
        res.status(201).json(blog);
    }
    catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};


const updateBlogging = async(req,res) => {
    try{
        const {id} = req.params;
        const { text } = req.body;
        console.log(text);
        const blog = await bloggingServices.updateBlogging(id, text);

        if(!blog){
            res.status(404).json({
                message: "blog not found"
            });
        }
        res.status(200).json(blog);
    }
    catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};

const deleteBlogging = async(req,res) => {
    try{
        const {id} = req.params;
        const blog = await bloggingServices.deleteBlogging(id);

        if(!blog){
            res.status(404).json({
                message: "blog not found"
            });
        }
        res.status(200)
    }
    catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};

const getAllBlogging = async(req,res) => {
    try{
        const blogs = await bloggingServices.getAllBlogging();
        if(!blogs){
            res.status(404).json({
                message: "blogs not found"
            });
        }
        res.status(200).json(blogs);
    }
    catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};

const updateLikes = async (req,res) => {
    try{
        const {id} = req.params;
        const blog = await bloggingServices.updateLikes(id);
        if(!blog){
            res.status(404).json({
                message: "blog is not found",
            });
        };
        res.status(200).json(blog);
    } catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
};

const updateComment = async (req,res) => {
    try{
        const id = req.params.id;
        const { text } = req.body;
        const blog = await bloggingServices.updateComment(id,text);
        if(!blog){
            res.status(404).json({
                message: "blog is not found",
            });
        };
        res.status(200).json(blog);
    }
    catch(error){
        res.status(500).json({
            message: error.message,
        });
    }

};

module.exports = {createBlogging, updateBlogging,deleteBlogging, getAllBlogging, updateLikes, updateComment};