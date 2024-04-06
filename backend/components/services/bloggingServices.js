const Blogging = require("../model/Blogging");

const createBlogging = async (blogData) => {
    try{
        // const blogTitle = await Bloggging.findOne({title: "name of title"});
        // if(blogTitle){
        //     throw new Error("title is already available");
        // }
        const blog = await Blogging.create(blogData);
        
        return blog;
    }
    catch(error){
        throw error;
    }
};


const updateBlogging = async(blogId, updatedData) => {
    try{
        const blog = await Blogging.findOneAndUpdate(
            {_id:blogId}, 
            {$set : updatedData},
            {new:true},
        );

        return blog;
    }
    catch(error){
        throw error;
    }
};

const deleteBlogging = async(blogId) => {
    try{
        const blog = await Blogging.findOneAndDelete(
            {_id:blogId}
        );

        return blog;
    }
    catch(error){
        throw error;
    }
};

const getAllBlogging = async() => {
    try{
        const blogs = await Blogging.find();

        return blogs;

    }
    catch(error){
        throw error;
    }
};

const updateLikes = async (blogId) => {
    try{
        const blog = await Blogging.findById(blogId);

        if(blog){
            blog.likes += 1;
            await blog.save();
        }

        return blog;
    } catch(error){
        throw error;
    }
};

const updateComment = async (blogId, text) => {
    try{
        const blog = await Blogging.findById(blogId);
        console.log(blog);
        if(!blog){
            throw new Error('blog is not found');
        };
        
        blog.comments.push({ text });
        await blog.save();
        return blog;
    }
    catch(error){
        throw error;
    }

};


module.exports = {createBlogging, updateBlogging,deleteBlogging, getAllBlogging, updateComment, updateLikes};